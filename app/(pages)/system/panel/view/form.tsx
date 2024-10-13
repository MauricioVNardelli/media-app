"use client";

import { ButtonPalette } from "@/components/button-palette";
import { IMedia, IPanel, IPanelMedia } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import {
  createPanel,
  updatePanel,
  getMedias,
  createMediaPanel,
} from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { const_status } from "@/lib/constants";
import { ComboBox } from "@/components/ui/combobox";
import { Table } from "@/components/ui/table";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

interface IFormProps {
  id: string;
  defaultValue: IPanel;
}

const columnsMedia = [{ fieldName: "name", title: "Nome" }];

export default function FormPanel({ id, defaultValue }: IFormProps) {
  const router = useRouter();
  const isInserting = id == "0";
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, dirtyFields },
  } = useForm<IPanel>({
    defaultValues: defaultValue,
  });

  async function onSubmit(data: IPanel) {
    if (id != undefined) {
      let response;

      if (isInserting) response = await createPanel(data);
      else {
        const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
          acc[key] = data[key as keyof IPanel];
          return acc;
        }, {} as Record<string, any>) as IPanel;

        response = await updatePanel(id, changedData);
      }

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
        gridCols={2}
        className="grid grid-cols-2 gap-3 mt-8"
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
          fieldValue="userId"
          title="Usuário"
          src="/users"
        />
      </Form>
      <FormMediaPanel panelId={id} />
    </div>
  );
}

interface IFormMediaPanel {
  panelId: string;
}

function FormMediaPanel(props: IFormMediaPanel) {
  const headerTable = [
    { fieldName: "name", title: "Nome" },
    { fieldName: "duration", title: "Duração(s)" },
  ];
  const [medias, setMedias] = useState<IMedia[]>();
  const [valueSelect, setValueSelect] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getMedia();
  }, []);

  async function getMedia() {
    const response = await getMedias(props.panelId);

    setMedias(response);
  }

  function handleAdd() {
    startTransition(async () => {
      const data = {
        mediaId: valueSelect,
        panelId: props.panelId,
        duration: 15,
      } as IPanelMedia;

      const response = await createMediaPanel(data);
      await getMedia();
    });
  }

  function handleRemove() {
    alert("deu boa");
  }

  return (
    <div>
      <p className="text-lg border-b my-4 text-gray-400 border-gray-600">
        Mídia
      </p>
      <div className="flex my-4 items-center">
        <ComboBox
          fieldView="name"
          fieldValue="id"
          title="Adicionar mídia"
          src="/medias"
          className="flex-1"
          onValueChange={setValueSelect}
          value={valueSelect}
        />

        <Button
          onClick={handleAdd}
          isLoading={isPending}
          className="w-24 h-10 mx-2 mt-6"
        >
          Adicionar
        </Button>
      </div>
      {medias && (
        <Table
          hasDelete
          hasView={false}
          header={headerTable}
          data={medias}
          onRemoveClick={handleRemove}
        />
      )}
    </div>
  );
}
