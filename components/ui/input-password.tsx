import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hidden?: boolean;
}

export function InputPassword({
  className: classNameProps,
  hidden,
  type,
  autoComplete = "off",
  ...otherProps
}: IInputProps) {
  const [typeInput, setTypeInput] = useState("password");

  return (
    <div
      id="input-password"
      className={clsx("flex flex-col", hidden && "hidden", classNameProps)}
    >
      {otherProps.title && (
        <p className="text-gray-400 mb-1">{otherProps.title}</p>
      )}

      <div
        className={clsx(
          "flex flex-row h-10 rounded-md border",
          "bg-gray-800 border-gray-600",
          "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
        )}
      >
        <input
          autoComplete={autoComplete}
          type={typeInput}
          className={clsx(
            "flex-1 outline-none w-full px-4 rounded-l-md rounded-r-none",
            "disabled:text-gray-600 bg-gray-800 text-gray-300",
            classNameProps
          )}
          {...otherProps}
        />

        <button
          type="button"
          onClick={() => {
            setTypeInput(typeInput == "password" ? "text" : "password");
          }}
          className={clsx(
            "rounded-r-md px-2 border-none",
            "hover:text-gray-300",
            "text-gray-400 bg-gray-800"
          )}
        >
          {typeInput == "password" ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
}
