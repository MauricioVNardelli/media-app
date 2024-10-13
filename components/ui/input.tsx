import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hidden?: boolean;
  colSpan?: number;
}

export function Input({
  children,
  className: classNameProps,
  hidden,
  colSpan,
  ...otherProps
}: IInputProps) {
  return (
    <div
      className={clsx(
        "flex flex-col",
        hidden && "hidden",
        colSpan && `col-span-${colSpan}`
      )}
    >
      {otherProps.title && (
        <p className="text-gray-400 mb-1">{otherProps.title}</p>
      )}
      <input
        autoComplete={otherProps.title !== undefined ? "off" : "on"}
        className={clsx(
          "border rounded-md outline-none h-10 px-4",
          "disabled:text-gray-600",
          "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500",
          "bg-gray-800 border-gray-600 text-gray-300",
          classNameProps
        )}
        {...otherProps}
      >
        {children}
      </input>
    </div>
  );
}
