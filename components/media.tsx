"use client";

import { IMediaPanel } from "@/lib/definitions";
import { useEffect, useState } from "react";

interface IMediaProps {
  medias: IMediaPanel[];
  className?: string;
}

export function Media({ medias, ...otherProps }: IMediaProps) {
  const [currentMedia, setCurrentMedia] = useState<number>(0);
  const [reload, setReload] = useState(0);

  setTimeout(() => {
    setReload(reload + 1);

    if (currentMedia == medias.length - 1) return setCurrentMedia(0);

    return setCurrentMedia(currentMedia + 1);
  }, medias[currentMedia].duration * 1000);

  if (!medias)
    return (
      <div>
        <p>Carregando....</p>
      </div>
    );

  return (
    <div id="component-media" key={reload} className={otherProps.className}>
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
