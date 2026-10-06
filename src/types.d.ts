type Meta = {
    id: string;
    title: string;
    description: string;
    date: Date;
    tags: string[];
}

type BlogPost = {
    meta: Meta;
    content: any;
}

type Filetree = {
    "tree": [
        {
            "path": string;
            "type": string;
        }
    ]
}

type PortfolioEntry = {
    name: string;
    content: string;
    source: string;
    date: Date;
    url?: string;
    tags?: string[];
    language?: string;
    stars?: number;
}

type Portfolio = {
    web: PortfolioEntry[];
    sys: PortfolioEntry[];
    mc: PortfolioEntry[];
    other: PortfolioEntry[];
}