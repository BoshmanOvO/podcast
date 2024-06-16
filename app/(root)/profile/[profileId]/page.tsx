"use client";
import { useQuery } from "convex/react";
import EmptyState from "@/components/EmptyState";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import ProfileCard from "@/components/ProfileCard";
import PodcastCards from "@/components/PodcastCards";

const ProfilePage = ({
  params: { profileId },
}: {
  params: {
    profileId: string;
  };
}) => {
  console.log(profileId);
  const user = useQuery(api.users.getUserById, {
    clerkId: profileId || '',
  });
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: profileId || '',
  });

  if (!user || !podcastsData) return <LoaderSpinner classname={""} />;

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          podcastData={podcastsData!}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData?.podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCards
                  key={podcast._id}
                  imageUrl={podcast.imageUrl!}
                  title={podcast.podcastTitle!}
                  description={podcast.podcastDescription}
                  podcastID={podcast._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcasts"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
