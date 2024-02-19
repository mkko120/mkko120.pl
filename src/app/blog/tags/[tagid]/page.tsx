import {getPostsMeta} from "@/lib/posts";
import Link from "next/link";
import Post from "@/components/Post";

export const revalidate = 1;

export default async function Page({params: {tagid}}: {params: {tagid: string}}) {

    const posts = await getPostsMeta();
    
    if (!posts) return (
        <div>
            Sorry! No posts available.
        </div>
    )
    
    const tagPosts = posts.filter(post => post.tags.includes(tagid))
    
    if (!tagPosts.length) {
        return (
            <div>
                Sorry! No posts with such tag.
                <Link href={"/blog"}>Return to posts list</Link>
            </div>
        )
    }
    
    return (
        <div>
            <h1>Posts for tag: <b>#{tagid}</b></h1>
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