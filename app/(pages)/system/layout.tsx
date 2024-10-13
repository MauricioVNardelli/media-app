"use client";

import { GlobalContext } from "@/app/contexts/global";
import NavBar from "@/components/ui/navbar";
import clsx from "clsx";
import { useContext } from "react";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(GlobalContext);
  const isUserTV = user?.role == "TV";

  return (
    <section className="h-full min-h-screen bg-gray-900">
      <NavBar />
      <div id="layout" className={clsx(user && !isUserTV && "p-10")}>
        {children}
      </div>
    </section>
  );
}
