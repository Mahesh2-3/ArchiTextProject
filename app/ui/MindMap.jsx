import { useState, useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toPng } from "html-to-image";
import { generateElements as generateTreeElements } from "../Helpers/mindmapGenerator";
import { generateElements as generateTimelineElements } from "../Helpers/timelineGenerator";
import { generateElements as generateRadialElements } from "../Helpers/radialGenerator";
import { generateElements as generateFlowchartElements } from "../Helpers/flowchartGenerator";
import { useAppStore } from "../store/useAppStore";
import { Download } from "../Helpers/icons";

// We need a wrapper component to use the useReactFlow hook
function Flow() {
  const architectureData = useAppStore((state) => state.architectureData);
  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Track previous data to detect changes during render
  const [prevArchitectureData, setPrevArchitectureData] = useState(null);

  const { getNodes } = useReactFlow();

  // If architectureData changed, reset nodes and edges immediately during render
  if (architectureData !== prevArchitectureData) {
    setPrevArchitectureData(architectureData);

    const sourceData = architectureData || {};
    
    let generator = generateTreeElements;
    if (sourceData.type === "timeline") generator = generateTimelineElements;
    else if (sourceData.type === "radial") generator = generateRadialElements;
    else if (sourceData.type === "flowchart") generator = generateFlowchartElements;

    const { nodes: newNodes, edges: newEdges } = generator(sourceData);

    // This setState call during render is safe and recommended by React
    // for resetting state based on prop changes.
    setNodes(newNodes);
    setEdges(newEdges);
  }

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDownload = useCallback(() => {
    const nodes = getNodes();
    if (nodes.length === 0) return;

    const viewportNode = document.querySelector('.react-flow__viewport');
    if (!viewportNode) return;

    toPng(viewportNode, {
      backgroundColor: 'transparent',
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'architecture-mindmap.png';
      link.href = dataUrl;
      link.click();
    });
  }, [getNodes]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <button
        onClick={onDownload}
        className="absolute bottom-4 right-4 z-10 p-3 bg-(--accent) text-(--accent-text) rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center group"
        title="Download Mind Map"
      >
        <span className="hidden md:block mr-2 text-sm font-semibold max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">
          Download
        </span>
        <Download size={20} />
      </button>
    </>
  );
}

export default function MindMap() {
  return (
    <div className="w-full h-full border-x border-(--border) relative">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
