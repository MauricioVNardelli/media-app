import { Loader } from "lucide-react";

export function Loading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center h-full w-full opacity-90 text-white">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin" />
        {text && <p className="mt-5 text-white">{text}</p>}
      </div>
    </div>
  );
}
