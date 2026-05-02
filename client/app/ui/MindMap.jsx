import { useState, useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { generateElements as generateTreeElements } from "../Helpers/mindmapGenerator";
import { generateElements as generateTimelineElements } from "../Helpers/timelineGenerator";
import { generateElements as generateRadialElements } from "../Helpers/radialGenerator";
import { generateElements as generateFlowchartElements } from "../Helpers/flowchartGenerator";
import { useAppStore } from "../store/useAppStore";
import { toPng, toSvg } from "html-to-image";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa6";

function MindMapInner() {
  const architectureData = useAppStore((state) => state.architectureData);
  const downloadFormat = useAppStore((state) => state.downloadFormat);
  const setDownloadFormat = useAppStore((state) => state.setDownloadFormat);
  const { fitView, getNodes, getEdges } = useReactFlow();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Only fit view on the very first load, not on every update
  const hasInitialFit = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const triggerDownload = (href, filename) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  };

  const downloadFile = async (format) => {
    setShowExportMenu(false);

    if (format === "json") {
      // Export only the raw architecture data to prevent circular reference errors from React elements in nodes
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(architectureData, null, 2));
      triggerDownload(dataStr, "mindmap.json");
      return;
    }

    // Wait a moment for React Flow to re-render the non-animated SVG paths
    await new Promise((r) => setTimeout(r, 100));

    // Use React Flow's built-in bounds calculators to capture the exact diagram dimensions
    const nodesBounds = getNodesBounds(getNodes());
    const imageWidth = nodesBounds.width + 200; // Adding padding
    const imageHeight = nodesBounds.height + 200;

    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0.1,
    );

    const viewportNode = document.querySelector(".react-flow__viewport");
    if (!viewportNode) {
      return;
    }

    // Pass the calculated transform so html-to-image correctly positions the elements
    const style = {
      width: imageWidth,
      height: imageHeight,
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    };

    try {
      if (format === "png") {
        const dataUrl = await toPng(viewportNode, {
          width: imageWidth,
          height: imageHeight,
          style,
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#18181b",
        });
        triggerDownload(dataUrl, "mindmap.png");
      } else if (format === "svg") {
        const dataUrl = await toSvg(viewportNode, {
          width: imageWidth,
          height: imageHeight,
          style,
          backgroundColor: "#18181b",
        });
        triggerDownload(dataUrl, "mindmap.svg");
      } else if (format === "pdf") {
        const dataUrl = await toPng(viewportNode, {
          width: imageWidth,
          height: imageHeight,
          style,
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#18181b",
        });
        const pdf = new jsPDF({
          orientation: imageWidth > imageHeight ? "landscape" : "portrait",
          unit: "px",
          format: [imageWidth, imageHeight],
        });
        pdf.addImage(dataUrl, "PNG", 0, 0, imageWidth, imageHeight);
        pdf.save("mindmap.pdf");
      }
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  useEffect(() => {
    if (!downloadFormat) return;
    async function run() {
      await downloadFile(downloadFormat);
      setDownloadFormat(null);
    }
    run();
  }, [downloadFormat]);

  // Track previous data to detect changes during render
  const [prevArchitectureData, setPrevArchitectureData] = useState(null);

  // If architectureData changed, reset nodes and edges immediately during render
  if (architectureData !== prevArchitectureData) {
    setPrevArchitectureData(architectureData);

    const isDataEmpty =
      !architectureData || Object.keys(architectureData).length === 0;
    const sourceData = isDataEmpty
      ? {
          
        }
      : architectureData;

    let generator = generateTreeElements;
    if (sourceData?.type === "timeline") generator = generateTimelineElements;
    else if (sourceData?.type === "radial") generator = generateRadialElements;
    else if (sourceData?.type === "flowchart")
      generator = generateFlowchartElements;

    const { nodes: newNodes, edges: newEdges } = generator(sourceData);

    // This setState call during render is safe and recommended by React
    // for resetting state based on prop changes.
    setNodes(newNodes);
    setEdges(newEdges);
  }

  // Trigger fitView only once on initial load
  useEffect(() => {
    if (nodes.length && !hasInitialFit.current) {
      hasInitialFit.current = true;
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
        maxZoom={Infinity}
        minZoom={0.1}
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
