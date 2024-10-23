"use server";

import { IMedia, IResultActions } from "@/lib/definitions";
import { getDifferencesData, TreatError } from "@/lib/utils";
import { api } from "@/services/api";
import { del } from "@vercel/blob";

export async function getMedias(): Promise<IMedia[]> {
  const medias = (await api.get("/medias")).data as IMedia[];

  return medias;
}

export async function getMedia(prId: string): Promise<IMedia> {
  const Media = (await api.get(`/Media/${prId}`)).data as IMedia;

  return Media;
}

export async function updateMedia(
  prId: string,
  prData: IMedia,
  prDataOld: IMedia
): Promise<IResultActions | undefined> {
  try {
    /*if (prData.status == "INATIVO" && prData.file !== "") {
      await deleteFile(prData.file);

      prData.file = "";
    }*/

    const newData = getDifferencesData(prDataOld, prData);
    console.log("newData", newData);

    await api.patch(`/media/${prId}`, newData);

    /*if (prDataOld.file !== prData.file && prData.file !== "")
      deleteFile(prDataOld.file);*/

    return { sucess: { value: "updated" } };
  } catch (error) {
    //if (prData.file !== "") deleteFile(prData.file);

    return TreatError(error);
  }
}

export async function createMedia(
  prData: IMedia
): Promise<IResultActions | undefined> {
  try {
    await api.post("/media", prData);

    return { sucess: { value: "created" } };
  } catch (error) {
    //deleteFile(prData.file);
    return TreatError(error);
  }
}

export async function deleteFile(prUrl: string) {
  await del(prUrl);
}
