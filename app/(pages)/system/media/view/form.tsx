"use client";

import { ButtonPalette } from "@/components/button-palette";
import { IMedia } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { createMedia, updateMedia, uploadFile } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { const_media, const_status } from "@/lib/constants";
import { InputFile } from "@/components/ui/input-file";
import { useState } from "react";

interface IFormProps {
  id: string;
  defaultValue: IMedia;
}

export default function FormMedia({ id, defaultValue }: IFormProps) {
  const router = useRouter();
  const isInserting = id == "0";
  const [file, setFile] = useState<File>();
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IMedia>({
    defaultValues: defaultValue,
  });

  async function onSubmit(data: IMedia) {
    if (id) {
      let response;

      const newData = { fileStream: file, ...data } as IMedia;

      if (isInserting) response = await createMedia(newData);
      else response = await updateMedia(id, newData, defaultValue);

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
        className="grid md:grid-cols-2 gap-3 mt-8"
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

        <InputFile
          title="Arquivo"
          fieldname="file"
          className="md:col-span-2"
          onFileChange={setFile}
          control={control}
        />
      </Form>
    </div>
  );
}
