import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type LoginResponse = {
  token: {
    accessToken: string;
    expiration: string;
    refreshToken: string;
  };
};

interface AuthType {
  isAuth: boolean;
  data: LoginResponse | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthType>()(
  //   persist(
  (set) => ({
    isAuth: !!localStorage.getItem("token"),
    data: JSON.parse(localStorage.getItem("token") as string) ?? null,
    login: (value) => set((state) => ({ data: value, isAuth: true })),
    logout: () => set((state) => ({ data: null, isAuth: false })),
  })
  // {
  //   name: "token",
  //   storage: createJSONStorage(() => localStorage),
  //   onRehydrateStorage: (state) => {
  //     console.log("hydration starts");
  //     console.log(state);
  //     // optional
  //     return (state, error) => {
  //       if (error) {
  //         console.log("an error happened during hydration", error);
  //       } else {
  //         console.log(state);
  //         console.log("hydration finished");
  //       }
  //     };
  //   },
  // }
  //)
);

export default useAuthStore;
