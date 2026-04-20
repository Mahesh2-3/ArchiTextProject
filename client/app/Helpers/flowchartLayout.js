// flowchartLayout.js
// Production-grade custom flowchart layout for React Flow
// Better than Dagre for decision trees / workflows

import { Position } from "@xyflow/react";

export const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";

  const LEVEL_GAP = 170;
  const NODE_GAP = 260;
  const START_X = 600;
  const START_Y = 50;

  const nodeMap = new Map();
  const childrenMap = new Map();
  const incomingCount = new Map();

  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
    childrenMap.set(node.id, []);
    incomingCount.set(node.id, 0);
  });

  edges.forEach((edge) => {
    childrenMap.get(edge.source)?.push(edge);
    incomingCount.set(edge.target, (incomingCount.get(edge.target) || 0) + 1);
  });

  // ==========================
  // FIND ROOT NODE
  // ==========================
  let root =
    nodes.find((n) => n.data._nodeType === "start") ||
    nodes.find((n) => incomingCount.get(n.id) === 0) ||
    nodes[0];

  // ==========================
  // BFS LEVEL BUILD
  // ==========================
  const visited = new Set();
  const queue = [{ id: root.id, level: 0, lane: 0 }];
  const levels = {};

  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current.id)) continue;

    visited.add(current.id);

    if (!levels[current.level]) levels[current.level] = [];
    levels[current.level].push(current);

    const node = nodeMap.get(current.id);
    const children = childrenMap.get(current.id) || [];

    const type = node.data._nodeType;

    // ==========================
    // DECISION NODE SPECIAL SPLIT
    // ==========================
    if (type === "decision") {
      let offset = -1;

      children.forEach((edge) => {
        queue.push({
          id: edge.target,
          level: current.level + 1,
          lane: current.lane + offset,
        });

        offset += 2; // left then right
      });
    }

    // ==========================
    // NORMAL NODE
    // ==========================
    else {
      children.forEach((edge) => {
        queue.push({
          id: edge.target,
          level: current.level + 1,
          lane: current.lane,
        });
      });
    }
  }

  // ==========================
  // POSITION NODES
  // ==========================
  Object.entries(levels).forEach(([lvl, items]) => {
    items.forEach((item) => {
      const node = nodeMap.get(item.id);

      const width = node.data._width || 220;
      const height = node.data._height || 80;

      let x, y;

      if (!isHorizontal) {
        x = START_X + item.lane * NODE_GAP;
        y = START_Y + Number(lvl) * LEVEL_GAP;
      } else {
        x = START_X + Number(lvl) * LEVEL_GAP;
        y = START_Y + item.lane * NODE_GAP;
      }

      node.position = { x, y };

      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      node.targetPosition = isHorizontal ? Position.Left : Position.Top;

      node.style = {
        ...node.style,
        width,
        height,
      };
    });
  });

  return { nodes, edges };
};
