import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = ({
  headerTitle,
  headerClassName,
}: {
  headerTitle?: string;
  headerClassName?: string;
}) => {
  return (
    <header className={"flex justify-between items-center"}>
      {headerTitle ? (
        <h1 className={cn('text-18 font-bold text-white-1', headerClassName)}>
          {headerTitle}
        </h1>
      ) : (
        <div />
      )}
      <Link href={'/discover'} className={'text-14 font-bold text-orange-1'}>
        See All
      </Link>
    </header>
  );
};

export default Header;
