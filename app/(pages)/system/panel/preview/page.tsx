"use client";

import { GlobalContext } from "@/app/contexts/global";
import { Media } from "@/components/media";
import { ComboBox } from "@/components/ui/combobox";
import { getValueFromUrl } from "@/lib/actions";
import { IMediaPanel, IPanel } from "@/lib/definitions";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMediaPanel[]>();
  const [panelId, setPanelId] = useState("");

  async function getMedias() {
    if (panelId) {
      const response = (await getValueFromUrl(`/panel/${panelId}`)) as IPanel;

      if (response) {
        const dataMedia = (await getValueFromUrl(
          `/panel/${response.id}/media`
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

  return (
    <div>
      {user?.role !== "TV" && (
        <ComboBox
          fieldValue="id"
          fieldView="name"
          fieldData="id"
          src="/panels"
          title="Painel"
          onValueChange={setPanelId}
          value={panelId}
          className="mb-4"
        />
      )}

      {medias && (
        <div className="flex justify-center max-h-[calc(100vh-300px)] rounded-md border-4 border-gray-800">
          <Media medias={medias} />
        </div>
      )}
    </div>
  );
}
