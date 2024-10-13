import clsx from "clsx";
import { LoaderCircle } from "lucide-react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({
  children,
  className: classNameProps,
  isLoading,
  ...otherProps
}: IButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-md h-10 min-w-20",
        "transition-colors",
        "text-white",
        !classNameProps?.includes("bg-") && "bg-indigo-700",
        "hover:bg-indigo-800 disabled:bg-indigo-800 disabled:text-gray-300",
        classNameProps
      )}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <LoaderCircle className="animate-spin mr-1" /> : children}
    </button>
  );
}
