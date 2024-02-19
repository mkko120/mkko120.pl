import {getPostsMeta} from "@/lib/posts";
import Link from "next/link";
import Post from "@/components/Post";

export const revalidate = 1;

export default async function PostsList() {
    const posts = await getPostsMeta()

    if (!posts) return <div>No posts</div>
    
    return (
        <div className={"py-4"}>
            {posts.map((post, i) => (
                <Post post={post} key={i} />
            ))}
        </div>
    )
}