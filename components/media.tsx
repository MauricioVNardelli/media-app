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
  const [blobs, setBlobs] = useState<string[]>();

  async function addMediasDB() {
    const uploadMedias = medias.map(async (media) => {
      setLoadingMedia(media.name);
      const blob = await getBlobFromUrl(media.file);

      return URL.createObjectURL(blob);
    });

    await Promise.all(uploadMedias).then((value) => {
      setBlobs(value);
      setCurrentMedia(0);
    });
  }

  useEffect(() => {
    addMediasDB();

    return () => {
      blobs?.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [medias]);

  useEffect(() => {
    if (currentMedia !== undefined && medias.length > 1) {
      const timeout = setTimeout(() => {
        if (currentMedia == medias.length - 1) return setCurrentMedia(0);

        return setCurrentMedia(currentMedia + 1);
      }, medias[currentMedia].duration * 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentMedia]);

  if (currentMedia !== undefined && blobs) {
    const url = blobs[currentMedia];

    return (
      <div id="component-media" className={otherProps.className}>
        {medias[currentMedia].mediaType == "IMAGEM" ? (
          <img
            key={medias[currentMedia].id}
            alt={medias[currentMedia].name}
            src={url}
            className="w-full h-full max-h-screen"
          />
        ) : (
          <div>
            <button
              onClick={() => {
                const video = document.getElementById(
                  "video"
                ) as HTMLVideoElement;
                video.play();
              }}
              className="text-white"
            >
              PLAY
            </button>
            <video
              id="video"
              key={medias[currentMedia].id}
              className="w-full h-full max-h-screen"
              //autoPlay
              loop={medias.length == 1 ? true : false}
            >
              <source src={url} type="video/mp4" />
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
