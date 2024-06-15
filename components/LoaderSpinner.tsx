import React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";


const LoaderSpinner = ({ classname }: { classname: string }) => {
  return (
    <div className={cn("flex-center h-screen", { classname })}>
      <Loader className={"animate-spin text-orange-1"} size={30} />
    </div>
  );
};

export default LoaderSpinner;
