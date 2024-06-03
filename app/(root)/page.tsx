import React from 'react';
import PodcastCards from "@/components/PodcastCards";
import {podcastData} from "@/constants/podcastData";

const Home = () => {
    return (
        <div className={"mt-9 flex flex-col gap-9"}>
            <section className={'flex flex-col gap-5'}>
                <h1 className={'text-4xl font-bold text-white-1'}>
                    Trending Podcast
                    <div className={'podcast_grid'}>
                        {podcastData.map(({id, title, description, imgURL}) => (
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