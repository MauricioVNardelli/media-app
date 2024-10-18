import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hidden?: boolean;
}

export function Input({
  className: classNameProps,
  hidden,
  autoComplete = "off",
  title,
  ...otherProps
}: IInputProps) {
  return (
    <div
      id="input"
      className={clsx("flex flex-col ", hidden && "hidden", classNameProps)}
    >
      {title && <p className="text-gray-400 mb-1">{title}</p>}

      <input
        autoComplete={autoComplete}
        className={clsx(
          "px-4 outline-none h-10 w-full rounded-md border",
          //colors
          "bg-gray-800 text-gray-300 border-gray-600 disabled:text-gray-600",
          //focus
          "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
        )}
        {...otherProps}
      />
    </div>
  );
}
