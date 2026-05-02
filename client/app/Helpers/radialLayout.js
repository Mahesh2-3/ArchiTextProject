import { Position } from '@xyflow/react';

export const getLayoutedElements = (nodes, edges) => {
    if (nodes.length === 0) return { nodes, edges };

    // Find root: the node with no incoming edges
    const targetIds = new Set(edges.map(e => e.target));
    const rootNode = nodes.find(n => !targetIds.has(n.id));

    if (!rootNode) return { nodes, edges };

    // Build adjacency list
    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => {
        if (adj[e.source]) {
            adj[e.source].push(e.target);
        }
    });

    // Calculate leaves count for each subtree to allocate angular width
    const leavesCount = {};
    const getLeaves = (id) => {
        const children = adj[id];
        if (!children || children.length === 0) {
            leavesCount[id] = 1;
            return 1;
        }
        let count = 0;
        children.forEach(child => {
            count += getLeaves(child);
        });
        leavesCount[id] = count;
        return count;
    };
    getLeaves(rootNode.id);

    // Radii for different depth levels
    const radiusStepX = 350; 
    const radiusStepY = 250; 

    // Layout function
    // allocate an angular segment [startAngle, endAngle] to a node
    // then allocate proportional sub-segments to its children
    const layoutNode = (id, depth, startAngle, endAngle) => {
        const node = nodes.find(n => n.id === id);
        if (!node) return;

        let x = 0, y = 0;
        
        if (depth > 0) {
            const angle = (startAngle + endAngle) / 2;
            // Using ellipse rather than strict circle due to text aspect ratio
            const rX = depth * radiusStepX;
            const rY = depth * radiusStepY;
            
            x = rX * Math.cos(angle);
            y = rY * Math.sin(angle);
        }

        // Center the node itself (by default x,y is top-left in React Flow unless origin is set, 
        // but we can adjust later or just let the user use fitView).
        // Since width is around 200, height is around 60:
        const nodeWidth = typeof node.style?.width === 'number' ? node.style.width : 200;
        const nodeHeight = typeof node.data?._height === 'number' ? node.data._height : 60;
        
        node.position = { 
            x: x - nodeWidth / 2, 
            y: y - nodeHeight / 2 
        };
        
        // Choose handle positions based on angle to make edges look decent
        if (depth > 0) {
            const angleDeg = (startAngle + endAngle) / 2 * (180 / Math.PI);
            const normalizedAngle = (angleDeg % 360 + 360) % 360;
            
            let targetPos, sourcePos;
            
            if (normalizedAngle >= 315 || normalizedAngle < 45) {
                // Node is to the right
                targetPos = Position.Left;
                sourcePos = Position.Right;
            } else if (normalizedAngle >= 45 && normalizedAngle < 135) {
                // Node is below
                targetPos = Position.Top;
                sourcePos = Position.Bottom;
            } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
                // Node is to the left
                targetPos = Position.Right;
                sourcePos = Position.Left;
            } else {
                // Node is above
                targetPos = Position.Bottom;
                sourcePos = Position.Top;
            }
            node.targetPosition = targetPos;
            node.sourcePosition = sourcePos;
        } else {
            // Root node handles
            node.sourcePosition = Position.Bottom;
            node.targetPosition = Position.Top;
        }

        const children = adj[id];
        if (children && children.length > 0) {
            const totalLeaves = leavesCount[id];
            let currentAngle = startAngle;
            children.forEach(childId => {
                const childLeaves = leavesCount[childId];
                const angleShare = (childLeaves / totalLeaves) * (endAngle - startAngle);
                layoutNode(childId, depth + 1, currentAngle, currentAngle + angleShare);
                currentAngle += angleShare;
            });
        }
    };

    layoutNode(rootNode.id, 0, 0, 2 * Math.PI);

    // Make edges straight to avoid weird overlapping curves in a radial layout
    edges.forEach(e => {
        e.type = 'straight';
        e.style = { ...e.style, stroke: "var(--accent)", strokeWidth: 2 };
    });

    return { nodes, edges };
};
