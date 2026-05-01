"use client";

import { Group, Panel, Separator } from "react-resizable-panels";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Menu, Comments } from "../Helpers/icons";
import Conversation from "../ui/Conversation";
import MindMap from "../ui/MindMap";
import Sidebar from "../ui/Sidebar";
import CreateProject from "../Components/CreateProject";
import { useAppStore } from "../store/useAppStore";
import { getArchitecture } from "../api/Architecture";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../Helpers/toast";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pid = searchParams.get("pid");

  const [isSideBarOpen, setisSideBarOpen] = useState(true);
  const [isConvoOpen, setIsConvoOpen] = useState(true);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const setPId = useAppStore((state) => state.setCurrentProject);
  const setArchitectureData = useAppStore((state) => state.setArchitectureData);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        if (!pid) {
          setisSideBarOpen(true);
          setIsConvoOpen(false);
        } else {
          setisSideBarOpen(false);
          setIsConvoOpen(false);
        }
      } else {
        setisSideBarOpen(true);
        setIsConvoOpen(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [pid]);

  // Fetching architecture data from the params in the url (pid)
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
        setPId(pid || null);
  }, [pid, setPId, setArchitectureData]);

  // Toggle the sidebar
  const toggleSideBar = () => {
    setisSideBarOpen((prev) => {
      const nextState = !prev;
      if (isMobile && nextState) {
        setIsConvoOpen(false);
      }
      return nextState;
    });
  };

  // Toggle conversation panel
  const toggleConvo = () => {
    setIsConvoOpen((prev) => {
      const nextState = !prev;
      if (isMobile && nextState) {
        setisSideBarOpen(false);
      }
      return nextState;
    });
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
    <div className="w-full h-[100dvh] flex flex-col md:flex-row relative overflow-hidden bg-(--bg-main)">
      <ToastContainer />

      {!isSideBarOpen && (
        <button
          onClick={toggleSideBar}
          className="absolute top-4 left-4 z-60 p-2 rounded-md bg-(--bg-card) hover:opacity-90 border border-(--border) shadow-lg transition cursor-pointer text-2xl"
        >
          <Menu className="text-(--text-main)" />
        </button>
      )}

      {!isConvoOpen && (
        <button
          onClick={toggleConvo}
          className="absolute top-4 right-4 z-60 p-2 rounded-md bg-(--bg-card) hover:opacity-90 border border-(--border) shadow-lg transition cursor-pointer text-2xl"
        >
          <Comments className="text-(--text-main)" />
        </button>
      )}

      {isCreateProjectOpen && (
        <CreateProject
          onClose={toggleCreateProject}
          onSuccess={handleProjectCreated}
        />
      )}

      {isMobile ? (
        <div className="w-full h-full relative">
          <div className="w-full h-full">
            <MindMap />
          </div>

          {/* Mobile Sidebar Overlay */}
          <div
            className={`absolute top-0 left-0 h-full w-[80%] max-w-[320px] z-50 transition-transform duration-300 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar
              state={isSideBarOpen}
              func={toggleSideBar}
              func2={toggleCreateProject}
            />
          </div>

          {/* Mobile Conversation Overlay */}
          <div
            className={`absolute top-0 right-0 h-full w-full max-w-full z-50 transition-transform duration-300 ${isConvoOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <Conversation onClose={toggleConvo} />
          </div>
        </div>
      ) : (
        <Group className="h-[100dvh] w-full min-w-0" orientation="horizontal">
          <Panel
            defaultSize={15}
            minSize={15}
            maxSize={30}
            hidden={!isSideBarOpen}
          >
            <Sidebar
              state={isSideBarOpen}
              func={toggleSideBar}
              func2={toggleCreateProject}
            />
          </Panel>
          <Separator />
          <Panel defaultSize={60} maxSize={100} minSize={0}>
            <MindMap />
          </Panel>
          <Separator />
          <Panel
            defaultSize={25}
            minSize={20}
            maxSize={40}
            hidden={!isConvoOpen}
          >
            <Conversation onClose={toggleConvo} />
          </Panel>
        </Group>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[100dvh] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
