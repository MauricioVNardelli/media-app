"use server";

import { z } from "zod";
import { IMedia, IPanel, IPanelMedia, IResultActions } from "@/lib/definitions";
import { getDifferencesData, TreatError } from "@/lib/utils";
import { api } from "@/services/api";

export async function getPanels(): Promise<IPanel[]> {
  const response = (await api.get("/panels")).data as IPanel[];

  return response;
}

export async function getPanel(prId: string): Promise<IPanel> {
  const response = (await api.get(`/panel/${prId}`)).data as IPanel;

  return response;
}

export async function getMedias(prPanelId: string): Promise<IMedia[]> {
  const response = (await api.get(`/panel/${prPanelId}/media`))
    .data as IMedia[];

  return response;
}

export async function createMediaPanel(
  prData: IPanelMedia
): Promise<IResultActions | undefined> {
  const schema = z
    .object({
      panelId: z.string(),
      mediaId: z.string(),
      duration: z.number({
        required_error: "Duração obrigatória",
        invalid_type_error: "Duração obrigatória",
      }),
      order: z.number({
        required_error: "Ordem obrigatória",
        invalid_type_error: "Ordem obrigatória",
      }),
    })
    .required();

  const resultParse = schema.safeParse(prData);

  if (!resultParse.success) {
    const errorMsg = resultParse.error.errors[0].message;

    if (errorMsg)
      return {
        error: {
          message: errorMsg,
        },
      };
  }

  try {
    await api.post("/panel/media", prData);

    return { sucess: { value: "created" } };
  } catch (error) {
    return TreatError(error);
  }
}

export async function deleteMediaPanel(prPanelId: string, prMediaId: string) {
  const url = `/panel/${prPanelId}/media/${prMediaId}`;
  const response = await api.delete(url);
}

export async function updatePanel(
  prId: string,
  prData: IPanel,
  prDefaultValue: IPanel
): Promise<IResultActions | undefined> {
  const changeData = getDifferencesData(prDefaultValue, prData);

  try {
    await api.patch(`/panel/${prId}`, changeData);

    return { sucess: { value: "updated" } };
  } catch (error) {
    return TreatError(error);
  }
}

export async function createPanel(
  prData: IPanel
): Promise<IResultActions | undefined> {
  try {
    await api.post("/panel", prData);

    return { sucess: { value: "updated" } };
  } catch (error) {
    return TreatError(error);
  }
}
