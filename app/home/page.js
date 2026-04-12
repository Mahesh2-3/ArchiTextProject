"use client";
import { Group, Panel, Separator } from "react-resizable-panels";
import Conversation from "../ui/Conversation";
import MindMap from "../ui/MindMap";
import Sidebar from "../ui/Sidebar";
import { use, useEffect, useState } from "react";
import { Menu } from "../Helpers/icons";
import CreateProject from "../Components/CreateProject";
import { useAppStore } from "../store/useAppStore";
import { getArchitecture } from "../api/Architecture";

export default function Home({ searchParams }) {
  const params = use(searchParams);
  const pid = params?.pid;
  const cid = params?.cid;

  const [isSideBarOpen, setisSideBarOpen] = useState(true);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const setCId = useAppStore((state) => state.setCurrentConversation);
  const setPId = useAppStore((state) => state.setCurrentProject);
  const setArchitectureData = useAppStore((state) => state.setArchitectureData);

  useEffect(() => {
    const fetchArchitecture = async () => {
      const res = await getArchitecture(pid);
      if (res.success) {
        setArchitectureData(res.data);
      }
    };

    if (cid) {
      fetchArchitecture();
      setCId(cid);
    }
    if (pid) {
      setPId(pid);
    }
  }, [pid, cid, setCId, setPId, setArchitectureData]);

  const toggleSideBar = () => {
    setisSideBarOpen((prev) => !prev);
  };

  const toggleCreateProject = () => {
    setIsCreateProjectOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-screen shrink-0 relative">
      {!isSideBarOpen && (
        <button
          onClick={toggleSideBar}
          className="absolute top-4 left-4 z-50 p-2 rounded-md bg-gray-200/50 hover:bg-(--color-secondary) border-2 shadow-lg transition cursor-pointer text-2xl text-(--color-text)"
        >
          <Menu />
        </button>
      )}
      {isCreateProjectOpen && <CreateProject onClose={toggleCreateProject} />}
      <Group
        className="h-screen w-full flex gap-0 bg-(--color-main)"
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
        <Panel defaultSize={25} minSize="20%">
          <Conversation />
        </Panel>
      </Group>
    </div>
  );
}
