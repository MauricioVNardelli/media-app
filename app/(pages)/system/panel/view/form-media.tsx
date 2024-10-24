"use client";

import { useEffect, useState, useTransition } from "react";
import { createMediaPanel, deleteMediaPanel, getMedias } from "../actions";
import { IMedia, IPanelMedia } from "@/lib/definitions";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const headerTable = [
  { fieldName: "order", title: "Seq" },
  { fieldName: "name", title: "Nome" },
  { fieldName: "mediaType", title: "Tipo" },
  { fieldName: "status", title: "Situação" },
  { fieldName: "duration", title: "Duração (s)" },
];

export function FormMedia(props: { panelId: string }) {
  const [medias, setMedias] = useState<IMedia[]>();
  const [valueSelect, setValueSelect] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IPanelMedia>();

  useEffect(() => {
    getMedia();
  }, []);

  async function getMedia() {
    const response = await getMedias(props.panelId);

    setMedias(response);
  }

  async function handleRemove(prId: string) {
    await deleteMediaPanel(props.panelId, prId);
    await getMedia();
  }

  async function onSubmit(data: IPanelMedia) {
    const newData = {
      mediaId: valueSelect,
      panelId: props.panelId,
      duration: data.duration,
      order: data.order,
    } as IPanelMedia;

    const response = await createMediaPanel(newData);

    if (response?.error) {
      toast.warning(response.error.message);
    } else await getMedia();
  }

  return (
    <div>
      <p className="text-lg border-b my-4 text-gray-400 border-gray-600">
        Mídia
      </p>

      <Form
        hasSaveButton={false}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        className="flex my-4 items-center gap-2"
      >
        <ComboBox
          fieldView="name"
          fieldValue="id"
          fieldData="midiaId"
          title="Nome"
          src="/medias"
          className="flex-1"
          onValueChange={setValueSelect}
          value={valueSelect}
        />

        <Input
          type="number"
          title="Ordem"
          {...register("order", { valueAsNumber: true })}
        />

        <Input
          type="number"
          title="Duração (s)"
          {...register("duration", { valueAsNumber: true })}
        />

        <Button
          isLoading={isSubmitting}
          type="submit"
          className="w-32 h-10 mt-6"
        >
          Adicionar
        </Button>
      </Form>

      {medias ? (
        <Table
          hasDelete
          hasView={false}
          header={headerTable}
          data={medias}
          onRemoveClick={handleRemove}
        />
      ) : (
        <p className="text-white">Carregando mídias...</p>
      )}
    </div>
  );
}
