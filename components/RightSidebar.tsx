"use client";
import React from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/LoaderSpinner";

const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasts = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();
  if (!topPodcasts) {
    return <LoaderSpinner />;
  }
  return (
    <section className={"right_sidebar"}>
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className={"flex gap-3 pb-12"}>
          <UserButton />
          <div className={"flex w-full items-center justify-between"}>
            <h1 className={"text-16 truncate text-white-1 font-semibold"}>
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <Image
            src={"/icons/right-arrow.svg"}
            alt={"right arrow"}
            height={24}
            width={24}
          />
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle={"Fans also like"} />
        <div className={"mt-4"}>
          <Carousel fansLikeDetails={topPodcasts!} />
        </div>
      </section>
      <section className={"flex flex-col gap-8 pt-10"}>
        <Header headerTitle={"Top Podcasters"} />
        <div className={"flex flex-col gap-6"}>
          {topPodcasts?.slice(0, 4).map((podcaster) => (
            <div
              key={podcaster._id}
              className={"flex cursor-pointer justify-between"}
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className={"flex items-center gap-2"}>
                <Image
                  src={podcaster.imageUrl}
                  alt={"podcaster.name"}
                  width={44}
                  height={44}
                  className={"aspect-square rounded-lg"}
                />
                <h2 className={"text-14 font-semibold text-white-1"}>
                  {podcaster.name}
                </h2>
              </figure>
              <div className={'flex items-center'}>
                <p className={'text-12 font-normal text-white-2'}>
                  {podcaster.totalPodcasts} podcasts
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
