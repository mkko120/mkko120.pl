import Link from "next/link";

export default function Post({post}: {post: Meta}) {
    return (
        <Link href={`/blog/post/${post.id}`}>
            <div className={"my-2"}>
                <h1 className={"text-lg font-semibold"}>{post.title}</h1>
                <h4 className={"text-sm text-neutral-300"}>{post.date.toLocaleDateString("en-GB")}</h4>
            </div>
        </Link>
    )
}