import React from "react";
import { EmptyStateProps } from "@/types";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const EmptyState = ({ title, search, buttonLink, buttonText }: EmptyStateProps) => {
  return (
      <section className={'flex-center size-full flex-col gap-3'}>
          <Image src={'/icons/emptyState.svg'} alt={'empty state'} height={250} width={250}/>
          <div className={'flex-center w-full max-w-[254px] flex-col gap-3'}>
              <h1 className={'text-white-1 text-16 text-center font-medium'}>
                  {title}
              </h1>
              {search && (
                  <p className={'text-16 text-center font-medium text-white-2'}>
                      Try adjusting your search to find what you are looking for
                  </p>
              )}
              {buttonLink && (
                  <Button className={'bg-orange-1 mb-5'}>
                      <Link href={buttonLink} className={'gap-1 flex'}>
                          <Image src={'/icons/discover.svg'} alt={'discover'} height={20} width={20}/>
                          <h1 className={'text-16 font-extrabold text-white-1'}>
                              {buttonText}
                          </h1>
                      </Link>
                  </Button>
              )}
          </div>
      </section>
  );
};

export default EmptyState;
