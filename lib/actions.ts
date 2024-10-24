"use server";

import { cookies } from "next/headers";
import { IUser } from "./definitions";
import { jwtDecode } from "jwt-decode";
import { api } from "@/services/api";
import { list } from "@vercel/blob";
import { TreatError } from "./utils";

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
  try {
    const response = await api.get(prUrl);

    return response.data;
  } catch (error) {
    return TreatError(error);
  }
}

export async function signOut() {
  cookies().delete("token");
}

export async function getAllBlobs(prFolder: string) {
  return await list({
    prefix: prFolder,
  });
}

export async function getBlobFromUrl(prUrl: string) {
  const response = await fetch(prUrl);

  return await response.blob();
}
