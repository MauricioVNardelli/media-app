"use client";

import { GlobalContext } from "@/app/contexts/global";
import { Media } from "@/components/media";
import { getValueFromUrl } from "@/lib/actions";
import { IMedia, IPanel } from "@/lib/definitions";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMedia[]>();

  async function getMedias() {
    const data = (await getValueFromUrl(
      `/panels?userId=${user?.id}`
    )) as IPanel[];

    if (data && data.length > 0) {
      const dataMedia = (await getValueFromUrl(
        `/panel/${data[0].id}/media`
      )) as IMedia[];

      setMedias(dataMedia);
    }
  }

  useEffect(() => {
    getMedias();
  }, [user]);

  if (!medias)
    return <p className="text-gray-300">Nenhuma mídia encontrada!</p>;

  return <div id="page-dashboard">{medias && <Media medias={medias} />}</div>;
}
