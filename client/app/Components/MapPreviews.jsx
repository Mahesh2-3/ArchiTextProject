import React, { useState, useEffect } from "react";

// Minimal SVG/CSS representations of the 4 map structures

const TreePreview = () => (
  <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M50 25 V45 M50 45 H20 V65 M50 45 H80 V65 M50 45 V65"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-(--border)"
      />
    </svg>
    <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-8">
      {/* Root */}
      <div className="w-20 h-10 rounded-lg bg-(--bg-main) border-2 border-(--accent) shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] flex items-center justify-center">
        <div className="w-10 h-1.5 bg-(--accent)/50 rounded-full" />
      </div>
      {/* Children */}
      <div className="flex w-full justify-between px-4">
        <div className="w-16 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
          <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
        <div className="w-16 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
          <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
        <div className="w-16 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
          <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const FlowchartPreview = () => (
  <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M50 15 V35 M50 35 H25 V55 H50 V75 M50 35 H75 V55 H50 M50 55 V75"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-(--border)"
      />
    </svg>
    <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-4">
      {/* Start */}
      <div className="w-16 h-8 rounded-full bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-8 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
      {/* Decision */}
      <div className="w-12 h-12 rotate-45 bg-(--bg-main) border-2 border-(--accent) shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] flex items-center justify-center my-2">
        <div className="w-6 h-1.5 -rotate-45 bg-(--accent)/50 rounded-full" />
      </div>
      {/* Process */}
      <div className="flex w-full justify-between px-10 my-2">
        <div className="w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
          <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
        <div className="w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
          <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
      </div>
      {/* End */}
      <div className="w-16 h-8 rounded-full bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-8 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
    </div>
  </div>
);

const TimelinePreview = () => (
  <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M50 10 V90 M50 25 H30 M50 50 H70 M50 75 H30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-(--border)"
      />
    </svg>
    <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-6">
      <div className="flex w-full items-center justify-center relative my-1">
        <div className="absolute right-[58%] w-20 h-10 rounded-lg bg-(--bg-main) border-2 border-(--accent) shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] flex items-center justify-center">
            <div className="w-8 h-1.5 bg-(--accent)/50 rounded-full" />
        </div>
        <div className="w-4 h-4 rounded-full bg-(--accent) z-10 ring-4 ring-(--bg-main)" />
      </div>
      <div className="flex w-full items-center justify-center relative my-1">
        <div className="w-4 h-4 rounded-full bg-(--text-muted) z-10 ring-4 ring-(--bg-main)" />
        <div className="absolute left-[58%] w-20 h-10 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
            <div className="w-8 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
      </div>
      <div className="flex w-full items-center justify-center relative my-1">
        <div className="absolute right-[58%] w-20 h-10 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
            <div className="w-8 h-1.5 bg-(--text-main)/20 rounded-full" />
        </div>
        <div className="w-4 h-4 rounded-full bg-(--text-muted) z-10 ring-4 ring-(--bg-main)" />
      </div>
    </div>
  </div>
);

const RadialPreview = () => (
  <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M50 50 L50 20 M50 50 L80 40 M50 50 L70 75 M50 50 L30 75 M50 50 L20 40"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-(--border)"
      />
    </svg>
    <div className="relative z-10 w-full h-full">
      {/* Center node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-(--bg-main) border-2 border-(--accent) shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] flex items-center justify-center z-20">
        <div className="w-8 h-1.5 bg-(--accent)/50 rounded-full" />
      </div>

      {/* 5 surrounding nodes */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
      <div className="absolute top-[32%] right-[10%] w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
      <div className="absolute bottom-[17%] right-[20%] w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
      <div className="absolute bottom-[17%] left-[20%] w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
      <div className="absolute top-[32%] left-[10%] w-14 h-8 rounded-lg bg-(--bg-side) border border-(--border) shadow-sm flex items-center justify-center">
        <div className="w-6 h-1.5 bg-(--text-main)/20 rounded-full" />
      </div>
    </div>
  </div>
);

export default function MapPreviews() {
  const [activeTab, setActiveTab] = useState(0);

  const maps = [
    { id: "tree", name: "Tree", component: TreePreview },
    { id: "flowchart", name: "Flowchart", component: FlowchartPreview },
    { id: "timeline", name: "Timeline", component: TimelinePreview },
    { id: "radial", name: "Radial", component: RadialPreview },
  ];

  // Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % maps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [maps.length]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-(--bg-main) min-h-[400px]">
      {/* Sidebar for tabs */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-(--border) p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar z-10 relative">
        <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-(--text-muted) mb-2 hidden md:block">
          Structure Types
        </div>
        {maps.map((map, index) => (
          <button
            key={map.id}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-all text-left whitespace-nowrap ${
              activeTab === index
                ? "bg-(--accent)/10 text-(--accent) border border-(--accent)/20"
                : "text-(--text-muted) hover:bg-(--bg-side) hover:text-(--text-main) border border-transparent"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                activeTab === index ? "bg-(--accent)" : "bg-(--border)"
              }`}
            />
            {map.name}
          </button>
        ))}
      </div>

      {/* Main preview area */}
      <div className="flex-1 relative bg-(--bg-main) overflow-hidden flex items-center justify-center p-8 md:p-12 min-h-[350px]">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02] md:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Render active preview */}
        <div className="w-full max-w-[320px] aspect-square relative z-10">
          {maps.map((map, index) => {
            if (activeTab !== index) return null;
            const ActiveComponent = map.component;
            return <ActiveComponent key={map.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
