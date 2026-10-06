"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface HomeCardProps {
    title: string;
    children: React.ReactNode;
    index?: number;
    image?: any;
    tags?: string[];
}

// Palette #2: Dark Obsidian with Cyan, Teal, and Emerald Accent Borders
const PALETTE_ACCENTS = [
    "bg-neutral-900 border-l-4 border-l-cyan-400 border-t border-r border-b border-neutral-800",
    "bg-neutral-900 border-l-4 border-l-teal-400 border-t border-r border-b border-neutral-800",
    "bg-neutral-900 border-l-4 border-l-emerald-400 border-t border-r border-b border-neutral-800"
];

export default function HomeCard({ list }: { list: HomeCardProps[] }) {
    const [activeHoverIndex, setActiveHoverIndex] = useState<number>(0);

    return (
        <div className="w-full overflow-hidden">
            {/* Fixed height container on desktop and mobile to prevent ANY layout jumping */}
            <div className="w-full h-130 md:h-115 lg:h-110 flex flex-col lg:flex-row gap-3">
                {list.map((item, idx) => {
                    const isActive = activeHoverIndex === idx;
                    const cardColor = PALETTE_ACCENTS[idx % PALETTE_ACCENTS.length];

                    return (
                        <div
                            key={idx}
                            onMouseEnter={() => setActiveHoverIndex(idx)}
                            onClick={() => setActiveHoverIndex(idx)}
                            className={cn(
                                cardColor,
                                "relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden p-5 md:p-6 flex flex-col justify-between shrink-0",
                                isActive ? "flex-3 lg:flex-3" : "flex-1 lg:flex-1 hover:brightness-110"
                            )}
                        >
                            {/* Header / Index & Tech Tags */}
                            <div className="flex items-start justify-between w-full z-10 shrink-0">
                                <span className="font-mono text-lg md:text-xl lg:text-2xl font-bold opacity-80 shrink-0">
                                    0{idx + 1} /
                                </span>
                                {item.tags && isActive && (
                                    <div className="flex flex-wrap gap-1.5 max-w-[75%] transition-opacity duration-300">
                                        {item.tags.map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="font-mono text-[10px] tracking-wider uppercase bg-black/60 border border-white/20 px-2 py-0.5 text-white shrink-0"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Main Title & Smooth Fade Text */}
                            <div className="z-10 space-y-3 my-auto overflow-hidden">
                                <h3 className={cn(
                                    "font-bold lowercase tracking-tight transition-all duration-300 wrap-break-word",
                                    isActive ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg md:text-xl lg:text-2xl opacity-90"
                                )}>
                                    {item.title}
                                </h3>

                                <div
                                    className={cn(
                                        "transition-all duration-500 ease-out text-sm md:text-base text-justify text-neutral-200 max-w-xl space-y-2 lowercase",
                                        isActive
                                            ? "opacity-100 translate-y-0 pointer-events-auto block"
                                            : "opacity-0 translate-y-3 pointer-events-none hidden lg:block"
                                    )}
                                >
                                    {item.children}
                                </div>
                            </div>

                            {/* Minimalist Bottom Indicator */}
                            <div className="z-20 flex items-center justify-end w-full pt-3 shrink-0 border-t border-white/10 mt-auto">
                                <ArrowRight
                                    className={cn(
                                        "w-5 h-5 transition-all duration-300 shrink-0",
                                        isActive ? "translate-x-1 opacity-100 text-white" : "-rotate-45 opacity-60 text-neutral-300"
                                    )}
                                />
                            </div>

                            {/* Background Image with Gradient Overlay */}
                            {item.image && (
                                <div
                                    className={cn(
                                        "absolute right-0 bottom-0 top-0 w-1/2 hidden lg:block overflow-hidden transition-opacity duration-500 pointer-events-none",
                                        isActive ? "opacity-30 hover:opacity-45" : "opacity-10"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/40 to-black/90 z-10" />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-center"
                                        loading={"eager"}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}