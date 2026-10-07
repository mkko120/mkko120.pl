import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";

const oc = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    user_agent: "mkko120.pl/0.0.1",
});

export async function getEntryByFilePath(path: string): Promise<PortfolioEntry | undefined> {
    try {
        const res: OctokitResponse<any> = await oc.request("GET /repos/{owner}/{repo}/contents/portfolio/{path}", {
            owner: "mkko120",
            repo: "mkko120.pl-posts",
            path: path,
            headers: {
                accept: "application/vnd.github+json",
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (res.status !== 200) return undefined;

        const rawBase64 = res.data.content;
        if (rawBase64 === "404: Not Found") return undefined;

        const rawEntry = Buffer.from(rawBase64, "base64").toString("utf-8");
        const parsed = JSON.parse(rawEntry);

        return {
            name: parsed.name || path.split('/').pop()?.replace('.json', '') || 'Project',
            content: parsed.content || 'No description provided.',
            source: parsed.source || 'Custom Entry',
            date: parsed.date ? new Date(parsed.date) : new Date(),
            url: parsed.url,
            tags: parsed.tags
        };
    } catch (_) {
        return undefined;
    }
}

// Fetch public repositories directly from GitHub user profile
async function getPublicRepos(): Promise<PortfolioEntry[]> {
    try {
        const res = await fetch("https://api.github.com/users/mkko120/repos?per_page=100&sort=updated", {
            headers: {
                Accept: "application/vnd.github.v3+json",
                "User-Agent": "mkko120.pl/0.0.1"
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) return [];
        const repos = await res.json();
        if (!Array.isArray(repos)) return [];

        return repos
            .filter((r: any) => !r.fork && r.name !== "mkko120") // filter out forks
            .map((r: any) => ({
                name: r.name,
                content: r.description || `Public repository: ${r.name}`,
                source: "GitHub Repository",
                date: new Date(r.updated_at || r.created_at),
                url: r.html_url,
                language: r.language || "Code",
                stars: r.stargazers_count || 0,
                isArchived: !!r.archived,
                tags: r.language ? [r.language.toUpperCase()] : ["CODE"]
            }));
    } catch (_) {
        return [];
    }
}

export async function getPortfolio(): Promise<Portfolio> {
    try {
        // Fetch custom entries from repo tree if available
        let customEntries: { web: PortfolioEntry[]; sys: PortfolioEntry[]; mc: PortfolioEntry[]; other: PortfolioEntry[] } = {
            web: [],
            sys: [],
            mc: [],
            other: []
        };

        const res: OctokitResponse<any> = await oc.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1", {
            owner: "mkko120",
            repo: "mkko120.pl-posts",
            tree_sha: "main",
        }).catch(() => null as any);

        if (res && res.status === 200 && res.data?.tree) {
            const filesArray = res.data.tree
                .filter((file: any) => file.type === "blob")
                .map((file: any) => file.path)
                .filter((file: string) => file.startsWith("portfolio/"))
                .map((file: string) => file.replace("portfolio/", ""));

            const webFiles = filesArray.filter((file: string) => file.startsWith("web/"));
            const sysFiles = filesArray.filter((file: string) => file.startsWith("sys/"));
            const mcFiles = filesArray.filter((file: string) => file.startsWith("mc/"));
            const otherFiles = filesArray.filter((file: string) => file.startsWith("other/"));

            customEntries = {
                web: await getPortfolioDirSorted(webFiles),
                sys: await getPortfolioDirSorted(sysFiles),
                mc: await getPortfolioDirSorted(mcFiles),
                other: await getPortfolioDirSorted(otherFiles),
            };
        }

        // Fetch live GitHub user repos
        const githubRepos = await getPublicRepos();

        // Split active repos vs archived repos
        const activeGithubRepos = githubRepos.filter(r => !r.isArchived);
        const archivedRepos = githubRepos.filter(r => r.isArchived);

        // Categorize Active GitHub repos
        const webRepos: PortfolioEntry[] = [];
        const sysRepos: PortfolioEntry[] = [];
        const mcRepos: PortfolioEntry[] = [];
        const otherRepos: PortfolioEntry[] = [];

        activeGithubRepos.forEach(repo => {
            const nameLower = repo.name.toLowerCase();
            const descLower = (repo.content || "").toLowerCase();
            const langLower = (repo.language || "").toLowerCase();

            if (langLower === "java" || langLower === "kotlin" || nameLower.includes("plugin") || nameLower.includes("minecraft") || descLower.includes("paper") || descLower.includes("spigot")) {
                mcRepos.push(repo);
            } else if (langLower === "typescript" || langLower === "javascript" || langLower === "html" || langLower === "css" || langLower === "php" || nameLower.includes(".pl") || nameLower.includes(".studio")) {
                webRepos.push(repo);
            } else if (nameLower.includes("sys") || nameLower.includes("util") || nameLower.includes("docker") || nameLower.includes("zeus")) {
                sysRepos.push(repo);
            } else {
                otherRepos.push(repo);
            }
        });

        // Merge custom entries and GitHub repos (deduplicating by lowercased name)
        const mergeCategory = (custom: PortfolioEntry[], fetched: PortfolioEntry[]): PortfolioEntry[] => {
            const map = new Map<string, PortfolioEntry>();

            // Overwrite with live fetched GitHub repos
            fetched.forEach(item => map.set(item.name.toLowerCase(), item));
            // Overwrite with custom JSON entries
            custom.forEach(item => map.set(item.name.toLowerCase(), item));

            return Array.from(map.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
        };

        return {
            web: mergeCategory(customEntries.web, webRepos),
            sys: mergeCategory(customEntries.sys, sysRepos),
            mc: mergeCategory(customEntries.mc, mcRepos),
            other: mergeCategory(customEntries.other, otherRepos),
            archived: archivedRepos.sort((a, b) => b.date.getTime() - a.date.getTime()),
        };
    } catch (_) {
        return { web: [], sys: [], mc: [], other: [], archived: [] };
    }
}

async function getPortfolioDirSorted(filesArray: string[]): Promise<PortfolioEntry[]> {
    const files = await Promise.all(
        filesArray.map(async file => await getEntryByFilePath(`${file}`))
    );

    const portfolios = files.filter(file => file !== undefined) as PortfolioEntry[];
    return portfolios.map(file => ({
        ...file,
        date: new Date(file.date)
    })).sort((a, b) => b.date.getTime() - a.date.getTime());
}