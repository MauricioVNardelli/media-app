"use client";

import { useEffect, useState, useTransition } from "react";
import { createMediaPanel, deleteMediaPanel, getMedias } from "../actions";
import { IMedia, IPanelMedia } from "@/lib/definitions";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { toast } from "sonner";

interface IFormMediaPanel {
  panelId: string;
}

const headerTable = [
  { fieldName: "name", title: "Nome" },
  { fieldName: "duration", title: "Duração(s)" },
];

export function FormMedia(props: IFormMediaPanel) {
  const [medias, setMedias] = useState<IMedia[]>();
  const [valueSelect, setValueSelect] = useState("");
  const [isPending, startTransition] = useTransition();
  const [duration, setDuration] = useState(60);

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
        duration: duration,
      } as IPanelMedia;

      const response = await createMediaPanel(data);

      if (response?.error) {
        toast.warning(response.error.message);
      } else await getMedia();
    });
  }

  async function handleRemove(prId: string) {
    await deleteMediaPanel(props.panelId, prId);
    await getMedia();
  }

  return (
    <div>
      <p className="text-lg border-b my-4 text-gray-400 border-gray-600">
        Mídia
      </p>

      <div className="flex my-4 items-center gap-2">
        <ComboBox
          fieldView="name"
          fieldValue="id"
          title="Adicionar mídia"
          src="/medias"
          className="flex-1"
          onValueChange={setValueSelect}
          value={valueSelect}
        />

        <Input
          type="number"
          title="Duração (s)"
          value={duration}
          onChange={(event) => {
            setDuration(event.currentTarget.valueAsNumber);
          }}
        />

        <Button
          onClick={handleAdd}
          isLoading={isPending}
          className="w-24 h-10 mt-6"
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
