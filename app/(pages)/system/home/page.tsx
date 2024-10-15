"use client";

import { GlobalContext } from "@/app/contexts/global";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(GlobalContext);

  return (
    <div>
      <h1 className="text-white">Olá {user?.name}</h1>
    </div>
  );
}
