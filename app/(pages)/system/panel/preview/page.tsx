"use client";

import { GlobalContext } from "@/app/contexts/global";
import { Media } from "@/components/media";
import { ComboBox } from "@/components/ui/combobox";
import { getValueFromUrl } from "@/lib/actions";
import { IMedia, IPanel } from "@/lib/definitions";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMedia[]>();
  const [panelId, setPanelId] = useState("");

  async function getMedias() {
    if (panelId) {
      const response = (await getValueFromUrl(`/panel/${panelId}`)) as IPanel;

      if (response) {
        const dataMedia = (await getValueFromUrl(
          `/panel/${response.id}/media`
        )) as IMedia[];

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
          src="/panels"
          title="Painel"
          onValueChange={setPanelId}
          value={panelId}
          className="mb-4"
        />
      )}

      {medias && (
        <Media
          medias={medias}
          className="rounded-md border-4 border-gray-800"
        />
      )}
    </div>
  );
}
