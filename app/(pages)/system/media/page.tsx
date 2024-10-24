"use client";

import { IMedia } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { getMedias } from "./actions";
import { Table } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { ButtonPalette } from "@/components/button-palette";

const headerColumns = [
  { fieldName: "name", title: "Nome" },
  { fieldName: "mediaType", title: "Tipo" },
  { fieldName: "description", title: "Descrição" },
  { fieldName: "status", title: "Status" },
];

export default function Media() {
  return (
    <div>
      <MediasList />
    </div>
  );
}

function MediasList() {
  const [Medias, setMedias] = useState<IMedia[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      setMedias(await getMedias());
    }

    fetchData();
  }, []);

  if (Medias == undefined) return <Loading />;

  return (
    <div>
      <ButtonPalette
        hiddenBorder
        buttons={[{ name: "Incluir", src: "/system/media/view/0" }]}
      />
      <Table header={headerColumns} data={Medias} />
    </div>
  );
}
