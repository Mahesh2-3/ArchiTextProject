"use client";

import React, { useEffect, useState } from "react";
import ThemeButton from "../Components/ThemeButton";
import { Menu, Close, AngleDown } from "../Helpers/icons";
import Image from "next/image";
import SidebarSkeleton from "../Skeletons/SidebarSkeleton";
import Link from "next/link";
import { useAppStore } from "../store/useAppStore";
import { getConversations } from "../api/Conversations";
import { getProjects } from "../api/Project";
import { useRouter } from "next/navigation";

const Sidebar = ({ state, func, func2 }) => {
  const [projects, setProjects] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isFetching, setIsFetching] = useState({
    projects: false,
    convo: false,
  });
  const [mounted, setMounted] = useState(false);
  const currentProject = useAppStore((state) => state.currentProject);
  const currentConversation = useAppStore((state) => state.currentConversation);
  const setCurrentProject = useAppStore((state) => state.setCurrentProject);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setMounted(true);
      setIsFetching({ projects: true, convo: true });
      const { success, data } = await getProjects();
      const { success: MsgSuccess, data: MsgData } =
        await getConversations(currentProject);
      if (success) {
        setProjects(data);
      }
      if (MsgSuccess) {
        setConversations(MsgData);
      }
      setIsFetching({ projects: false, convo: false });
    };
    fetchData();
  }, [currentProject, currentConversation]);

  const handleFetchConvo = async (projectId) => {
    router.replace(`/home?pid=${projectId}`);
    // if (projectId === currentProject) {
    //   return;
    // }
    // setIsFetching({ projects: false, convo: true });
    // const { success, data } = await getConversations(projectId);
    // if (success) {
    //   setConversations(data);
    // }
    // setCurrentProject(projectId);
    // setIsFetching({ projects: false, convo: false });
  };

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
          {projects &&
            projects.map((project) => (
              <li key={project._id} className="flex flex-col gap-2">
                <button
                  onClick={() => handleFetchConvo(project._id)}
                  className="w-full flex items-center justify-between group py-1 cursor-pointer hover:bg-black/5 px-2 rounded-md"
                >
                  <span className="font-bold text-(--text-normal) group-hover:text-(--text-normal)/80 transition text-left">
                    {project.title}
                  </span>
                  <AngleDown
                    className={`transition-transform duration-300 text-(--text-normal)/60 ${
                      currentProject === project._id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul className="flex flex-col gap-1 pl-4 ml-1 border-l-2 border-gray-400 dark:border-gray-600">
                  {currentProject === project._id && isFetching.convo && (
                    <li className="text-sm text-(--text-normal)/50 animate-pulse py-1.5 px-2">
                      Loading...
                    </li>
                  )}
                  {currentProject === project._id &&
                    !isFetching.convo &&
                    conversations &&
                    conversations.length === 0 && (
                      <li className="text-sm text-(--text-normal)/50 py-1.5 px-2">
                        No conversations yet
                      </li>
                    )}
                  {currentProject === project._id &&
                    !isFetching.convo &&
                    conversations &&
                    conversations.map((conversation) => (
                      <li
                        key={conversation._id}
                        className="text-sm text-(--text-normal)/80 hover:text-(--text-normal) hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition truncate py-1.5 px-2 rounded-r-md"
                      >
                        <Link
                          href={`/home?pid=${project._id}&cid=${conversation._id}`}
                        >
                          {conversation.title}
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
