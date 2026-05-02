import React from "react";
import { getLayoutedElements } from "./timelineLayout";

// Use fixed width for the content boxes to ensure perfect symmetry
const BOX_WIDTH = 350;

// Estimate node height based on content at a given width
const estimateNodeHeight = (title = "", description = "") => {
  const charsPerLine = Math.floor(BOX_WIDTH / 8.5);
  const titleLines = Math.ceil(title.length / charsPerLine);
  const descLines = Math.ceil(description.length / charsPerLine);
  return Math.max(140, (titleLines + descLines) * 22 + 90);
};

export const generateElements = (sourceData) => {
  if (!sourceData || !sourceData.items) {
    return { nodes: [], edges: [] };
  }
  const nodes = [];
  const edges = [];

  const sortedItems = [...sourceData.items].sort((a, b) => a.order - b.order);

  sortedItems.forEach((item, index) => {
    const { id, title: label, date, description, status } = item;
    const height = estimateNodeHeight(label, description);
    
    // Determine alternating sides
    const isLeft = index % 2 === 0;
    
    // The entire node must be perfectly symmetrical so handles align in the center
    const totalWidth = BOX_WIDTH * 2 + 80;

    const labelElement = (
      <div className="w-full h-full flex items-center relative pointer-events-none" style={{ width: totalWidth, height }}>
        {/* Internal Line Top (Connects from node top to the center dot) */}
        {index > 0 && (
          <div 
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] bg-(--accent)" 
            style={{ height: 'calc(50% - 20px)' }} 
          />
        )}
        
        {/* Internal Line Bottom (Connects from center dot to node bottom) */}
        {index < sortedItems.length - 1 && (
          <div 
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[3px] bg-(--accent)" 
            style={{ height: 'calc(50% - 20px)' }} 
          />
        )}
        
        {/* The Connecting Horizontal Line */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-(--accent)"
          style={{
            width: 40,
            left: isLeft ? 'calc(50% - 40px)' : '50%',
          }}
        />

        {/* The Box */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 rounded-xl border-2 p-4 shadow-lg flex flex-col bg-(--bg-card) border-(--border) text-(--text-main) text-left pointer-events-auto"
          style={{ 
            width: BOX_WIDTH, 
            left: isLeft ? 0 : 'auto', 
            right: isLeft ? 'auto' : 0,
          }}
        >
          <div className="font-bold text-base mb-1 leading-snug break-words">{label}</div>
          {date && <div className="text-xs text-(--text-muted) opacity-70 mb-2">{date}</div>}
          <div className="text-sm flex-1 leading-relaxed break-words text-(--text-muted)">{description}</div>
          {status && (
            <div className="mt-3 text-xs font-semibold uppercase text-center py-1 px-2 rounded-full bg-(--accent)/10 border border-(--accent)/20 text-(--accent) self-start">
              {status}
            </div>
          )}
        </div>

        {/* Center Dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-(--bg-main) border-[3px] border-(--accent) shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] flex items-center justify-center text-sm font-bold text-(--accent) z-10 pointer-events-auto">
          {index + 1}
        </div>
      </div>
    );

    nodes.push({
      id: String(id),
      position: { x: 0, y: 0 },
      data: { label: labelElement, _height: height },
      style: { width: totalWidth, height, border: "none", padding: 0, backgroundColor: "transparent", overflow: "visible" },
      type: "default",
    });

    if (index > 0) {
      edges.push({
        id: `tme-${sortedItems[index - 1].id}-${item.id}`,
        source: String(sortedItems[index - 1].id),
        target: String(item.id),
        type: "straight",
        animated: true,
        style: { stroke: "var(--accent)", strokeWidth: 3 },
      });
    }
  });

  return getLayoutedElements(nodes, edges);
};
