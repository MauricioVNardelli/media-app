import clsx from "clsx";
import { Button } from "./button";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isSubmitting?: boolean;
  gridCols?: number;
}

export function Form({
  children,
  gridCols,
  isSubmitting,
  className: classNameProps,
  ...otherProps
}: IFormProps) {
  return (
    <form
      {...otherProps}
      className={clsx(classNameProps, isSubmitting && "opacity-50")}
    >
      {children}

      <div
        id="line"
        className={clsx(
          "flex border-t mt-4 pt-4 justify-end border-t-gray-600",
          gridCols != undefined && `col-span-${gridCols}`
        )}
      >
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-32 bg-green-800 hover:bg-green-900"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
