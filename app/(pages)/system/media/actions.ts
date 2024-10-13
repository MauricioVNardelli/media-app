"use server";

import { IMedia, IResultActions } from "@/lib/definitions";
import { TreatError } from "@/lib/utils";
import { api } from "@/services/api";

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
  prData: IMedia
): Promise<IResultActions | undefined> {
  const data = JSON.stringify({
    name: prData.name,
    description: prData.description,
    status: prData.status,
    mediaType: prData.mediaType,
    file: prData.file,
  } as IMedia);

  const dataJSON = JSON.parse(data);

  console.log("data - Media", dataJSON);

  try {
    await api.patch(`/media/${prId}`, dataJSON);

    return { sucess: { value: "updated" } };
  } catch (error) {
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
    return TreatError(error);
  }
}
