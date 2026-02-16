"use client";

import { useActionState, useContext, useState } from "react";
import { signIn } from "./actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/app/contexts/global";
import { InputPassword } from "@/components/ui/input-password";

export default function SignIn() {
  const [result, handleSignIn, isPending] = useActionState(signIn, null);
  const { signIn: signInCtx } = useContext(GlobalContext);
  const [isAuthCode, setIsAuthCode] = useState(false);

  console.log("Passou pelo SignIn", result);
  if (result?.error || result?.sucess) {
    if (result.error) toast.warning(result?.error.message);
    else if (result.sucess) {
      signInCtx(result.sucess.value);
    }

    result.error = undefined;
    result.sucess = undefined;
  }

  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="flex flex-col w-full h-full items-center">
        <h1 className="font-bold mt-32 text-3xl mb-10 text-white">
          Acesse sua conta
        </h1>

        <form action={handleSignIn} className="flex flex-col w-64 space-y-2">
          {isAuthCode ? (
            <Input name="code" placeholder="Codigo" disabled={isPending} />
          ) : (
            <>
              <Input
                autoComplete="on"
                name="username"
                placeholder="Usuário"
                disabled={isPending}
              />

              <InputPassword
                autoComplete="on"
                name="password"
                placeholder="Senha"
                disabled={isPending}
              />
            </>
          )}

          <Button type="submit" isLoading={isPending}>
            Entrar
          </Button>
        </form>

        <button
          type="button"
          className="mt-10 text-gray-300 hover:text-gray-600"
          onClick={() => {
            setIsAuthCode(!isAuthCode);
          }}
        >
          {isAuthCode ? "Acessar com usuário/senha" : "Acessar via código"}
        </button>
      </div>
    </div>
  );
}
