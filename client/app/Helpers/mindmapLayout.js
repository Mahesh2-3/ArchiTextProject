import { Position } from '@xyflow/react';

/**
 * Organizes ReactFlow elements into a top-down binary-tree-like structure.
 * Stacks children evenly in rows composed of left and right columns,
 * preventing nodes from sprawling too far horizontally.
 * 
 * @param nodes - Array of ReactFlow nodes
 * @param edges - Array of ReactFlow edges
 * @returns Object with nodes and edges populated with exact coordinates
 */
export const getLayoutedElements = (nodes, edges) => {
    // 1. Build a fast lookup map for all ReactFlow nodes
    const nodeMap = new Map();
    nodes.forEach(n => {
        nodeMap.set(n.id, {
            flowNode: n,
            children: [],
            treeWidth: 0,
            treeHeight: 0,
            maxLeftWidth: 0,
            maxRightWidth: 0,
            rows: []
        });
    });

    let rootNode = null;
    
    // 2. Establish parent-child relationships
    edges.forEach(e => {
        const parent = nodeMap.get(e.source);
        const child = nodeMap.get(e.target);
        if (parent && child) {
            parent.children.push(child);
        }
    });

    // 3. Identify the Root node (Which has no incoming edges)
    const targets = new Set(edges.map(e => e.target));
    for (const node of nodeMap.values()) {
        if (!targets.has(node.flowNode.id)) {
            rootNode = node;
            break;
        }
    }

    if (!rootNode) return { nodes, edges }; // Fallback if no root is found.

    /**
     * Post-order traversal to calculate dimensions of each subtree exactly,
     * so that deep sibling hierarchies never overlap.
     */
    function computeSizes(n) {
        n.children.forEach(computeSizes);
        
        // Group children into rows of two (Binary representation)
        const rows = [];
        for (let i = 0; i < n.children.length; i += 2) {
            rows.push(n.children.slice(i, i + 2));
        }

        let maxLeftWidth = 0;
        let maxRightWidth = 0;
        let totalChildrenHeight = 0;

        rows.forEach((row, i) => {
            const left = row[0];
            const right = row[1];
            
            // Check bounding boxes
            if (left) maxLeftWidth = Math.max(maxLeftWidth, left.treeWidth);
            if (right) maxRightWidth = Math.max(maxRightWidth, right.treeWidth);

            const rowHeight = Math.max(
                left ? left.treeHeight : 0,
                right ? right.treeHeight : 0
            );
            
            totalChildrenHeight += rowHeight;
            // Add vertical spacing between rows
            if (i < rows.length - 1) totalChildrenHeight += 40;
        });

        // Compute children width accounting for a 50px mid-gap
        const childrenWidth = maxRightWidth > 0 
            ? maxLeftWidth + 50 + maxRightWidth 
            : maxLeftWidth;

        const nodeWidth = 300;
        const nodeHeight = n.flowNode.data._height;

        // Propagate size upward to the parent
        n.treeWidth = Math.max(nodeWidth, childrenWidth);
        n.treeHeight = n.children.length > 0 ? (nodeHeight + 60 + totalChildrenHeight) : nodeHeight;
        n.rows = rows;
        n.maxLeftWidth = maxLeftWidth;
        n.maxRightWidth = maxRightWidth;
    }

    // Traverse the tree to determine bounding borders
    computeSizes(rootNode);

    /**
     * Pre-order traversal to distribute calculated coordinates across layout grids.
     */
    function setPositions(n, startX, startY) {
        // Position the node using React Flow's coordinate system
        n.flowNode.position = { x: startX - 150, y: startY };
        n.flowNode.sourcePosition = Position.Bottom;
        n.flowNode.targetPosition = Position.Top;
        
        // Return early if no children elements exist (leaf)
        if (n.children.length === 0) return;

        const nodeHeight = n.flowNode.data._height;
        let currY = startY + nodeHeight + 80;

        let leftColCenterX = startX;
        let rightColCenterX = startX;

        // Define explicit offsets dynamically respecting largest items
        if (n.maxRightWidth > 0) {
            leftColCenterX = startX - 50 - n.maxLeftWidth / 2;
            rightColCenterX = startX + 50 + n.maxRightWidth / 2;
        }

        // Descend progressively into subgroups placing children seamlessly
        n.rows.forEach((row) => {
            const left = row[0];
            const right = row[1];
            
            let rowHeight = 0;
            
            if (left) {
                setPositions(left, leftColCenterX, currY);
                rowHeight = Math.max(rowHeight, left.treeHeight);
            }
            if (right) {
                setPositions(right, rightColCenterX, currY);
                rowHeight = Math.max(rowHeight, right.treeHeight);
            }

            currY += rowHeight + 60;
        });
    }

    // Output all calculated layouts overriding the existing generic position mappings
    setPositions(rootNode, 0, 0);

    return { nodes, edges };
};
