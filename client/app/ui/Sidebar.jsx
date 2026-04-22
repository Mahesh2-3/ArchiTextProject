"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ThemeButton from "../Components/ThemeButton";
import {
  Menu,
  Close,
  AngleDown,
  PlusCircle,
  Logout,
  Settings,
} from "../Helpers/icons";
import ProjectSkeleton from "../Skeletons/ProjectSkeleton";
import ConversationSkeleton from "../Skeletons/ConversationSkeleton";
import { useAppStore } from "../store/useAppStore";
import { getConversations } from "../api/Conversations";
import { getProjects } from "../api/Project";
import { logout } from "../api/Auth";
import { toast } from "react-toastify";
import { toastOptions } from "../Helpers/toast";

const Sidebar = ({ state, func, func2 }) => {
  // router for navigation
  const router = useRouter();

  // data
  const [projects, setProjects] = useState([]);
  const [conversations, setConversations] = useState([]);

  // loading states
  const [isFetching, setIsFetching] = useState({
    projects: false,
    convo: false,
  });
  const [mounted, setMounted] = useState(false);

  // data from store
  const currentProject = useAppStore((state) => state.currentProject);
  const currentConversation = useAppStore((state) => state.currentConversation);
  const setCurrentProject = useAppStore((state) => state.setCurrentProject);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const refreshSidebarTrigger = useAppStore(
    (state) => state.refreshSidebarTrigger,
  );

  useEffect(() => {
    const fetchProjects = async () => {
      setIsFetching((prev) => ({ ...prev, projects: true }));
      const { success, data } = await getProjects();
      if (success) setProjects(data);
      setIsFetching((prev) => ({ ...prev, projects: false }));
    };

    fetchProjects();
  }, [user, refreshSidebarTrigger]); // only when user changes

  useEffect(() => {
    if (!currentProject) return;

    const fetchConvos = async () => {
      setIsFetching((prev) => ({ ...prev, convo: true }));
      const { success, data } = await getConversations(currentProject);
      if (success) setConversations(data);
      setIsFetching((prev) => ({ ...prev, convo: false }));
    };

    fetchConvos();
  }, [currentProject, refreshSidebarTrigger]); // only when project changes

  const handleFetchConvo = async (projectId) => {
    router.replace(`/home?pid=${projectId}`);
  };

  // Logout Function
  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      setUser(null);
      router.push("/login");
    } else {
      toast.error("Logout failed. Please try Again.", toastOptions());
    }
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
                  className="flex flex-col gap-2 bg-(--bg-card) border border-(--border) rounded-md p-2"
                >
                  <button
                    onClick={() => handleFetchConvo(project._id)}
                    className="w-full flex items-center justify-between group py-1 cursor-pointer hover:bg-(--accent)/10 px-2 rounded-md transition"
                  >
                    <AngleDown
                      className={`transition-transform duration-300 text-(--text-muted) ${
                        currentProject === project._id ? "rotate-180" : ""
                      }`}
                    />
                    <span className="font-bold text-(--text-main) mx-2 text-ellipsis overflow-hidden whitespace-nowrap group-hover:text-(--accent) transition text-left">
                      {project.title}
                    </span>
                    <PlusCircle
                      title="Add new Conversation"
                      onClick={() => handleFetchConvo(project._id)}
                      className="text-(--text-muted) group-hover:text-(--accent) transition cursor-pointer"
                    />
                  </button>

                  {/* Conversation list or skeleton */}
                  {currentProject === project._id && isFetching.convo ? (
                    <ConversationSkeleton />
                  ) : (
                    currentProject === project._id && (
                      <ul className="flex flex-col gap-1 pl-4 ml-1 border-l-2 border-(--border)">
                        {conversations && conversations.length === 0 && (
                          <li className="text-sm text-(--text-muted) py-1.5 px-2">
                            No conversations yet
                          </li>
                        )}
                        {conversations &&
                          conversations.map((conversation) => (
                            <li
                              key={conversation._id}
                              className={`text-sm text-(--text-muted) hover:text-(--text-main) hover:bg-(--accent)/10 cursor-pointer transition truncate py-1.5 px-2 rounded-r-md ${
                                currentConversation === conversation._id
                                  ? "bg-(--accent)/20 text-(--text-main)"
                                  : ""
                              }`}
                            >
                              <Link
                                href={`/home?pid=${project._id}&cid=${conversation._id}`}
                              >
                                {conversation.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* User Profile and Logout Container - Sticky Bottom */}
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
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-(--bg-main)/50"
          >
            <Settings
              size={25}
              className="text-(--text-muted) group-hover:text-(--accent) group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </Link>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center justify-center gap-4 py-3 border-y border-(--border) px-4 cursor-pointer hover:bg-red-500/10 transition-colors group"
        >
          <Logout color="red" size={24} />
          <span className="text-red-500 text-lg font-bold">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
