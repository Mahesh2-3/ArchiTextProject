import { Position } from '@xyflow/react';

export const getLayoutedElements = (nodes, edges) => {
    let currentY = 0;
    nodes.forEach((node) => {
        node.position = { x: 0, y: currentY };
        node.sourcePosition = Position.Bottom;
        node.targetPosition = Position.Top;
        currentY += (typeof node.data._height === 'number' ? node.data._height : 150) + 80;
    });
    return { nodes, edges };
};
