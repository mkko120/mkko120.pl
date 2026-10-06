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
            tags: ["NEXT.JS 14", "TYPESCRIPT", "REACT", "TAILWIND CSS", "SEO & PERF"],
            children: (
                <div className="space-y-3">
                    <p>Building high-performance, responsive web applications with <strong className="text-white">Next.js</strong>, <strong className="text-white">React</strong>, and <strong className="text-white">TypeScript</strong>.</p>
                    <p>Focusing on clean component architecture, optimal Core Web Vitals, accessible UI, and modern server-side rendering patterns.</p>
                </div>
            )
        },
        {
            title: "system administration",
            color: "bg-teal-800",
            image: sys,
            tags: ["LINUX (DEBIAN/UBUNTU)", "DOCKER", "NGINX", "WINDOWS SERVER", "SECURITY"],
            children: (
                <div className="space-y-3">
                    <p>Managing system infrastructure, network services, and server security to maintain high uptime and operational stability.</p>
                    <p>Hands-on experience configuring Linux distributions, Windows Server environments, Docker containerization, and reverse proxy routing.</p>
                </div>
            )
        },
        {
            title: "minecraft & backend systems",
            color: "bg-emerald-800",
            image: mcs,
            tags: ["JAVA", "KOTLIN", "SPIGOT/PAPER", "HIGH CONCURRENCY", "MYSQL"],
            children: (
                <div className="space-y-3">
                    <p>Engineering custom backend server plugins, event-driven architectures, and performance-tuned utilities for game environments.</p>
                    <p>Specializing in JVM memory management, low-latency packet processing, and maintaining smooth operations under high concurrent player loads.</p>
                </div>
            )
        }
    ];
    
    return (
        <div className={"flex-1 flex flex-col justify-between w-full h-full py-2 px-8"}>
            <div className={"flex-1 flex flex-col justify-center w-full my-auto"}>
                <HomeCard list={list} />
            </div>
            <div className={"w-full flex flex-col items-center justify-center my-6"}>
                <h2 className={"font-bold text-xl mb-4"}>interested in my services?</h2>
                <Link href={"mailto:contact@mkko120.pl"}>
                    <Button size={"lg"} className={"font-semibold text-lg"}>contact me</Button>
                </Link>
            </div>
        </div>
    );
}
