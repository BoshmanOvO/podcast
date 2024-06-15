"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {useDebounce} from "@/lib/useDebounce";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const debounce = useDebounce(search, 500);

  useEffect(() => {
    if (debounce) {
      router.push(`/discover?search=${debounce}`);
    } else if (!debounce && pathname == "/discover") {
      router.push("/discover");
    }
  }, [router, debounce, pathname]);

  return (
    <div className={"relative block mt-8"}>
      <Input
        placeholder={"Search for podcasts"}
        className={"input-class py-6 pl-12 focus-visible:ring-offset-orange-1"}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onLoad={() => {
          setSearch("");
        }}
      />
      <Image
        src={"/icons/search.svg"}
        alt={"search"}
        className={"absolute top-3 left-3"}
        height={20}
        width={20}
      />
    </div>
  );
};

export default SearchBar;
