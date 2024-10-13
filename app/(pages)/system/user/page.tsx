"use client";

import { IUser } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { getUsers } from "./actions";
import { Table } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { ButtonPalette } from "@/components/button-palette";

const headerColumns = [
  { fieldName: "name", title: "Nome" },
  { fieldName: "role", title: "Perfil" },
  { fieldName: "username", title: "Usuário" },
  { fieldName: "status", title: "Status" },
];

export default function User() {
  return (
    <div>
      <Users />
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState<IUser[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      //const response = await api.get("/users");
      setUsers(await getUsers());
    }

    fetchData();
  }, []);

  if (users == undefined) return <Loading />;

  return (
    <div>
      <ButtonPalette
        hiddenBorder
        buttons={[{ name: "Incluir", src: "/system/user/view/0" }]}
      />
      <Table header={headerColumns} data={users} />
    </div>
  );
}
