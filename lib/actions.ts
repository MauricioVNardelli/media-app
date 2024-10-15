"use server";

import { cookies } from "next/headers";
import { IUser } from "./definitions";
import { jwtDecode } from "jwt-decode";
import { api } from "@/services/api";

export async function getUser(): Promise<IUser | undefined> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token && token.value) {
    try {
      const decoded = jwtDecode(token.value) as { user: IUser };
      return decoded.user;
    } catch {
      return undefined;
    }
  }
}

export async function getValueFromUrl(prUrl: string): Promise<any> {
  const response = await api.get(prUrl);

  return response.data;
}

export async function signOut() {
  cookies().delete("token");
}
