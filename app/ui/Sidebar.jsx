"use client";

import React, { useEffect, useState } from "react";
import ThemeButton from "../Components/ThemeButton";
import { Menu, Close } from "../Helpers/icons";
import Image from "next/image";
import SidebarSkeleton from "../Skeletons/SidebarSkeleton";
import Link from "next/link";
import { useAppStore } from "../store/useAppStore";

const Sidebar = ({ state, func, func2 }) => {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentProject = useAppStore((state) => state.currentProject);

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      setIsFetching(true);
      const response = await fetch("http://localhost:5000/project", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setProjects(data);
      setIsFetching(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="h-full border-r border-gray-300 dark:border-gray-700 bg-(--color-secondary) flex flex-col relative">
      {/* blocking screen when there is no project selected */}

      {/* Header / Actions */}
      <div className="flex justify-between items-center p-4 shrink-0">
        <ThemeButton />
        <button
          onClick={func}
          className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-2xl text-(--text-normal)"
        >
          {state ? <Close /> : <Menu />}
        </button>
      </div>

      {/* New Project Button */}
      <div className="px-4 pb-4 shrink-0">
        <button
          onClick={func2}
          className="w-full py-2 px-4 rounded-md border border-gray-500 dark:border-gray-500 hover:bg-black/5 dark:hover:bg-white/5 transition flex justify-between items-center text-(--text-normal) font-medium cursor-pointer"
        >
          <span>New Project</span>
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* Project List */}
      <div className="grow overflow-y-auto px-4">
        <ul className="flex flex-col gap-6">
          {projects.map((project) => (
            <li key={project.id} className="flex flex-col gap-2">
              <div className="font-bold text-(--text-normal) flex items-center justify-between">
                <span>{project.name}</span>
              </div>
              <ul className="flex flex-col gap-1 pl-4 ml-1 border-l-2 border-gray-400 dark:border-gray-600">
                {project.chats.map((chat) => (
                  <li
                    key={chat.id}
                    className="text-sm text-(--text-normal)/80 hover:text-(--text-normal) hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition truncate py-1.5 px-2 rounded-r-md"
                  >
                    <Link href={`/home?pid=${project.id}&cid=${chat.id}`}>
                      {chat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile Container - Sticky Bottom */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 shrink-0 flex items-center gap-3 bg-black/5 dark:bg-white/5">
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 shrink-0 overflow-hidden flex items-center justify-center p-1">
          <Image
            src="/vercel.svg"
            alt="Profile"
            className="w-full h-full object-contain"
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-bold text-(--text-normal) truncate">
            Jane Doe
          </span>
          <span className="text-xs text-(--text-normal)/70 truncate">
            jane.doe@example.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
