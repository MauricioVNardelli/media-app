"use client";

import { ButtonPalette } from "@/components/button-palette";
import { IPanel } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { createPanel, updatePanel } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { const_status } from "@/lib/constants";
import { ComboBox } from "@/components/ui/combobox";
import { FormMedia } from "./form-media";

interface IFormProps {
  id: string;
  defaultValue: IPanel;
}

export default function FormPanel({ id, defaultValue }: IFormProps) {
  const router = useRouter();
  const isInserting = id == "0";
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IPanel>({
    defaultValues: defaultValue,
  });

  async function onSubmit(prData: IPanel) {
    if (id != undefined) {
      let response;

      if (isInserting) response = await createPanel(prData);
      else response = await updatePanel(id, prData, defaultValue);

      if (response?.error) return toast.warning(response.error.message);

      return router.push("/system/panel");
    }
  }

  return (
    <div>
      <ButtonPalette buttons={[{ name: "Voltar", src: "/system/panel" }]} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        className="grid md:grid-cols-2 gap-3 mt-8"
      >
        <Input id="name" title="Nome" {...register("name")} />

        <Input
          id="description"
          title="Descrição"
          {...register("description")}
        />

        <Select
          id="status"
          title="Situação"
          values={const_status}
          {...register("status")}
        />

        <ComboBox
          control={control}
          fieldView="username"
          fieldValue="id"
          fieldData="userId"
          title="Usuário"
          src="/users"
        />
      </Form>

      {id !== "0" && <FormMedia panelId={id} />}
    </div>
  );
}
