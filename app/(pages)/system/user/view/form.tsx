"use client";

import { ButtonPalette } from "@/components/button-palette";
import { Input } from "@/components/ui/input";
import { IUser } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { createUser, updateUser } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { const_user_role } from "@/lib/constants";

interface IFormProps {
  id: string;
  defaultValue: IUser;
}

export default function FormUser({ id, defaultValue }: IFormProps) {
  const router = useRouter();
  const isInserting = id == "0";
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = useForm<IUser>({
    defaultValues: defaultValue,
  });

  async function onSubmit(data: IUser) {
    if (id != undefined) {
      let response;

      if (isInserting) response = await createUser(data);
      else {
        const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {}) as IUser;

        response = await updateUser(id, changedData);
      }

      if (response?.error) return toast.warning(response.error.message);

      return router.push("/system/user");
    }
  }

  return (
    <div>
      <ButtonPalette buttons={[{ name: "Voltar", src: "/system/user" }]} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        gridCols={2}
        className="grid grid-cols-2 gap-3 mt-8"
      >
        <Input
          id="id"
          title="Código"
          hidden={isInserting}
          className="col-span-2"
          disabled
          {...register("id")}
        />

        <Input id="name" title="Nome" {...register("name")} />
        <Input id="login" title="Usuário" {...register("username")} />

        <Select
          id="role"
          title="Perfil"
          values={const_user_role}
          {...register("role")}
        />
        <Input
          id="email"
          title="E-mail"
          colSpan={!isInserting ? 2 : undefined}
          {...register("email")}
        />

        <Input
          id="password"
          title="Senha"
          colSpan={2}
          hidden={!isInserting}
          type="password"
          {...register("password")}
        />
      </Form>
    </div>
  );
}
