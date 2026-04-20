import React from "react";
import { getLayoutedElements } from "./timelineLayout";

export const generateElements = (sourceData) => {
  if (!sourceData || !sourceData.items) {
    return { nodes: [], edges: [] };
  }
  const nodes = [];
  const edges = [];

  const addNode = (id, label, date, description, status) => {
    const height = 150;

    const labelElement = (
      <div className="w-full h-full rounded-xl border-2 p-3 shadow-md flex flex-col bg-(--bg-card) border-(--border) text-(--text-main)">
        <div className="font-bold text-lg mb-1 break-words">{label}</div>
        {date && <div className="text-xs text-(--text-muted) opacity-70 mb-2">{date}</div>}
        <div className="text-sm flex-1 break-words">{description}</div>
        <div className="mt-2 text-xs font-semibold uppercase text-center p-1 rounded-sm bg-(--accent)/20 text-(--accent)">
          {status}
        </div>
      </div>
    );

    nodes.push({
      id: String(id),
      position: { x: 0, y: 0 },
      data: { label: labelElement, _height: height },
      style: { width: 300, border: "none", padding: 0, backgroundColor: "transparent" },
      type: "default",
    });
  };

  const sortedItems = [...sourceData.items].sort((a,b) => a.order - b.order);

  sortedItems.forEach((item, index) => {
    addNode(item.id, item.title, item.date, item.description, item.status);
    if (index > 0) {
      edges.push({
        id: `tme-${sortedItems[index-1].id}-${item.id}`,
        source: String(sortedItems[index-1].id),
        target: String(item.id),
        type: "smoothstep",
        animated: true,
      });
    }
  });

  return getLayoutedElements(nodes, edges);
};
