import clsx from "clsx";
import { Button } from "./button";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isSubmitting?: boolean;
  hasSaveButton?: boolean;
}

export function Form({
  children,
  isSubmitting,
  hasSaveButton = true,
  className: classNameForm,
  ...otherProps
}: IFormProps) {
  return (
    <form {...otherProps} className={clsx(isSubmitting && "opacity-50")}>
      <div className={classNameForm}>{children}</div>

      {hasSaveButton && (
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
      )}
    </form>
  );
}
