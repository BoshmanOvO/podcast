"use client";
import React from "react";
import PodcastCards from "@/components/PodcastCards";
import { podcastData } from "@/constants/podcastData";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className={"mt-9 flex flex-col gap-9"}>
      <section className={"flex flex-col gap-5"}>
        <h1 className={"text-4xl font-bold text-white-1"}>
          Trending Podcast
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
          </div>
          <div className={"podcast_grid"}>
            {podcastData.map(({ id, title, description, imgURL }) => (
              <PodcastCards
                key={id}
                imageURL={imgURL}
                description={description}
                title={title}
                podcastID={id}
              />
            ))}
          </div>
        </h1>
      </section>
    </div>
  );
};

export default Home;
