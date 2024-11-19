import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string;
  name: string;
  login: (data: { email: string; name: string }) => void;
  logout: () => void;
  isAuthenticated: boolean; // Novo campo
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      name: "",
      isAuthenticated: false,
      login: (data) =>
        set({
          email: data.email,
          name: data.name,
          isAuthenticated: true,
        }),
      logout: () => set({ email: "", name: "", isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // Nome da chave no localStorage
    }
  )
);
