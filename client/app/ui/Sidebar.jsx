"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa6";

import ThemeButton from "../Components/ThemeButton";
import {
  Menu,
  Close,
  AngleDown,
  PlusCircle,
  Settings,
} from "../Helpers/icons";
import ProjectSkeleton from "../Skeletons/ProjectSkeleton";

import { useAppStore } from "../store/useAppStore";

import { getProjects } from "../api/Project";
import { toast } from "react-toastify";
import { toastOptions } from "../Helpers/toast";

const Sidebar = ({ state, func, func2 }) => {
  // router for navigation
  const router = useRouter();

  // data
  const [projects, setProjects] = useState([]);
  const [showExportMenu, setShowExportMenu] = useState(false);


  // loading states
  const [isFetching, setIsFetching] = useState({
    projects: false,

  });
  const [mounted, setMounted] = useState(false);

  // data from store
  const currentProject = useAppStore((state) => state.currentProject);

  const setCurrentProject = useAppStore((state) => state.setCurrentProject);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const refreshSidebarTrigger = useAppStore(
    (state) => state.refreshSidebarTrigger,
  );
  const setDownloadFormat = useAppStore((state) => state.setDownloadFormat);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsFetching((prev) => ({ ...prev, projects: true }));
      const { success, data } = await getProjects();
      if (success) setProjects(data);
      setIsFetching((prev) => ({ ...prev, projects: false }));
    };

    fetchProjects();
  }, [user, refreshSidebarTrigger]); // only when user changes



  const handleSelectProject = (projectId) => {
    setCurrentProject(projectId);
    router.replace(`/home?pid=${projectId}`);
  };

  const handleDownload = (format) => {
    setDownloadFormat(format);
    setShowExportMenu(false);
  };

  return (
    <div className="w-full h-full bg-(--bg-side) flex flex-col relative border-r border-(--border)">
      {/* Website Name */}
      <div className="px-4 pt-4 pb-2 shrink-0 flex items-center gap-2 ">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="inline-block rounded-full border border-white/50"
        />
        <h1 className="text-xl font-bold text-(--text-main) tracking-tight">
          ArchiText
        </h1>
      </div>

      {/* Header / Actions */}
      <div className="flex justify-end items-center px-4 pb-4 shrink-0">
        <button
          onClick={func}
          className="p-1 rounded-md transition cursor-pointer text-2xl text-(--text-main) hover:bg-(--accent)/10"
        >
          {state ? <Close /> : <Menu />}
        </button>
      </div>

      {/* New Project Button */}
      <div className="px-4 pb-4 shrink-0">
        <button
          onClick={func2}
          className="w-full py-2 px-4 rounded-md border border-(--border) bg-(--accent) hover:opacity-90 transition flex justify-between items-center text-(--accent-text) font-medium cursor-pointer"
        >
          <span>New Project</span>
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* Project List */}
      <div className="grow overflow-y-auto px-4">
        {isFetching.projects ? (
          <ProjectSkeleton />
        ) : (
          <ul className="flex flex-col gap-4">
            {projects &&
              projects.map((project) => (
                <li
                  key={project._id}
                  className="flex flex-col gap-2 bg-(--bg-card) border border-(--border) rounded-md p-2 relative"
                >
                  <div
                    className={`w-full flex items-center justify-between group py-2 px-3 rounded-md transition ${
                      currentProject === project._id
                        ? "bg-(--accent)/20 text-(--accent)"
                        : "hover:bg-(--accent)/10 text-(--text-main)"
                    }`}
                  >
                    <button
                      onClick={() => handleSelectProject(project._id)}
                      className="font-bold text-ellipsis overflow-hidden whitespace-nowrap text-left grow cursor-pointer"
                    >
                      {project.title}
                    </button>
                    
                    {currentProject === project._id && (
                      <div className="relative flex shrink-0 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowExportMenu(!showExportMenu);
                          }}
                          className="p-1.5 hover:bg-(--accent)/20 rounded-md transition cursor-pointer"
                          title="Download Project"
                        >
                          <FaDownload size={14} />
                        </button>
                        
                        {showExportMenu && (
                          <div className="absolute right-0 top-8 w-40 bg-white dark:bg-zinc-800 rounded-md shadow-xl border border-gray-200 dark:border-zinc-700 overflow-hidden z-[100]">
                            <button
                              onClick={() => handleDownload("png")}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                            >
                              PNG Image
                            </button>
                            <button
                              onClick={() => handleDownload("svg")}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                            >
                              SVG Image
                            </button>
                            <button
                              onClick={() => handleDownload("pdf")}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                            >
                              PDF Document
                            </button>
                            <button
                              onClick={() => handleDownload("json")}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                            >
                              JSON File
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* User Profile - Sticky Bottom */}
      <div className="border-t border-(--border) shrink-0 flex flex-col bg-(--bg-main)/30">
        <div className="flex items-center gap-3 p-4">
          <ThemeButton />
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-(--text-main) truncate">
              {user?.name}
            </span>
            <span className="text-xs text-(--text-muted) truncate">
              {user?.email}
            </span>
          </div>
          <Link
            href="/settings"
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-(--bg-main)/50 ml-auto"
          >
            <Settings
              size={25}
              className="text-(--text-muted) group-hover:text-(--accent) group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
