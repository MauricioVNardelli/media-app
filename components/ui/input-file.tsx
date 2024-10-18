import clsx from "clsx";
import { ChangeEvent, useRef, useState } from "react";
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

  return (
    <div
      id="input-file"
      className={clsx("flex flex-col ", hidden && "hidden", classNameProps)}
      onClick={handleOnClick}
    >
      {title && <p className="text-gray-400 mb-1">{title}</p>}

      <input
        placeholder="Selecione um arquivo..."
        readOnly={true}
        className={clsx(
          "px-4 outline-none h-10 w-full rounded-md border cursor-pointer",
          //colors
          "bg-gray-800 text-gray-300 border-gray-600 disabled:text-gray-600",
          //focus
          "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
        )}
        {...otherProps}
      />

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
