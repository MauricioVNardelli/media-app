"use server";

import { IResultActions, IUser } from "@/lib/definitions";
import { TreatError } from "@/lib/utils";
import { api } from "@/services/api";
import { AxiosError } from "axios";

export async function getUsers(): Promise<IUser[]> {
  const users = (await api.get("/users")).data as IUser[];

  return users;
}

export async function getUser(prId: string): Promise<IUser> {
  const user = (await api.get(`/user/${prId}`)).data as IUser;

  return user;
}

export async function updateUser(
  prId: string,
  prData: IUser
): Promise<IResultActions | undefined> {
  try {
    await api.patch(`/user/${prId}`, prData);

    return { sucess: { value: "updated" } };
  } catch (error) {
    return TreatError(error);
  }
}

export async function createUser(
  prData: IUser
): Promise<IResultActions | undefined> {
  const data = JSON.stringify({
    name: prData.name,
    role: prData.role,
    status: prData.status,
    password: prData.password,
    username: prData.username,
  });

  const dataConvert = JSON.parse(data);

  try {
    await api.post("/user", dataConvert);

    return { sucess: { value: "created" } };
  } catch (error) {
    return TreatError(error);
  }
}
