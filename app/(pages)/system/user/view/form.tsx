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
          acc[key] = data[key as keyof IUser];
          return acc;
        }, {} as Record<string, any>) as IUser;

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
        className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8"
      >
        <Input
          id="id"
          title="Código"
          hidden={isInserting}
          className="md:col-span-2"
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

        <Input id="email" title="E-mail" {...register("email")} />

        <Input
          id="password"
          title="Senha"
          type="password"
          colSpan={isInserting ? 2 : 1}
          {...register("password")}
        />
      </Form>
    </div>
  );
}
