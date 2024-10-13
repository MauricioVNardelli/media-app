import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import clsx from "clsx";

interface ButtonPalletProps {
  buttons: [{ name: string; src: string }];
  hiddenBorder?: boolean;
}

export function ButtonPalette(props: ButtonPalletProps) {
  const router = useRouter();

  function HandleClick(prSrc: string) {
    router.push(prSrc);
  }

  return (
    <div
      className={clsx(
        "pb-6",
        !props.hiddenBorder && "border-b border-b-gray-600"
      )}
    >
      {props.buttons.map((button) => {
        return (
          <Button
            key={button.name}
            className="w-24"
            onClick={() => HandleClick(button.src)}
          >
            {button.name}
          </Button>
        );
      })}
    </div>
  );
}
