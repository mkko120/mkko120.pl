type Meta = {
    id: string;
    title: string;
    date: Date;
    tags: string[];
}

type BlogPost = {
    meta: Meta;
    content: any;
}