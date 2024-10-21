"use client";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { useForm } from "react-hook-form";
import { getUser } from "../../../actions";
import { useEffect, useState } from "react";
import { IUser } from "@/lib/definitions";
import { toast } from "sonner";

interface IChangePasswordUser {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PageChangePassword({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<IUser>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IChangePasswordUser>();

  useEffect(() => {
    const fetchUser = async () => {
      return await getUser(params.id);
    };

    if (!user)
      fetchUser().then((response) => {
        setUser(response);
      });
  }, []);

  async function onSubmit(prData: IChangePasswordUser) {
    if (prData.newPassword !== prData.confirmPassword)
      return toast.warning("A nova senha não é igual a senha de confirmação!");

    console.log("data", prData);
  }

  if (!user) return <p className="text-gray-300">Carregando...</p>;

  return (
    <div>
      <p className="text-gray-300">ALTERAR SENHA</p>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8"
      >
        <Input
          id="login"
          title="Usuário"
          disabled={true}
          className="md:col-span-2"
          value={user.username}
        />

        <InputPassword
          title="Senha"
          type="password"
          className="md:col-span-2"
          {...register("password")}
        />

        <InputPassword
          title="Nova senha"
          type="password"
          {...register("newPassword")}
        />

        <InputPassword
          title="Confirmar senha"
          type="password"
          {...register("confirmPassword")}
        />
      </Form>
    </div>
  );
}
