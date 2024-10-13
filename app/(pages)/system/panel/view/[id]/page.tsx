import { IPanel } from "@/lib/definitions";
import { getPanel } from "../../actions";
import FormPanel from "../form";

export default async function ViewPanel({
  params,
}: {
  params: { id: string };
}) {
  let panel = {} as IPanel;

  if (params.id !== "0") panel = await getPanel(params.id);

  return <FormPanel defaultValue={panel} id={params.id} />;
}
