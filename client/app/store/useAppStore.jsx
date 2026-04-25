import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      theme: "light",
      currentProject: null,

      architectureData: null,
      refreshSidebarTrigger: 0,
      downloadFormat: null,
      //actions
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setCurrentProject: (project) => set({ currentProject: project }),
      setDownloadFormat: (format) => set({ downloadFormat: format }),

      setArchitectureData: (architecture) =>
        set({ architectureData: architecture }),
      triggerSidebarRefresh: () =>
        set((state) => ({
          refreshSidebarTrigger: state.refreshSidebarTrigger + 1,
        })),

      //getters
      getUser: () => get().user,
      getTheme: () => get().theme,
      getCurrentProject: () => get().currentProject,

      getArchitectureData: () => get().architectureData,
    }),
    {
      name: "app-store",
    },
  ),
);
