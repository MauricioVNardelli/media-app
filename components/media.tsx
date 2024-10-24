"use client";

import { IMediaPanel } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Loading } from "./ui/loading";
import { getBlobFromUrl } from "@/lib/actions";

interface IMediaProps {
  medias: IMediaPanel[];
  className?: string;
}

export function Media({ medias, ...otherProps }: IMediaProps) {
  const [currentMedia, setCurrentMedia] = useState<number>();
  const [loadingMedia, setLoadingMedia] = useState("");

  async function addMediasDB() {
    const uploadMedias = medias.map(async (media) => {
      setLoadingMedia(media.name);

      console.log("carregando ", media.name);
      const blob = await getBlobFromUrl(media.file);
      media.file = URL.createObjectURL(blob);
      console.log("carregou ", media.name);
    });

    await Promise.all(uploadMedias).then(() => {
      setCurrentMedia(0);
    });
  }

  useEffect(() => {
    addMediasDB();
  }, []);

  if (currentMedia !== undefined) {
    if (medias.length > 1)
      setTimeout(() => {
        if (currentMedia == medias.length - 1) return setCurrentMedia(0);

        return setCurrentMedia(currentMedia + 1);
      }, medias[currentMedia].duration * 1000);

    return (
      <div id="component-media" className={otherProps.className}>
        {medias[currentMedia].mediaType == "IMAGEM" ? (
          <img
            key={medias[currentMedia].file}
            alt={medias[currentMedia].name}
            src={medias[currentMedia].file}
            className="w-full h-full max-h-screen"
          />
        ) : (
          <div>
            <video
              id="video"
              key={medias[currentMedia].file}
              className="w-full h-full max-h-screen"
              autoPlay
              loop={medias.length == 1 ? true : false}
            >
              <source src={medias[currentMedia].file} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Loading text={'Carregando... "' + loadingMedia + '"'} />
    </div>
  );
}
