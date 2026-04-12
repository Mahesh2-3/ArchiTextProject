import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { data as fallbackData } from "../../constants";
import { generateElements } from "../Helpers/mindmapGenerator";
import { useAppStore } from "../store/useAppStore";

export default function MindMap() {
  const architectureData = useAppStore((state) => state.architectureData);
  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Track previous data to detect changes during render
  const [prevArchitectureData, setPrevArchitectureData] = useState(null);

  // If architectureData changed, reset nodes and edges immediately during render
  if (architectureData !== prevArchitectureData) {
    setPrevArchitectureData(architectureData);

    const sourceData = architectureData || fallbackData;
    const { nodes: newNodes, edges: newEdges } = generateElements(sourceData);

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

  return (
    <div className="w-full h-full">
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
