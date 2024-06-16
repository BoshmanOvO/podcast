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
import { useAudio } from "@/providers/AudioProvider";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";

const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasts = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();
  const { audio } = useAudio();
  // if (!topPodcasts) {
  //   return <LoaderSpinner classname={""} />;
  // }

  const getPodcastText = (numPodcasts: number) =>
    numPodcasts <= 1  ? "podcast" : "podcasts";

  return (
    <section
      className={cn("right_sidebar h-[calc(100vh-5px)", {
        "h-[calc(100vh-150px)]": audio?.audioUrl,
      })}
    >
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className={"flex gap-2 pb-12"}>
          <UserButton />
          <div className={"flex w-full items-center justify-between"}>
            <h1
              className={"text-13 truncate text-white-1 font-semibold whitespace-nowrap"}
            >
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <Image
            src={"/icons/right-arrow.svg"}
            alt={"right arrow"}
            height={24}
            width={24}
            className={"cursor-pointer"}
          />
        </Link>
      </SignedIn>
      <section className={"flex-col"}>
        <Header headerTitle={"Fans also like"} />
        <div className={"mt-4"}>
          <Carousel fansLikeDetails={topPodcasts!} />
        </div>
      </section>
      <section className={"flex flex-col gap-8 pt-10"}>
        <Header headerTitle={"Top Podcasters"} />
        <div className={"flex flex-col gap-6"}>
          {topPodcasts?.slice(0, 5).map((podcaster) => (
            <div
              key={podcaster._id}
              className={"flex cursor-pointer justify-between"}
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className={"flex items-center gap-2 mr-3"}>
                <Image
                  src={podcaster.imageUrl}
                  alt={"podcaster.name"}
                  width={44}
                  height={44}
                  className={"aspect-square rounded-lg"}
                />
                <h2
                  className={
                    "text-13 font-semibold text-white-1 overflow-y-hidden"
                  }
                >
                  {podcaster.name}
                </h2>
              </figure>
              <div className={"flex items-center"}>
                <p className={"text-12 font-normal text-white-2 whitespace-nowrap"}>
                  {podcaster.totalPodcasts}{' '}{getPodcastText(podcaster.totalPodcasts)}
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
