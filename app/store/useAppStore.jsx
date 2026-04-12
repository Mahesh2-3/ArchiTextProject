import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  user: null,
  theme: "light",
  currentProject: null,
  currentConversation: null,
  architectureData: null,
  //actions
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentConversation: (conversation) =>
    set({ currentConversation: conversation }),
  setArchitectureData: (architecture) =>
    set({ architectureData: architecture }),

  //getters
  getUser: () => get().user,
  getTheme: () => get().theme,
  getCurrentProject: () => get().currentProject,
  getCurrentConversation: () => get().currentConversation,
  getArchitectureData: () => get().architectureData,
}));
