import clsx from "clsx";
import { LoaderCircle, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useState, useTransition } from "react";

type TColumn = {
  fieldName: string;
  title: string;
};

interface ITableProps extends React.TableHTMLAttributes<HTMLElement> {
  header: TColumn[];
  data: any[];
  hasView?: boolean;
  hasDelete?: boolean;
  onRemoveClick?: (prId: string) => Promise<void>;
}

export function Table({
  hasView = true,
  hasDelete = false,
  ...otherProps
}: ITableProps) {
  return (
    <table className="w-full rounded-md">
      <Header columns={otherProps.header} hasDelete={hasDelete} />
      <Body hasDelete={hasDelete} hasView={hasView} {...otherProps} />
    </table>
  );
}

function Header(props: { columns: TColumn[]; hasDelete: boolean }) {
  return (
    <thead>
      <tr className="h-10 drop-shadow-sm bg-gray-800">
        {props.columns.map((column, index) => {
          return (
            <th
              key={column.fieldName}
              className={clsx(
                "text-start pl-4 font-semibold text-gray-300",
                index == 0 && "rounded-tl-lg",
                index == props.columns.length - 1 &&
                  !props.hasDelete &&
                  "rounded-tr-lg"
              )}
            >
              {column.title}
            </th>
          );
        })}
        {props.hasDelete && <th className="w-14 rounded-tr-lg" />}
      </tr>
    </thead>
  );
}

function Body(props: ITableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState("");

  function handleLineClick(event: MouseEvent<HTMLTableRowElement>) {
    event.preventDefault();

    router.push(`${pathname}/view/${event.currentTarget.id}`);
  }

  function handleRemoveClick(prValue: any) {
    setPendingId(prValue["id"]);

    startTransition(async () => {
      if (props.onRemoveClick) {
        await props.onRemoveClick(prValue["id"]);
      }
    });
  }

  return (
    <tbody>
      {props.data &&
        props.data.map((value) => {
          return (
            <tr
              key={value["id"]}
              id={value["id"]}
              onDoubleClick={props.hasView ? handleLineClick : undefined}
              className={clsx(
                "h-8 border-b border-b-gray-600 bg-gray-700",
                "transition-colors hover:bg-gray-800 hover:bg-gray-800/60"
              )}
            >
              {props.header.map((column, index) => {
                return (
                  <td key={index} className="pl-4 text-gray-300">
                    {value[column.fieldName]}
                  </td>
                );
              })}
              {props.hasDelete && (
                <td className="flex justify-center p-2">
                  {isPending && value["id"] == pendingId ? (
                    <LoaderCircle className="animate-spin mr-1 text-gray-400" />
                  ) : (
                    <button onClick={() => handleRemoveClick(value)}>
                      <Trash className="text-end text-gray-400 hover:text-red-700" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          );
        })}
    </tbody>
  );
}
