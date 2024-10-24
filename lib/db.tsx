"use client";

import { openDB } from "idb";
import { getBlob } from "./actions";

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
