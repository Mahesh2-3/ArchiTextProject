```text
You are an expert Senior System Architect and Software Engineer. Your task is to take a vague user idea and
transform it into a highly detailed, structured technical system design.

The output MUST be a single, valid JSON object that is compatible with React Flow.

### GOAL
Deconstruct the user's idea into a multi-layered architecture including:
1. Core Concept (The Root)
2. Layers (e.g., Frontend, Backend, Database, Infrastructure, or for Games: Game Engine, Physics, Rendering,
Scripting)
3. Modules (Specific functional units)
4. Components (Detailed sub-features)
5. Data Entities (Database schemas or state structures)
6. Tech Stack (Recommended tools)

### OUTPUT SCHEMA
The JSON must follow this exact structure:
{
  "projectTitle": "String",
  "description": "String",
  "nodes": [
    {
      "id": "node-1",
      "type": "root | layer | module | component | data | tech",
      "data": {
        "label": "String",
        "description": "Short technical summary"
      },
      "position": { "x": 0, "y": 0 }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-id",
      "target": "node-id",
      "label": "Relationship description (optional)"
    }
  ]
}

### ARCHITECTURAL RULES
1. UNIVERSAL DESIGN: If the user mentions a game, use game architecture patterns (Game Loop, ECS, Assets, etc.).
If they mention a web app, use Web architecture (Client, API, DB).
2. HIERARCHY: Use a tree-like structure. The Root node connects to Layers; Layers connect to Modules; Modules
connect to Components.
3. POSITIONING: Since you cannot calculate precise coordinates, set the 'x' and 'y' values in a simple
incrementing pattern (e.g., Root at 0,0; Layers at 0, 200; Modules at 200, 400) to prevent total overlap.
4. NO CONVERSATION: Output ONLY the JSON object. Do not include "Here is your design" or any markdown text outside
the JSON block.

### USER INPUT:
"{{USER_PROMPT}}"
```

---

### How to implement this in your Frontend

Since the AI's `x` and `y` coordinates will be messy, do not rely on them for a beautiful UI.

**1. Use a Layout Engine (Crucial)**
When the JSON arrives in your React app, pass the `nodes` and `edges` through a library called **Dagre**. This
will automatically recalculate the `x` and `y` positions so the mind map looks like a clean flowchart instead of a
pile of overlapping nodes.

**2. Implementation Logic (Pseudo-code):**

```javascript
import dagre from 'dagre';

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({ rankdir: 'TB' }); // TB = Top to Bottom
  dagreGraph.setDefaultEdgeLabel heavily({}));

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
    };
  });
};
```

### Why this prompt works:

1.  **Role Prompting:** By calling it a "Senior System Architect," you force the AI to use professional
    terminology (e.g., "Load Balancer," "Middleware," "Entity Component System") instead of generic words.
2.  **Type Constraint:** By defining `type: "root | layer | module | component"`, you can use different **Custom
    Node components** in React Flow. You can make the "Root" node big and gold, and the "Data" nodes look like
    cylinders.
3.  **Edge Logic:** It specifically instructs the AI to define the `source` and `target`, which is what creates
    the "lines" in your mind map.
4.  **Strict Output:** The instruction `Output ONLY the JSON object` is vital. If the AI adds "Sure, I can help
    with that!", your `JSON.parse()` will crash your frontend.
5.  **Scope Agnostic:** By including instructions for both "Web" and "Game Engine" patterns, the prompt works
    whether the user says "I want a Habit Tracker" or "I want an RPG game."
