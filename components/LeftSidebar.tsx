"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sideBarLinks } from "@/constants/sideBarLinks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/providers/AudioProvider";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { audio } = useAudio();
  const { user } = useUser();

  const profileLink = [
    {
      imgURL: "/icons/profile.svg",
      route: `/profile/${user?.id}`,
      label: "Profile",
    },
  ];

  return (
    <div>
      <section
        className={cn("left_sidebar h-[calc(100vh-5px)", {
          "h-[calc(100vh-150px)]": audio?.audioUrl,
        })}
      >
        <nav className={"flex flex-col gap-6"}>
          <Link
            href={"/"}
            className={
              "flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
            }
          >
            <Image
              src={"/icons/logo.svg"}
              alt={"logo"}
              width={"25"}
              height={"29"}
            />
            <h1
              className={
                "text-24 font-extrabold text-white-1 max-lg:hidden pl-3"
              }
            >
              Podcaster
            </h1>
          </Link>
          {sideBarLinks.map((index) => {
            const isActive =
              pathname === index.route ||
              pathname.startsWith(`${index.route}/`);
            return (
              <Link
                href={index.route}
                key={index.label}
                className={cn(
                  "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
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
                <span className={"text-16 font-medium"}>{index.label}</span>
              </Link>
            );
          })}
          {profileLink.map((index) => {
            const isActive =
              pathname === index.route ||
              pathname.startsWith(`${index.route}/`);
            return (
              <Link
                href={index.route}
                key={index.label}
                className={cn(
                  "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
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
                <span className={"text-16 font-medium"}>{index.label}</span>
              </Link>
            );
          })}
        </nav>

        <SignedOut>
          <div className={"flex-center w-full pb-14 max-lg:px-4 lg:pr-8"}>
            <Button
              asChild
              className={"text-16 w-full bg-orange-1 font-extrabold"}
            >
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className={"flex-center w-full pb-12 max-lg:px-4 lg:pr-6"}>
            <Button
              className={"text-16 w-full bg-orange-1 font-extrabold"}
              onClick={() => signOut(() => router.push("/"))}
            >
              <Link href={"/sign-in"}>Log out</Link>
            </Button>
          </div>
        </SignedIn>
      </section>
    </div>
  );
};

export default LeftSidebar;
