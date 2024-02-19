import {getPostByName, getPostsMeta} from "@/lib/posts";
import {notFound} from "next/navigation";
import "highlight.js/styles/an-old-hope.min.css"
import Link from "next/link";
import {Metadata} from "next";

// export const revalidate = 1

interface PostProps {
    params: {postid: string }
}

export async function generateStaticParams(): Promise<any[]> {
    const posts = await getPostsMeta()

    if (!posts) return [];

    return posts.map(post => ({
        postid: post.id
    }))
}

export async function generateMetadata(
    {params: {postid}}: PostProps,
): Promise<Metadata> {
    const fileName = `${postid}.mdx`
    const post = await getPostByName(fileName)
    if (!post) return {
        title: "Not found",
        openGraph: {
            images: ["/me.png"]
        }
    }
    return {
        title: post.meta.title,
        description: post.content.toString().substring(0, 100) + "...",
        keywords: post.meta.tags,
        creator: "mkko120",
        openGraph: {
            images: "/me.png",
        },
    }
}

export default async function Post({ params: { postid } }: PostProps) {
    
    const fileName = `${postid}.mdx`
    
    const post = await getPostByName(fileName)
    
    if (!post) notFound()
    
    return (
        <div className={"pb-4 mb-8"}>
            <header className={"py-8"}>
                <h1 className={"text-5xl mt-4 font-bold"}>{post.meta.title}</h1>
                <h4 className={"text-lg text-neutral-300"}>{post.meta.date.toLocaleDateString("en-GB")}</h4>
            </header>
            <article className={"prose prose-invert"}>
                {post.content}
            </article>
            <footer className={"mt-4 py-4"}>
                <div className={"mb-4"}>
                    <h6 className={"text-md font-bold"}>Tags: </h6>
                    [
                    {post.meta.tags.map(tag => (
                        <span key={tag}>
                            <Link href={`/blog/tag/${tag}`}
                                  className={"transition-all hover:font-semibold underline underline-offset-4"}>
                                {tag}
                            </Link>
                            {post.meta.tags.indexOf(tag) === post.meta.tags.length - 1 ? "" : ", "}
                        </span>
                    ))}
                    ]
                </div>
                
                <Link href={"/blog"} className={"transition-all hover:font-semibold text-lg"}>
                    &lt;- Back to post list
                </Link>
            </footer>
        </div>
    )
    
}