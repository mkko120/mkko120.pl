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