import React from 'react';
import {Button} from "@/components/ui/button";

const Page = () => {
    return (
        <div className={"mt-9 flex flex-col gap-9"}>
            <section className={'flex flex-col gap-5'}>
                <h1 className={'text-4xl font-bold text-white-1'}>
                    Podcast App
                </h1>
                <Button className={'text-white-1 bg-orange-1 flex'}>
                    Click me
                </Button>
            </section>
        </div>
    );
};

export default Page;