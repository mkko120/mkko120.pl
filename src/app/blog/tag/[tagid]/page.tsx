import {getPostsMeta} from "@/lib/posts";
import Link from "next/link";
import Post from "@/components/Post";
import {Metadata} from "next";

// export const revalidate = 1;

interface TagProps {
    params: {
        tagid: string
    }
}

export async function generateMetadata(
    {params: {tagid}}: TagProps,
): Promise<Metadata> {
    return {
        title: `Posts for tag: #${tagid}`,
        openGraph: {
            images: "/me.png",
        },
    }
}

export default async function Page({params: {tagid}}: TagProps) {

    const posts = await getPostsMeta();
    
    if (!posts) return (
        <div>
            Sorry! No posts available.
        </div>
    )
    
    const tagPosts = posts.filter(post => post.tags.includes(tagid))
    
    if (!tagPosts.length) {
        return (
            <div className={"text-center"}>
                <h2 className={"font-bold text-3xl"}>Sorry! No posts with such tag.</h2>
                <p className={"text-2xl pt-4"}>
                    <Link href={"/blog"} className={"transition-all hover:font-semibold hover:underline underline-offset-4"}>&lt;- Return to posts list</Link>
                </p>
            </div>
        )
    }
    
    return (
        <div>
            <h1 className={"text-3xl"}>Posts for tag: <b>#{tagid}</b></h1>
            <section>
                <ul>
                    {tagPosts.map((post, i) => (
                        <Post post={post} key={i} />
                    ))}
                </ul>
            </section>
        </div>
    )

}