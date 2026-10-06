import PostsList from "@/components/PostsList";
import {Metadata} from "next";
import {Krona_One} from "next/font/google";
import {cn} from "@/lib/utils";

export const revalidate = 3600;

const font = Krona_One({
    subsets: ["latin"],
    weight: ["400"]
})

export const metadata: Metadata = {
    title: "blog"
}

export default function Page() {
    
    return (
        <div className="w-full pb-20 pt-4 px-4 md:px-8">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h1 className={cn(font.className, "font-bold text-4xl md:text-5xl lowercase tracking-tight text-white mb-3")}>
                    blog
                </h1>
                <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
                    stuff i write about, mostly tech related.
                </p>
            </div>
            
            <PostsList />
        </div>
    )
}