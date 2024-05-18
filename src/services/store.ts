import { create } from "zustand";

type State = {
    user: { name: string, email: string, id: string, role: string } | null,
    token: string | null ,
    refresh: string | null 
}

type Actions = {
    setUser: (user: State["user"]) => void
    setToken: (token: State["token"]) => void;
    setRefresh: (refresh: State["refresh"]) => void
}

const store = create<State & Actions>((set) => ({
    user: null,
    token: null,
    refresh: null,
    setUser: (user) => set(() => ({ user: user })),
    setToken: (token) => set(() => ({ token: token })),
    setRefresh: (refresh) => set(() => ({ refresh: refresh })),
}))

export default store;