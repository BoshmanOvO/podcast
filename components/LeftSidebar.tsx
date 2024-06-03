'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {sideBarLinks} from "@/constants/sideBarLinks";
import {cn} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";

const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div>
            <section className={'left_sidebar'}>
                <nav className={'flex flex-col gap-6'}>
                    <Link href={'/'} className={'flex cursor-pointer items-cente gap-1 pb-10 max-lg:justify-center'}>
                        <Image src={"/icons/logo.svg"} alt={'logo'} width={'25'} height={'29'}/>
                        <h1 className={'text-24 font-extrabold text-white-1 max-lg:hidden'}>
                            Podcastr
                        </h1>
                    </Link>

                    {sideBarLinks.map((index) => {
                        const isActive = pathname === index.route || pathname.startsWith(`${index.route}/`)
                        return (
                            <Link
                                href={index.route}
                                key={index.label}
                                className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start', {
                                    'bg-nav-focus border-r-4 border-orange-1 text-orange-1 transition-transform': isActive,
                                })}
                            >
                            <Image src={index.imgURL} alt={'image'} width={'24'} height={'24'}/>
                            <span className={'text-16 font-medium'}>
                                {index.label}
                            </span>
                            </Link>
                        )
                    })}

                </nav>
            </section>
        </div>
    );
};

export default LeftSidebar;