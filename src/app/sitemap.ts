import { MetadataRoute } from 'next'
import {getPostsMeta} from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    
    const posts = await getPostsMeta()
    let lastmod: Meta | undefined;
    let postmap: MetadataRoute.Sitemap | undefined;
    let tags = new Set<string>();
    let tagmap: MetadataRoute.Sitemap | undefined;
    if (posts) {
        lastmod = posts.reduce((acc, post) => {
            return post.date > acc.date ? post : acc;
        })
        postmap = posts?.map((post) => ({
            url: `https://mkko120.pl/blog/post/${post.id}`,
            lastModified: post.date,
            changeFrequency: 'weekly',
            priority: 0.5,
        }))
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
        tagmap = Array.from(tags).map(tag => ({
            url: `https://mkko120.pl/blog/tag/${tag}`,
            lastModified: lastmod?.date || new Date(2024, 2, 20),
            changeFrequency: 'weekly',
            priority: 0.5,
        }))
    }
    
    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: 'https://mkko120.pl',
            lastModified: new Date(2024, 2, 20),
            changeFrequency: 'never',
            priority: 1,
        },
        {
            url: 'https://mkko120.pl/about',
            lastModified: new Date(2024, 2, 20),
            changeFrequency: 'never',
            priority: 0.8,
        },
        {
            url: 'https://mkko120.pl/blog',
            lastModified: lastmod?.date || new Date(2024, 2, 20),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    
    ]
    
    if (postmap) staticUrls.push(...postmap)
    if (tagmap) staticUrls.push(...tagmap)
    
    return staticUrls
}