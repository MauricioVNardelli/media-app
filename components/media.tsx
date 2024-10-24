"use client";

import { getBlob } from "@/lib/actions";
import { IMediaPanel } from "@/lib/definitions";
import { openDB } from "idb";
import { useEffect, useState } from "react";
import { Loading } from "./ui/loading";

interface IMediaProps {
  medias: IMediaPanel[];
  className?: string;
}

export function Media({ medias, ...otherProps }: IMediaProps) {
  const [currentMedia, setCurrentMedia] = useState<number>(-1);

  async function addMediasDB() {
    const uploadMedias = medias.map(async (media) => {
      const url = await addMediaDB(media.file, media.id);
      media.file = url;
    });

    await Promise.all(uploadMedias);

    setCurrentMedia(0);
  }

  useEffect(() => {
    addMediasDB();
  }, []);

  if (currentMedia > -1) {
    if (medias.length > 1)
      setTimeout(() => {
        if (currentMedia == medias.length - 1) return setCurrentMedia(0);

        return setCurrentMedia(currentMedia + 1);
      }, medias[currentMedia].duration * 1000);
  }

  if (currentMedia > -1)
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
            <button
              className="text-white"
              onClick={() => document.getElementById("video").play()}
            >
              Play Video
            </button>
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

  return (
    <div>
      <Loading />
    </div>
  );
}

export async function addMediaDB(
  prUrl: string,
  prKey: string
): Promise<string> {
  const db = await openDB("mediaDB", 1.0, {
    upgrade(db) {
      db.createObjectStore("files");
    },
  });

  let blobDB = await db.get("files", prKey);

  if (!blobDB) {
    blobDB = await getBlob(prUrl);

    await db.put("files", blobDB, prKey);
  }

  return URL.createObjectURL(blobDB);
}
