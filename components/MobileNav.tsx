"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants/sideBarLinks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();
  const profileLink = [
    {
      imgURL: "/icons/profile.svg",
      route: `/profile/${user?.id}`,
      label: "Profile",
    },
  ];

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            alt={"mobile nav"}
            width={30}
            height={30}
            className={"cursor-pointer"}
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className={"border-none bg-black-1 flex-col"}
        >
          <Link
            href={"/"}
            className={"flex cursor-pointer items-center gap-1 pb-10 pl-4"}
          >
            <Image
              src={"/icons/logo.svg"}
              alt={"logo"}
              width={"25"}
              height={"29"}
            />
            <h1 className={"text-24 font-extrabold text-white-1 pl-3"}>
              Podcastr
            </h1>
          </Link>
          <div className={"flex flex-col justify-between gap-6 h-full"}>
            <SheetClose>
              <nav className={"flex flex-col h-full gap-6 text-white-1"}>
                {sideBarLinks.map((index) => {
                  const isActive =
                    pathname === index.route ||
                    pathname.startsWith(`${index.route}/`);
                  return (
                    <SheetClose asChild key={index.label}>
                      <Link
                        href={index.route}
                        key={index.label}
                        className={cn(
                          "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                          {
                            "bg-nav-focus border-r-4 border-orange-1 text-orange-1 transition-transform":
                              isActive,
                          },
                        )}
                      >
                        <Image
                          src={index.imgURL}
                          alt={"image"}
                          width={"24"}
                          height={"24"}
                        />
                        <span className={"text-16 font-medium"}>
                          {index.label}
                        </span>
                      </Link>
                    </SheetClose>
                  );
                })}
                {profileLink.map((index) => {
                  const isActive =
                    pathname === index.route ||
                    pathname.startsWith(`${index.route}/`);
                  return (
                    <SheetClose asChild key={index.label}>
                      <Link
                        href={index.route}
                        key={index.label}
                        className={cn(
                          "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                          {
                            "bg-nav-focus border-r-4 border-orange-1 text-orange-1 transition-transform":
                              isActive,
                          },
                        )}
                      >
                        <Image
                          src={index.imgURL}
                          alt={"image"}
                          width={"24"}
                          height={"24"}
                        />
                        <span className={"text-16 font-medium"}>
                          {index.label}
                        </span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <SheetClose>
              <SignedOut>
                <div className={"flex-center w-full pb-14 max-lg:px-4 lg:pr-8"}>
                  <Button
                    asChild
                    className={"text-16 w-full bg-orange-1 font-extrabold mb-6"}
                  >
                    <Link href={"/sign-in"}>Sign In</Link>
                  </Button>
                </div>
              </SignedOut>
              <SignedIn>
                <div
                  className={
                    "flex-center w-full pb-12 max-lg:px-4 lg:pr-6 mb-2"
                  }
                >
                  <Button
                    className={"text-16 w-full bg-orange-1 font-extrabold mb-6"}
                    onClick={() => signOut(() => router.push("/"))}
                  >
                    <Link href={"/sign-in"}>Log out</Link>
                  </Button>
                </div>
              </SignedIn>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
