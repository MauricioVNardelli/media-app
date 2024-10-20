import clsx from "clsx";
import { Airplay, Upload } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { Controller } from "react-hook-form";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hidden?: boolean;
  onValueChange?: (value: any) => void;
  onFileChange?: (value: File) => void;
}

function InputFileComponent({
  className: classNameProps,
  hidden,
  title,
  type,
  onValueChange,
  onFileChange,
  ...otherProps
}: IInputProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  function handleOnClick() {
    if (inputFileRef.current) inputFileRef.current.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];

      if (file && onValueChange) onValueChange(file.name);
      if (file && onFileChange) onFileChange(file);
    }
  }

  function handlePreviewOnClick() {
    alert("Pré-visualizacao em desenvolvimento");
  }

  return (
    <div
      id="input-file"
      className={clsx("flex flex-col ", hidden && "hidden", classNameProps)}
    >
      {title && <p className="text-gray-400 mb-1">{title}</p>}

      <div
        className={clsx(
          "flex rounded-md border",
          //colors
          "bg-gray-800 text-gray-300 border-gray-600 disabled:text-gray-600",
          //focus
          "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
        )}
      >
        <input
          placeholder="Selecione um arquivo..."
          readOnly={true}
          className={clsx(
            "px-4 outline-none h-10 w-full rounded-s-md",
            "bg-gray-800"
          )}
          {...otherProps}
        />
        <button
          type="button"
          onClick={handleOnClick}
          className="flex items-center justify-center h-full w-10 hover:text-gray-400"
        >
          <Upload />
        </button>
        <button
          type="button"
          onClick={handlePreviewOnClick}
          className="flex items-center justify-center h-full w-14 hover:text-gray-400"
        >
          <Airplay />
        </button>
      </div>

      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export interface IInputFileProps extends IInputProps {
  control: any;
  fieldname: string;
}

export function InputFile({
  value,
  control,
  fieldname,
  ...otherProps
}: IInputFileProps) {
  if (!control) return <InputFileComponent value={value} {...otherProps} />;

  return (
    <Controller
      control={control}
      name={fieldname}
      render={({ field }) => {
        return (
          <InputFileComponent
            value={field.value}
            onValueChange={field.onChange}
            {...otherProps}
          />
        );
      }}
    />
  );
}
