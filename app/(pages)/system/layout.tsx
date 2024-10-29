"use client";

import { GlobalContext } from "@/app/contexts/global";
import NavBar from "@/components/ui/navbar";
import clsx from "clsx";
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

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.log("Falha no registro do Service Worker:", error);
        });
    }
  }, []);

  return (
    <section className="flex flex-col h-full min-h-screen bg-gray-900">
      {!isUserTV && <NavBar />}
      <div id="system-layout" className={clsx("w-full", !isUserTV && "p-10")}>
        {children}
      </div>
    </section>
  );
}
