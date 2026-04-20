import React from "react";
import {
  TechStackLabel,
  SchemaModelLabel,
  APIsLabel,
  StructureFolderLabel,
  ScalingLabel,
} from "../Components/MindMapLabels";
import { getLayoutedElements } from "./mindmapLayout";

/**
 * Parses application architecture data into ReactFlow nodes and connects their edges,
 * automatically creating nested layouts that separate parents and leaves visually.
 */
export const generateElements = (sourceData) => {
  if (!sourceData) {
    return { nodes: [], edges: [] };
  }
  const nodes = [];
  const edges = [];

  /**
   * Reusable helper to insert styled layout nodes directly into ReactFlow collections.
   */
  const addNode = (
    id,
    label,
    depth,
    parentId = null,
    lines = 1,
    isParent = false,
  ) => {
    // Approximate heights ensuring adequate bounding containers for content text
    const height = 50 + lines * 26;

    const labelElement = (
      <div
        className={`w-full h-full rounded-xl border-2 p-3 shadow-md flex flex-col ${
          depth === 0
            ? "bg-(--accent) border-(--border) text-(--accent-text) justify-center items-center font-extrabold text-lg"
            : isParent
              ? "bg-(--bg-card) border-(--border) text-(--text-main) justify-center items-center font-bold text-base"
              : "bg-(--bg-side) border-(--border) text-(--text-main) font-normal text-sm"
        }`}
      >
        {label}
      </div>
    );

    nodes.push({
      id,
      position: { x: 0, y: 0 },
      data: { label: labelElement, _height: height },
      style: {
        width: 300,
        border: "none",
        padding: 0,
        backgroundColor: "transparent",
      },
      type: depth === 0 ? "input" : "default",
    });

    // Link with parent via smooth arrows
    if (parentId) {
      edges.push({
        id: `${parentId}-${id}`,
        source: parentId,
        target: id,
        type: "smoothstep",
        animated: true,
      });
    }
    return id;
  };

  // Construct the primary root head
  const rootId = addNode("root", sourceData?.projectTitle, 0, null, 1, true);

  // 1. Tech Stack (Parent + Rich Table Leaf)
  const tsParentId = addNode(
    "techStack_parent",
    "Tech Stack",
    1,
    rootId,
    1,
    true,
  );
  addNode(
    "techStack",
    <TechStackLabel techStack={sourceData?.techStack} />,
    2,
    tsParentId,
    sourceData?.techStack?.length * 2.5 + 2,
  );

  // 2. Database Schema (Parent distributing Models)
  const schemaId = addNode("schema", "Database Schema", 1, rootId, 1, true);
  sourceData?.schema?.forEach((model) => {
    addNode(
      `sc_${model.collection}`,
      <SchemaModelLabel model={model} />,
      2,
      schemaId,
      model.fields.length + 2,
    );
  });

  // 3. APIs (Parent + Rich Table Leaf)
  const apisParentId = addNode("apis_parent", "APIs", 1, rootId, 1, true);
  addNode(
    "apis",
    <APIsLabel apis={sourceData?.apis} />,
    2,
    apisParentId,
    sourceData?.apis?.length * 2.5 + 2,
  );

  // 4. Structure (Parent distributing Folder domains)
  const structureId = addNode("structure", "Structure", 1, rootId, 1, true);
  sourceData?.structure?.forEach((sectionData) => {
    addNode(
      `st_${sectionData.section}`,
      <StructureFolderLabel
        section={sectionData.section}
        paths={sectionData.paths}
      />,
      2,
      structureId,
      sectionData.paths.length + 2,
    );
  });

  // 5. Scaling (Parent + Rich Bulleted Leaf)
  const scalingParentId = addNode(
    "scaling_parent",
    "Scaling Strategies",
    1,
    rootId,
    1,
    true,
  );
  addNode(
    "scaling",
    <ScalingLabel scaling={sourceData?.scaling} />,
    2,
    scalingParentId,
    sourceData?.scaling?.length * 1.5 + 2,
  );

  // Yield coordinate-processed outcomes cleanly
  return getLayoutedElements(nodes, edges);
};
