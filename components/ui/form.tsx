import clsx from "clsx";
import { Button } from "./button";

interface IFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSubmitting?: boolean;
  gridCols?: number;
}

export function Form({ children, isSubmitting, ...otherProps }: IFormProps) {
  return (
    <form className={clsx(isSubmitting && "opacity-50")}>
      <div {...otherProps}>{children}</div>

      <div
        id="line"
        className={clsx(
          "flex border-t mt-4 pt-4 justify-end border-t-gray-600"
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
