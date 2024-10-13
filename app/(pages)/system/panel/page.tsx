"use client";

import { IPanel } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { getPanels } from "./actions";
import { Table } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { ButtonPalette } from "@/components/button-palette";

const headerColumns = [
  { fieldName: "name", title: "Nome" },
  { fieldName: "description", title: "Descrição" },
  { fieldName: "username", title: "Usuário" },
  { fieldName: "status", title: "Status" },
];

export default function Panel() {
  return (
    <div>
      <PanelsList />
    </div>
  );
}

function PanelsList() {
  const [panels, setPanels] = useState<IPanel[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      setPanels(await getPanels());
    }

    fetchData();
  }, []);

  if (panels == undefined) return <Loading />;

  return (
    <div>
      <ButtonPalette
        hiddenBorder
        buttons={[{ name: "Incluir", src: "/system/panel/view/0" }]}
      />
      <Table header={headerColumns} data={panels} />
    </div>
  );
}
