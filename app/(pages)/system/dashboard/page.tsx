"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/contexts/global";
import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { getValueFromUrl } from "@/lib/actions";
import { IMediaPanel, IPanel } from "@/lib/definitions";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMediaPanel[]>();
  const [start, setStart] = useState(false);

  async function getMedias() {
    const data = (await getValueFromUrl(
      `/panels?userId=${user?.id}`
    )) as IPanel[];

    if (data && data.length > 0) {
      const dataMedia = (await getValueFromUrl(
        `/panel/${data[0].id}/media?mediaStatus=ATIVO`
      )) as IMediaPanel[];

      dataMedia.sort((a, b) => {
        if (a.order < b.order) return -1;

        if (a.order > b.order) return 1;

        return 0;
      });

      return setMedias(dataMedia);
    }

    return setMedias([]);
  }

  useEffect(() => {
    getMedias();
  }, [user]);

  function handleButtonStart() {
    setStart(true);

    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).mozRequestFullScreen) {
      // Para Firefox
      (elem as any).mozRequestFullScreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      // Para Chrome, Safari e Opera
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      // Para IE/Edge
      (elem as any).msRequestFullscreen();
    }
  }

  if (medias && medias.length == 0)
    return (
      <div>
        <p className="text-white">Nenhuma midia encontrada</p>
      </div>
    );

  return (
    <div
      id="page-dashboard"
      className="flex min-h-screen w-full items-center justify-center"
    >
      {!medias ? (
        <Loading />
      ) : medias && start ? (
        <Media medias={medias} />
      ) : (
        <Button
          className="w-32 h-24 font-semibold"
          type="button"
          onClick={handleButtonStart}
        >
          Iniciar
        </Button>
      )}
    </div>
  );
}
