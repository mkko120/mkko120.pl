import PostsList from "@/components/PostsList";
import {Suspense} from "react";

export const revalidate = 1;

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