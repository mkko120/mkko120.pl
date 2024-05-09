import {Octokit} from "octokit";
import {OctokitResponse} from "@octokit/types";
import {compileMDX} from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";


const oc = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    user_agent: "mkko120.pl/0.0.1",
})

export async function getPostByName(name: string): Promise<BlogPost | undefined> {
    const res: OctokitResponse<any> = await oc.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "mkko120",
        repo: "mkko120.pl-posts",
        path: name,
        headers: {
            accept: "application/vnd.github+json",
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    
    if (res.status !== 200) {
        return undefined
    }
    
    const rawBase64 = res.data.content
    
    if (rawBase64 === "404: Not Found") return undefined
    
    const rawMdx = Buffer.from(rawBase64, "base64").toString("utf-8")
    
    const {frontmatter, content} = await compileMDX<{title: string, date: string, tags: string[]}>({
        source: rawMdx,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [
                    remarkGfm
                ],
                rehypePlugins: [
                    //@ts-ignore
                    rehypeHighlight,
                    [rehypeAutolinkHeadings, {
                        behavior: "wrap"
                    }],
                    rehypeSlug
                ]
            }
        }
    })
    
    const id = name.replace(".mdx", "")

    return {
        meta: {
            id,
            title: frontmatter.title,
            description: rawMdx
                // remove frontmatter
                .replace(/---\n([\s\S]*?)\n---/g, "")
                // remove code blocks
                .replace(/```.*?\n(.+)```/gs, "[...]")
                // remove multiple newlines
                .replace(/\n+/g, '\n')
                .trim()
                .replace(/[\n\t]/g, ". ")
                // remove special markdown characters
                .replace(/[^a-zA-Z0-9!?"_ ().\n\t]/g, "")
                .substring(0, 100)
                .trim()
                + "...",
            date: new Date(frontmatter.date),
            tags: frontmatter.tags
        },
        content
    }

}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res: OctokitResponse<any> = await oc.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1", {
        owner: "mkko120",
        repo: "mkko120.pl-posts",
        tree_sha: "main"
    })
    
    if (res.status !== 200) {
        return undefined
    }
    
    const repoFileTree: Filetree = res.data
    
    const filesArray = repoFileTree.tree.map(file => file.path)
        .filter(file => file.endsWith(".mdx"))
    
    const posts: Meta[] = []
    
    for (const file of filesArray) {
        const post = await getPostByName(file)
        if (post) {
            let {meta} = post
            meta = {
                ...meta,
                date: new Date(meta.date)
            }
            
            posts.push(meta)
        }
    }
    
    return posts.sort((a, b) => a.date.getTime() < b.date.getTime() ? 1 : -1)
}