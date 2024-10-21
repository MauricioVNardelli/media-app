"use client";

import { IMediaPanel } from "@/lib/definitions";
import { useEffect, useState } from "react";

interface IMediaProps {
  medias: IMediaPanel[];
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
          className="w-full h-full max-h-screen"
        />
      ) : (
        <video className="w-full h-full max-h-screen" preload="none" autoPlay>
          <source src={medias[currentMedia].file} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
