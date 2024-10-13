import clsx from "clsx";

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  values: string[];
  title: string;
}

export function Select({ children, values, ...otherProps }: ISelectProps) {
  return (
    <div className="flex flex-col">
      {otherProps.title && (
        <p className="text-gray-400 mb-1">{otherProps.title}</p>
      )}
      <select
        className={clsx(
          "border rounded-md outline-none h-10 pl-4",
          "disabled:text-gray-600",
          "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500",
          "bg-gray-800 border-gray-600 text-gray-300"
        )}
        {...otherProps}
      >
        {values.map((value) => {
          return <option key={value}>{value}</option>;
        })}
      </select>
    </div>
  );
}
