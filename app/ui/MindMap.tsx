import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import type { Connection, NodeChange, EdgeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { data as fallbackData } from '@/constants';
import { generateElements } from '../Helpers/mindmapGenerator';
import { ArchitectureData } from '../Helpers/interfaces';

export default function MindMap({ architectureData }: { architectureData: ArchitectureData | null }) {
    // State for nodes and edges
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    
    // Track previous data to detect changes during render
    const [prevArchitectureData, setPrevArchitectureData] = useState<ArchitectureData | null>(null);

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

    // Effect only for logging
    useEffect(() => {
        if (architectureData) {
            console.log("New Architecture Data Received:", architectureData);
        }
    }, [architectureData]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div className='w-full h-full'>
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