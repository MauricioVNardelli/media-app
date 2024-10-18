"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/contexts/global";
import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { getValueFromUrl } from "@/lib/actions";
import { IMedia, IPanel } from "@/lib/definitions";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMedia[]>();
  const [start, setStart] = useState(false);

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
          id="button-start"
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
