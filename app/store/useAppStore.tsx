import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
    user: null,
    theme: "light",
    session: {
        isAuthenticated: false,
        token: null,
        expiresAt: null,
    },

    //actions
    setUser: (user: any) => set({ user }),
    setTheme: (theme: string) => set({ theme }),
    setSession: (session: any) => set({ session }),
    clearSession: () => set({ session: { isAuthenticated: false, token: null, expiresAt: null } }),

    //getters
    getUser: () => {
        const { user: User } = get();
        return User;
    }

}))