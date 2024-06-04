import React from "react";
import Image from "next/image";

const PodcastCards = ({
  imageURL,
  description,
  title,
  podcastID,
}: {
  imageURL: string;
  description: string;
  title: string;
  podcastID: number;
}) => {
  return (
    <div className={"cursor-pointer"}>
      <figure className={"flex flex-col gap-3"}>
        <Image
          src={imageURL}
          alt={title}
          width={170}
          height={170}
          className={"aspect-square h-fit w-full rounded-2xl 2xl:size-[200px]"}
        />
        <div>
          <h1 className={"text-16 truncate font-bold text-white-1"}>{title}</h1>
          <h2
            className={"text-12 truncate font-normal capitalize text-white-4"}
          >
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCards;
