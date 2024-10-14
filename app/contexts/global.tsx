"use client";

import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { IUser } from "@/lib/definitions";
import { getUser, signOut as signOutAction } from "@/lib/actions";

interface IGlobalContext {
  user: IUser | undefined;
  isAuthenticated: boolean;
  signIn: (prToken: string) => void;
  signOut: () => void;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>();
  const isAuthenticated = user != undefined;
  const router = useRouter();

  useEffect(() => {
    async function getUserAction() {
      const userAction = await getUser();

      if (userAction) setUser(userAction);
    }

    getUserAction();
  }, []);

  async function signIn(prToken: string) {
    const decoded = jwtDecode(prToken) as { user: IUser };

    setUser(decoded.user);
    router.push("/system/dashboard");
  }

  async function signOut() {
    await signOutAction();

    router.push("/auth");
  }

  return (
    <GlobalContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
