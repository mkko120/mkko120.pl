import PostsList from "@/components/PostsList";
import {Suspense} from "react";
import {Metadata} from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "blog"
}

export default function Page() {
    
    return (
        <div className={"mb-8"}>
            <h1 className={"pt-8 font-bold text-4xl text-center"}>blog</h1>
            <Suspense fallback={<div className={"text-center p-8 text-xl"}>loading posts...</div>}>
                <PostsList />
            </Suspense>
        </div>
    )
}