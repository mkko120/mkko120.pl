import HomeCard, {HomeCardProps} from "@/components/homeCard";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import web from "@/../public/web.jpg";
import sys from "@/../public/computer.jpg";
import mcs from "@/../public/minecraft.jpg";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "home | mkko120"
}

export default function Home() {
    
    const list: HomeCardProps[] = [
        {
            title: "web development",
            color: "bg-cyan-800",
            image: web,
            children: (
                <>
                    <p>As a website developer, and I specialize in Next.js, a framework for creating awesome client- and server-side web applications.</p>
                    <p>I enjoy developing sites that not only look great but also achieve high performance and smooth user experience.</p>
                    <p>With Next.js, I can build fast-loading, SEO-friendly websites that are easy to use on any device.</p>
                </>
            )
        },
        {
            title: "system administration",
            color: "bg-teal-800",
            image: sys,
            children: (
                <>
                <p>As a system administrator, I take care of computer systems to keep them running smoothly.</p>
                <p>From setting up networks to fixing problems and making sure everything is safe from outside threats, I handle it all.</p>
                <p>I excel in finding ways to make things run better and faster, so businesses can focus on what they do best.</p>
                <p>My experience ranges from various Linux distributions to Windows Server instances.</p>
                </>
            )
        },
        {
            title: "minecraft servers & plugins",
            color: "bg-emerald-800",
            image: mcs,
            children: (
                <>
                    <p>As a Minecraft developer and server administrator, I&apos;m passionate about enhancing gameplay experiences by creating custom features, mini-games, and utilities within the Minecraft universe.</p>
                    <p>As a server administrator, I ensure optimal server performance, manage player communities, and troubleshoot technical issues to maintain a seamless gaming environment.</p>
                    <p>From crafting unique worlds to fine-tuning server configurations, I&apos;m dedicated to delivering top-notch experiences for Minecraft enthusiasts.</p>
                </>
            )
        }
    ];
    
    return (
        <div className={"flex flex-col w-full"}>
            <HomeCard list={list} />
            <div className={"w-full flex flex-col items-center justify-center mt-32 mb-28"}>
                <h2 className={"font-bold text-xl mb-4"}>interested in my services?</h2>
                <Link href={"mailto:contact@mkko120.pl"}>
                    <Button size={"lg"}>contact me</Button>
                </Link>
            </div>
        </div>
    );
}
