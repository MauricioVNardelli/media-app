"use client";

import { GlobalContext } from "@/app/contexts/global";
import { getValueFromUrl } from "@/lib/actions";
import { IMedia, IPanel } from "@/lib/definitions";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useContext(GlobalContext);
  const [medias, setMedias] = useState<IMedia[]>();
  const [currentMedia, setCurrentMedia] = useState(0);
  const isUserTV = user?.role == "TV";

  async function getMedias() {
    const data = (await getValueFromUrl("/panels")) as IPanel[];

    const dataPanels = data.filter((panel) => {
      return panel.username == user?.username;
    });

    if (dataPanels.length > 0) {
      const dataMedia = (await getValueFromUrl(
        `/panel/${dataPanels[0].id}/media`
      )) as IMedia[];

      setMedias(dataMedia);
    }
  }

  useEffect(() => {
    if (isUserTV) {
      getMedias();
    }
  }, [user]);

  useEffect(() => {
    if (medias && isUserTV && medias[currentMedia].duration) {
      let duration = medias[currentMedia].duration;

      if (duration < 2000) duration = 5000;

      setTimeout(() => {
        if (currentMedia == medias.length - 1) setCurrentMedia(0);
        else setCurrentMedia(currentMedia + 1);
      }, duration);
    }
  }, [medias, currentMedia]);

  if (!isUserTV)
    return (
      <div>
        <h1 className="text-white">Olá {user?.name}</h1>
      </div>
    );

  return (
    <div>
      {medias ? (
        medias[currentMedia].mediaType == "IMAGEM" ? (
          <img
            alt={medias[currentMedia].name}
            src={medias[currentMedia].file}
            className="w-full max-h-[calc(100vh-4rem)]"
          />
        ) : (
          <iframe
            className="aspect-video w-full max-h-[calc(100vh-4rem)]"
            src={`${medias[currentMedia].file}&controls=0&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )
      ) : (
        <p className="text-white">Carregando mídias...</p>
      )}
    </div>
  );
}
