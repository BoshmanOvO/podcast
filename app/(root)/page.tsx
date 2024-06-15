"use client";
import React from "react";
import PodcastCards from "@/components/PodcastCards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const podcasts = useQuery(api.podcasts.getTrendingPodcasts);
  return (
    <div className={"mt-9 flex flex-col gap-9"}>
      <section className={"flex flex-col gap-5"}>
        <h1 className={"text-4xl font-bold text-white-1"}>
          Trending Podcasts
          <div className={"podcast_grid"}>
            {podcasts?.map(
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
        </h1>
      </section>
    </div>
  );
};

export default Home;
