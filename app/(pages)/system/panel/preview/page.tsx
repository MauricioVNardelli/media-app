"use client";

import { GlobalContext } from "@/app/contexts/global";
import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { getValueFromUrl } from "@/lib/actions";
import { IMediaPanel, IPanel } from "@/lib/definitions";
import { openDB } from "idb";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMediaPanel[]>();
  const [panelId, setPanelId] = useState("");

  async function getMedias() {
    if (panelId) {
      const response = (await getValueFromUrl(`/panel/${panelId}`)) as IPanel;

      if (response) {
        const dataMedia = (await getValueFromUrl(
          `/panel/${response.id}/media?mediaStatus=ATIVO`
        )) as IMediaPanel[];

        dataMedia.sort((a, b) => {
          if (a.order < b.order) return -1;

          if (a.order > b.order) return 1;

          return 0;
        });

        setMedias(dataMedia);
      }
    }
  }

  useEffect(() => {
    getMedias();
  }, [user, panelId]);

  async function handleClearCache() {
    const db = await openDB("mediaDB");
    db.clear("files");

    toast.success("Limpeza do cache realizada!");
  }

  return (
    <div>
      <div className="flex space-x-2">
        <ComboBox
          fieldValue="id"
          fieldView="name"
          fieldData="id"
          src="/panels"
          title="Painel"
          onValueChange={setPanelId}
          value={panelId}
          className="flex-1 mb-4"
        />

        <Button type="button" onClick={handleClearCache} className="w-28 mt-7">
          Limpar cache
        </Button>
      </div>

      {medias && (
        <div className="flex justify-center max-h-[calc(100vh-300px)] rounded-md border-4 border-gray-800">
          <Media medias={medias} />
        </div>
      )}
    </div>
  );
}
