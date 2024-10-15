"use client";

import { IMedia } from "@/lib/definitions";
import { useEffect, useState } from "react";

interface IMediaProps {
  medias: IMedia[];
  className?: string;
}

export function Media({ medias, ...otherProps }: IMediaProps) {
  const [currentMedia, setCurrentMedia] = useState(0);

  useEffect(() => {
    if (medias && medias[currentMedia].duration) {
      let duration = medias[currentMedia].duration * 1000;

      setTimeout(() => {
        if (currentMedia == medias.length - 1) setCurrentMedia(0);
        else setCurrentMedia(currentMedia + 1);
      }, duration);
    }
  }, [medias, currentMedia]);

  return (
    <div id="component-media" className={otherProps.className}>
      {medias[currentMedia].mediaType == "IMAGEM" ? (
        <img
          alt={medias[currentMedia].name}
          src={medias[currentMedia].file}
          className="w-full"
        />
      ) : (
        <iframe
          className="aspect-video w-full"
          src={`${medias[currentMedia].file}&controls=0&autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
