"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCards from "@/components/PodcastCards";
import SearchBar from "@/components/SearchBar";

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || "",
  });

  return (
    <div className={"flex flex-col gap-9"}>
      <SearchBar />
      <div className={"flex flex-col fap-9"}>
        <h1 className={"text-white-1 font-bold text-20"}>
          {!search ? "Discover Trending Podcasts" : "Search result for "}{" "}
          {search && <span className={'text-white-2'}>{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className={"podcast_grid"}>
                {podcastsData?.map(
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
              <EmptyState title={"No podcasts found"} />
            )}
          </>
        ) : (
          <LoaderSpinner classname={""} />
        )}
      </div>
    </div>
  );
};

export default Discover;
