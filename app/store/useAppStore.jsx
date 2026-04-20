import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      theme: "light",
      currentProject: null,
      currentConversation: null,
      architectureData: null,
      refreshSidebarTrigger: 0,
      //actions
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setCurrentProject: (project) => set({ currentProject: project }),
      setCurrentConversation: (conversation) =>
        set({ currentConversation: conversation }),
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
      getCurrentConversation: () => get().currentConversation,
      getArchitectureData: () => get().architectureData,
    }),
    {
      name: "app-store",
    },
  ),
);
