import React from "react";
import { getLayoutedElements } from "./flowchartLayout";

const NODE_STYLES = {
  start: {
    bg: "bg-(--accent)",
    text: "text-(--accent-text)",
    border: "border-(--accent)",
    shape: "rounded-full",
    icon: "▶",
  },
  end: {
    bg: "bg-(--accent)",
    text: "text-(--accent-text)",
    border: "border-(--accent)",
    shape: "rounded-full",
    icon: "⏹",
  },
  decision: {
    bg: "bg-(--bg-card)",
    text: "text-(--text-main)",
    border: "border-(--accent)",
    shape: "rounded-lg rotate-0",
    icon: "◇",
  },
  process: {
    bg: "bg-(--bg-card)",
    text: "text-(--text-main)",
    border: "border-(--border)",
    shape: "rounded-lg",
    icon: null,
  },
  input: {
    bg: "bg-(--bg-side)",
    text: "text-(--text-main)",
    border: "border-(--border)",
    shape: "rounded-lg",
    icon: "✎",
  },
  error: {
    bg: "bg-red-900/30",
    text: "text-red-400",
    border: "border-red-500",
    shape: "rounded-lg",
    icon: "✕",
  },
};

export const generateElements = (sourceData) => {
  if (!sourceData || !sourceData.nodes || !sourceData.edges) {
    return { nodes: [], edges: [] };
  }
  const nodes = [];
  const edges = [];

  const direction = sourceData.direction || "TB";

  sourceData.nodes.forEach((n) => {
    const style = NODE_STYLES[n.nodeType] || NODE_STYLES.process;
    const isRound = n.nodeType === "start" || n.nodeType === "end";

    const labelElement = (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-3 border-2 shadow-md ${style.bg} ${style.text} ${style.border} ${style.shape} font-semibold text-sm text-center gap-1`}
      >
        {style.icon && (
          <span className="text-xs opacity-60">{style.icon}</span>
        )}
        <span className="break-words leading-tight">{n.label}</span>
      </div>
    );

    const nodeWidth = isRound ? 160 : 220;
    const nodeHeight = isRound ? 64 : 80;

    nodes.push({
      id: String(n.id),
      position: { x: 0, y: 0 },
      data: { label: labelElement, _nodeType: n.nodeType, _level: n.level ?? 0, _width: nodeWidth, _height: nodeHeight },
      style: { width: nodeWidth, height: nodeHeight, border: "none", padding: 0, backgroundColor: "transparent" },
    });
  });

  sourceData.edges.forEach((e, idx) => {
    const id = e.id || `flu-${e.from}-${e.to}-${idx}`;
    edges.push({
      id,
      source: String(e.from),
      target: String(e.to),
      label: e.label || "",
      labelStyle: { fontSize: 11, fontWeight: 600 },
      type: "smoothstep",
      animated: true,
      style: { stroke: "var(--accent)", strokeWidth: 1.5 },
    });
  });

  return getLayoutedElements(nodes, edges, direction);
};
