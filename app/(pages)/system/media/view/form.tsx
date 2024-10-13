"use client";

import { ButtonPalette } from "@/components/button-palette";
import { IMedia } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { createMedia, updateMedia } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { const_media, const_status } from "@/lib/constants";
import { ComboBox } from "@/components/ui/combobox";

interface IFormProps {
  id: string;
  defaultValue: IMedia;
}

export default function FormMedia({ id, defaultValue }: IFormProps) {
  const router = useRouter();
  const isInserting = id == "0";
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IMedia>({
    defaultValues: defaultValue,
  });

  async function onSubmit(data: IMedia) {
    if (id != undefined) {
      let response;

      if (isInserting) response = await createMedia(data);
      else response = await updateMedia(id, data);

      if (response?.error) return toast.warning(response.error.message);

      return router.push("/system/media");
    }
  }

  return (
    <div>
      <ButtonPalette buttons={[{ name: "Voltar", src: "/system/media" }]} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        gridCols={2}
        className="grid grid-cols-2 gap-3 mt-8"
      >
        <Input id="name" title="Nome" {...register("name")} />
        <Select
          id="status"
          title="Situação"
          values={const_status}
          {...register("status")}
        />

        <Select
          id="mediaType"
          title="Tipo"
          values={const_media}
          {...register("mediaType")}
        />
        <Input
          id="description"
          title="Descrição"
          {...register("description")}
        />

        <Input id="file" title="URL" colSpan={2} {...register("file")} />
      </Form>
    </div>
  );
}
