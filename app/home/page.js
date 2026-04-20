"use client";

import { Group, Panel, Separator } from "react-resizable-panels";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "../Helpers/icons";
import Conversation from "../ui/Conversation";
import MindMap from "../ui/MindMap";
import Sidebar from "../ui/Sidebar";
import CreateProject from "../Components/CreateProject";
import { useAppStore } from "../store/useAppStore";
import { getArchitecture } from "../api/Architecture";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../Helpers/toast";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pid = searchParams.get("pid");
  const cid = searchParams.get("cid");

  const [isSideBarOpen, setisSideBarOpen] = useState(true);
  const [isConvoOpen, setIsConvoOpen] = useState(true);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const setCId = useAppStore((state) => state.setCurrentConversation);
  const setPId = useAppStore((state) => state.setCurrentProject);
  const setArchitectureData = useAppStore((state) => state.setArchitectureData);
  const architectureData = useAppStore((state) => state.architectureData);

  // Fetching architecture data from the params in the url (pid, cid)
  useEffect(() => {
    const fetchArchitecture = async () => {
      if (!pid) {
        setArchitectureData(null);
        return;
      }
      const res = await getArchitecture(pid);
      if (res?.success) {
        setArchitectureData(res.data);
      } else {
        toast.error(
          res.error || "You are not authorized to access this project",
          toastOptions(),
        );
        // Optionally clear data or redirect
        setArchitectureData(null);
      }
    };

    fetchArchitecture();
    setCId(cid || null);
    setPId(pid || null);
  }, [pid, cid, setCId, setPId, setArchitectureData]);

  // Toggle the sidebar
  const toggleSideBar = () => {
    setisSideBarOpen((prev) => !prev);
  };

  // Toggle conversation panel
  const toggleConvo = () => {
    setIsConvoOpen((prev) => !prev);
  };

  // Toggle the create project modal
  const toggleCreateProject = () => {
    setIsCreateProjectOpen((prev) => !prev);
  };

  // Called by CreateProject on success — refresh sidebar by navigating to the new project
  const handleProjectCreated = (newProject) => {
    setIsCreateProjectOpen(false);
    if (newProject?._id) {
      router.replace(`/home?pid=${newProject._id}`);
    }
  };

  return (
    <div className="w-full h-screen shrink-0 relative">
      <ToastContainer />
      {!isSideBarOpen && (
        <button
          onClick={toggleSideBar}
          className="absolute top-4 left-4 z-50 p-2 rounded-md bg-(--bg-card) hover:opacity-90 border border-(--border) shadow-lg transition cursor-pointer text-2xl"
        >
          <Menu className="text-(--text-main)" />
        </button>
      )}
      {isCreateProjectOpen && (
        <CreateProject
          onClose={toggleCreateProject}
          onSuccess={handleProjectCreated}
        />
      )}
      <Group
        className="h-screen w-full flex gap-0 bg-(--bg-main)"
        orientation="horizontal"
      >
        <Panel defaultSize={15} minSize="15%" hidden={!isSideBarOpen}>
          <Sidebar
            state={isSideBarOpen}
            func={toggleSideBar}
            func2={toggleCreateProject}
          />
        </Panel>
        <Separator />
        <Panel defaultSize={60} minSize="50%">
          <MindMap />
        </Panel>
        <Separator />
        <Panel defaultSize={25} minSize="20%" hidden={!isConvoOpen}>
          <Conversation onClose={toggleConvo} />
        </Panel>
        {!isConvoOpen && (
          <button
            onClick={toggleConvo}
            className="absolute top-4 right-4 z-50 p-2 rounded-md bg-(--bg-card) hover:opacity-90 border border-(--border) shadow-lg transition cursor-pointer text-2xl"
          >
            <Menu className="text-(--text-main)" />
          </button>
        )}
      </Group>
    </div>
  );
}
