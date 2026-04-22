import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { generateElements as generateTreeElements } from "../Helpers/mindmapGenerator";
import { generateElements as generateTimelineElements } from "../Helpers/timelineGenerator";
import { generateElements as generateRadialElements } from "../Helpers/radialGenerator";
import { generateElements as generateFlowchartElements } from "../Helpers/flowchartGenerator";
import { useAppStore } from "../store/useAppStore";

function MindMapInner() {
  const architectureData = useAppStore((state) => state.architectureData);
  const { fitView } = useReactFlow();
  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Track previous data to detect changes during render
  const [prevArchitectureData, setPrevArchitectureData] = useState(null);

  // If architectureData changed, reset nodes and edges immediately during render
  if (architectureData !== prevArchitectureData) {
    setPrevArchitectureData(architectureData);

    const sourceData = architectureData || {};

    let generator = generateTreeElements;
    if (sourceData.type === "timeline") generator = generateTimelineElements;
    else if (sourceData.type === "radial") generator = generateRadialElements;
    else if (sourceData.type === "flowchart")
      generator = generateFlowchartElements;

    const { nodes: newNodes, edges: newEdges } = generator(sourceData);

    // This setState call during render is safe and recommended by React
    // for resetting state based on prop changes.
    setNodes(newNodes);
    setEdges(newEdges);
  }

  // Trigger fitView when nodes change
  useEffect(() => {
    if (nodes.length) {
      // Small timeout ensures DOM elements are rendered
      setTimeout(() => {
        fitView({ duration: 800, padding: 0.2 });
      }, 50);
    }
  }, [nodes, fitView]);

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

  return (
    <div className="w-full h-full relative overflow-hidden border-x border-(--border)">
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
    </div>
  );
}

export default function MindMap() {
  return (
    <ReactFlowProvider>
      <MindMapInner />
    </ReactFlowProvider>
  );
}