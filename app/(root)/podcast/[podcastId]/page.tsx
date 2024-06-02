import React from 'react';

const PodcastDetails = ( {params} : {params :  { podcastId: string } } )  => {
    return (
        <div>
            <h1 className={'text-white-1'}> My podcast having id {params.podcastId}</h1>
        </div>
    );
};

export default PodcastDetails;