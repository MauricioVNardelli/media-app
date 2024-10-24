"use server";

import { z } from "zod";
import type { IAPIErrorResponse, IResultActions } from "@/lib/definitions";
import { cookies } from "next/headers";
import { api } from "@/services/api";
import { AxiosError } from "axios";

const signInSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
});

export async function signIn(
  _: unknown,
  data: FormData
): Promise<IResultActions | undefined> {
  let datatemp = {
    username: "tv.refeitorio",
    password: "#tvAR123",
  };

  console.log("username", Object.fromEntries(data));
  if (Object.fromEntries(data).username) {
    datatemp = Object.fromEntries(data);
  }

  const resultParse = signInSchema.safeParse(datatemp);

  if (!resultParse.success) {
    const errorMsg = resultParse.error.flatten().fieldErrors.password?.[0];

    if (errorMsg)
      return {
        error: {
          message: errorMsg,
        },
      };
  }

  try {
    const resAuth = (await api.post("/auth/user", resultParse.data)).data as {
      sessionKey: string;
    };

    const resSession = (
      await api.get(`/auth/user/session/${resAuth.sessionKey}`, {
        headers: {
          Authorization: "Bearer " + process.env.SECRET_KEY,
        },
      })
    ).data as { token: string };

    cookies().set({
      name: "token",
      value: resSession.token,
      path: "/",
    });

    api.defaults.headers.common["Authorization"] = "Bearer " + resSession.token;

    return {
      sucess: {
        value: resSession.token,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status !== 200) {
        const dataError = error.response?.data as IAPIErrorResponse;

        return { error: { message: dataError.message } };
      }
    }
  }
}
