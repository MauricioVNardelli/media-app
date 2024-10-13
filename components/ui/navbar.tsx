"use client";

import { GlobalContext } from "@/app/contexts/global";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useContext, useState } from "react";

interface INavBarLiProps extends React.LiHTMLAttributes<HTMLLIElement> {
  name: string;
  isActive?: boolean;
  isUserTV?: boolean;
}

export default function NavBar() {
  const { user } = useContext(GlobalContext);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isUserTV = user?.role == "TV";

  function liHandleClick(event: MouseEvent<HTMLLIElement>) {
    const idSelected = event.currentTarget.id;

    if (active !== idSelected) {
      setActive(event.currentTarget.id);

      router.push(idSelected);
    }
  }

  return (
    <div className="flex h-16 items-center shadow-md bg-gray-800">
      <img
        alt="Your Company"
        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg"
        className="h-8 w-auto mx-5"
      />
      <nav className="flex h-full items-center">
        <ul className="flex flex-row space-x-4 h-10">
          <NavBarLi
            id="/system/dashboard"
            name="Início"
            isActive={pathname.startsWith("/system/dashboard")}
            onClick={liHandleClick}
            isUserTV={isUserTV}
          />
          <NavBarLi
            id="/system/user"
            name="Usuário"
            isActive={pathname.startsWith("/system/user")}
            onClick={liHandleClick}
            isUserTV={isUserTV}
          />
          <NavBarLi
            id="/system/panel"
            name="Painel"
            isActive={pathname.startsWith("/system/panel")}
            onClick={liHandleClick}
            isUserTV={isUserTV}
          />
          <NavBarLi
            id="/system/media"
            name="Mídia"
            isActive={pathname.startsWith("/system/media")}
            onClick={liHandleClick}
            isUserTV={isUserTV}
          />
        </ul>
      </nav>
    </div>
  );
}

function NavBarLi({
  className,
  name,
  isActive,
  isUserTV,
  ...otherProps
}: INavBarLiProps) {
  return (
    <li
      className={clsx(
        "flex items-center justify-center rounded-lg p-4 font-semibold shadow-inner",
        "text-gray-300 active:bg-gray-900 hover:cursor-pointer",
        !isActive && "hover:bg-gray-700 hover:text-white",
        isActive && "bg-gray-900 hover:cursor-default",
        isUserTV && "hidden"
      )}
      {...otherProps}
    >
      {name}
    </li>
  );
}
