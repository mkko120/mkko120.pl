import {Octokit} from "octokit";
import {OctokitResponse} from "@octokit/types";

const oc = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    user_agent: "mkko120.pl/0.0.1",
})

export async function getEntryByFilePath(path: string): Promise<PortfolioEntry | undefined> {
    const res: OctokitResponse<any> = await oc.request("GET /repos/{owner}/{repo}/contents/portfolio/{path}", {
        owner: "mkko120",
        repo: "mkko120.pl-posts",
        path: path,
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
    
    const rawEntry = Buffer.from(rawBase64, "base64").toString("utf-8")
    
    try {
        return JSON.parse(rawEntry)
    } catch (_) {
        return undefined
    }
}

export async function getPortfolio(): Promise<Portfolio | undefined> {
    const res: OctokitResponse<any> = await oc.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1", {
        owner: "mkko120",
        repo: "mkko120.pl-posts",
        tree_sha: "main",
    })
    
    if (res.status !== 200) {
        return undefined
    }
    
    const repoFileTree: Filetree = res.data
    
    const filesArray = repoFileTree.tree
        .filter(file => file.type === "blob")
        .map(file => file.path)
        .filter(file => file.startsWith("portfolio/"))
        .map(file => file.replace("portfolio/", ""))
    
    // group files into 4 categories
    // 1. web development
    // 2. systems adminsitraton
    // 3. minecraft
    // 4. other
    
    const web = filesArray.filter(file => file.startsWith("web/"))
    const sys = filesArray.filter(file => file.startsWith("sys/"))
    const mc = filesArray.filter(file => file.startsWith("mc/"))
    const other = filesArray.filter(file => file.startsWith("other/"))
    

    
    
    return {
        web: await getPortfolioDirSorted(web),
        sys: await getPortfolioDirSorted(sys),
        mc: await getPortfolioDirSorted(mc),
        other: await getPortfolioDirSorted(other),
    }
}

async function getPortfolioDirSorted(filesArray: string[]): Promise<PortfolioEntry[]> {
    const files = await Promise.all(
        filesArray.map(async file => await getEntryByFilePath(`${file}`))
    )
    
    const portfolios = files.filter(file => file !== undefined) as PortfolioEntry[]
    return portfolios.map(file => {
        return {
            ...file,
            date: new Date(file.date)
        }
    }).sort((a, b) => b.date.getTime() - a.date.getTime())
}