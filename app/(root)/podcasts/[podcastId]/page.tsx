"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PodcastDetailsPlayer from "@/components/PodcastDetailsPlayer";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCards from "@/components/PodcastCards";
import EmptyState from "@/components/EmptyState";
import { useUser } from "@clerk/nextjs";

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {
  const { user } = useUser();
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
  const similarPodcast = useQuery(api.podcasts.getSimilarPodcast, {
    podcastId,
  });

  if (!similarPodcast || !podcast) {
    return <LoaderSpinner  classname={'flex'}/>;
  }

  const isOwner = user?.id == podcast?.authorId;

    return (
    <section className={"mt-5 flex flex-col w-full"}>
      <header className={"flex items-center justify-between"}>
        <h1 className={"text-white-1 text-20 font-bold"}>
          Currently Playing Podcast
        </h1>
        <figure className={"flex gap-3"}>
          <Image
            src={"/icons/headphone.svg"}
            alt={"headphone"}
            height={24}
            width={24}
          />
          <h2 className={"text-16 text-white-1 font-bold"}>{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailsPlayer
        isOwner={isOwner}
        podcastId={podcast._id}
        {...podcast}
      />
      <p
        className={
          "text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center"
        }
      >
        {podcast?.podcastDescription}
      </p>
      <div className={"flex flex-col gap-8"}>
        <div className={"flex flex-col glp-4"}>
          <h1 className={"text-18 font-bold text-white-1"}>Transcript</h1>
          <p className={"text-white-2 font-medium text-16 mt-3"}>
            {podcast?.voicePrompt}
          </p>
        </div>
        <div className={"flex flex-col glp-3"}>
          <h1 className={"text-18 font-bold text-white-1"}>Thumbnail Prompt</h1>
          <p className={"text-white-2 font-medium text-16 mt-3"}>
            {podcast?.imagePrompt}
          </p>
        </div>
      </div>
      <section className={"flex flex-col mt-5"}>
        <h1 className={"text-20 font-bold text-white-1"}>Similar Podcast</h1>
        {similarPodcast && similarPodcast.length > 0 ? (
          <div className={"podcast_grid"}>
            {similarPodcast?.map(
              ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCards
                  key={_id}
                  imageUrl={imageUrl}
                  description={podcastDescription}
                  title={podcastTitle}
                  podcastID={_id}
                />
              ),
            )}
          </div>
        ) : (
          <>
            <EmptyState
              title={"No similar podcast found"}
              buttonLink={"/discover"}
              buttonText={"Discover more podcast"}
            />
          </>
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
