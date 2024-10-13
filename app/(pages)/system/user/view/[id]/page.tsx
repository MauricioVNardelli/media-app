import { IUser } from "@/lib/definitions";
import { getUser } from "../../actions";
import FormUser from "../form";

export default async function ViewUser({ params }: { params: { id: string } }) {
  let user = {} as IUser;

  if (params.id !== "0") user = await getUser(params.id);

  return <FormUser defaultValue={user} id={params.id} />;
}
