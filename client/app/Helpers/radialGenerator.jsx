import React from "react";
import { getLayoutedElements } from "./radialLayout";

export const generateElements = (sourceData) => {
  if (!sourceData || !sourceData.centerNode) {
    return { nodes: [], edges: [] };
  }
  const nodes = [];
  const edges = [];

  const addNode = (id, label, isCenter = false) => {
    const height = 60;
    const labelElement = (
      <div className={`w-full h-full flex items-center justify-center p-3 rounded-xl border-2 shadow-md ${isCenter ? 'bg-(--accent) border-(--border) text-(--accent-text) font-bold text-lg' : 'bg-(--bg-card) border-(--border) text-(--text-main) text-sm'}`}>
        {label}
      </div>
    );
    nodes.push({
      id: String(id),
      position: { x: 0, y: 0 },
      data: { label: labelElement, _height: height },
      style: { width: 200, border: "none", padding: 0, backgroundColor: "transparent" },
      type: isCenter ? "input" : "default",
    });
  };

  addNode(sourceData.centerNode.id, sourceData.centerNode.label, true);

  const processBranches = (parentId, branches) => {
    if (!branches) return;
    branches.forEach((b) => {
      addNode(b.id, b.label, false);
      edges.push({
        id: `rad-${parentId}-${b.id}`,
        source: String(parentId),
        target: String(b.id),
        type: "smoothstep",
        animated: true,
      });
      if (b.children && b.children.length > 0) {
        processBranches(b.id, b.children);
      }
    });
  };

  processBranches(sourceData.centerNode.id, sourceData.branches);

  return getLayoutedElements(nodes, edges);
};
