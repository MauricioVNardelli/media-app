import clsx from "clsx";
import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { getValueFromUrl } from "@/lib/actions";
import { LoaderCircle, Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { Control, Controller } from "react-hook-form";

interface IComboBoxProps {
  hidden?: boolean;
  colSpan?: number;
  title: string;
  fieldView: string;
  fieldValue: string;
  src: string;
  control?: Control<any, any>;
  className?: string;
  value?: string;
  onValueChange?: (value: any) => void;
}

function ComboBoxComponent(props: IComboBoxProps) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [dataFilter, setDataFilter] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [debouncedSearch] = useDebounceValue(search, 300);

  useEffect(() => {
    async function getData() {
      setIsSearching(true);
      const data = await getValueFromUrl(props.src);

      setData(data);
      setDataFilter(data);
      setIsSearching(false);
    }

    getData();
  }, []);

  useEffect(() => {
    const dataFilter = data.filter((value) =>
      value[props.fieldView]
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );

    setOpenList(dataFilter.length > 0 || debouncedSearch !== "");
    setDataFilter(dataFilter);
  }, [debouncedSearch]);

  function handleChangeValue(itemSelected: any) {
    setOpenList(false);
    if (props.onValueChange) props.onValueChange(itemSelected["id"]);
  }

  return (
    <Popover.Root open={openList}>
      <Popover.Trigger
        asChild
        onClick={() => {
          setOpenList(!openList);
        }}
      >
        <div
          className={clsx(
            "flex flex-col",
            props.hidden && "hidden",
            props.colSpan && `col-span-${props.colSpan}`,
            props.className
          )}
        >
          {props.title && <p className="text-gray-400 mb-1">{props.title}</p>}
          <div
            className={clsx(
              "flex items-center border rounded-md outline-none h-10 cursor-pointer",
              "bg-gray-800 border-gray-600",
              "focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
            )}
          >
            <button
              type="button"
              className={clsx(
                "flex-1 text-start px-4 text-gray-300 disabled:text-gray-600"
              )}
            >
              {data.length > 0 &&
                props.value !== "" &&
                data.filter((value) => {
                  return value["id"] == props.value;
                })[0][props.fieldView]}
            </button>
            {isSearching ? (
              <LoaderCircle className="w-10 h-5 animate-spin text-gray-400" />
            ) : (
              <Search className="w-10 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Content
        onCloseAutoFocus={() => setSearch("")}
        onPointerDownOutside={() => {
          setOpenList(false);
        }}
        sideOffset={6}
        style={{ width: "var(--radix-popover-trigger-width)" }}
        className={clsx(
          "flex flex-col items-center rounded-md p-4 space-y-2",
          "bg-gray-800 text-gray-300"
        )}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className={clsx(
            "w-full h-full outline-none border-b-2 p-2",
            "border-b-indigo-800 bg-gray-800 text-gray-300"
          )}
        />

        <ul className="w-full">
          {dataFilter.length > 0 ? (
            dataFilter.map((value) => {
              return (
                <li
                  key={value.id}
                  onClick={() => handleChangeValue(value)}
                  className=" hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                >
                  {value[props.fieldView]}
                </li>
              );
            })
          ) : (
            <li className="p-2 rounded-sm">Nenhum registro encontrado!</li>
          )}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}

export function ComboBox({ value, control, ...otherProps }: IComboBoxProps) {
  if (!control) return <ComboBoxComponent value={value} {...otherProps} />;

  return (
    <Controller
      control={control}
      name={otherProps.fieldValue}
      render={({ field }) => {
        return (
          <ComboBoxComponent
            value={field.value}
            onValueChange={field.onChange}
            {...otherProps}
          />
        );
      }}
    />
  );
}
