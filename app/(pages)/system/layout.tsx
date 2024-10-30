"use client";

import clsx from "clsx";
import NavBar from "@/components/ui/navbar";
import { GlobalContext } from "@/app/contexts/global";
import { useContext, useEffect, useState } from "react";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUserTV, setUserTV] = useState(false);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    setUserTV(user?.role == "TV");
  }, [user]);

  return (
    <section className="flex flex-col h-full min-h-screen bg-gray-900">
      {!isUserTV && <NavBar />}
      <div id="system-layout" className={clsx("w-full", !isUserTV && "p-10")}>
        {children}
      </div>
    </section>
  );
}
