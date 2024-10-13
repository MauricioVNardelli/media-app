import { IMedia } from "@/lib/definitions";
import { getMedia } from "../../actions";
import FormMedia from "../form";

export default async function ViewMedia({
  params,
}: {
  params: { id: string };
}) {
  let panel = {} as IMedia;

  if (params.id !== "0") panel = await getMedia(params.id);

  return <FormMedia defaultValue={panel} id={params.id} />;
}
