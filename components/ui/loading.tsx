import { Loader } from "lucide-react";

export function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full opacity-90 text-white">
      <Loader className="animate-spin" />
    </div>
  );
}
