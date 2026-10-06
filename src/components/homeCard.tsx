"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface HomeCardProps {
    title: string;
    color: string;
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
        <div className="w-full flex flex-col space-y-6">
            {/* Horizontal Accordion Layout */}
            <div className="w-full min-h-[520px] flex flex-col lg:flex-row gap-3">
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
                                "relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden p-6 md:p-8 flex flex-col justify-between min-h-[160px] lg:min-h-[520px]",
                                isActive ? "lg:flex-[3]" : "lg:flex-1 hover:brightness-110"
                            )}
                        >
                            {/* Header / Index & Tech Tags */}
                            <div className="flex items-start justify-between w-full z-10">
                                <span className="font-mono text-xl lg:text-2xl font-bold opacity-80">
                                    0{idx + 1} /
                                </span>
                                {item.tags && (
                                    <div className={cn("flex flex-wrap gap-1.5 max-w-[70%]", !isActive && "hidden lg:flex")}>
                                        {item.tags.slice(0, isActive ? 5 : 2).map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="font-mono text-[10px] tracking-wider uppercase bg-black/50 border border-white/20 px-2 py-0.5 text-white"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Main Title & Description */}
                            <div className="z-10 mt-6 lg:mt-0 space-y-4">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight">
                                    {item.title}
                                </h3>

                                <div
                                    className={cn(
                                        "transition-all duration-300 text-base md:text-lg text-justify text-neutral-100 max-w-xl space-y-3",
                                        isActive ? "block opacity-100" : "hidden lg:hidden"
                                    )}
                                >
                                    {item.children}
                                </div>
                            </div>

                            {/* Footer / Click State Indicator */}
                            <div className="z-10 flex items-center justify-between w-full pt-4 border-t border-white/10">
                                <span className="text-xs uppercase font-mono tracking-widest text-neutral-300">
                                    {isActive ? "SEKCJA AKTYWNA" : "KLIKNIJ ABY ROZWINĄĆ"}
                                </span>
                                <ArrowRight
                                    className={cn(
                                        "w-5 h-5 transition-transform duration-300",
                                        isActive ? "translate-x-1" : "-rotate-45 opacity-60"
                                    )}
                                />
                            </div>

                            {/* Background Image with Gradient Overlay */}
                            {item.image && (
                                <div
                                    className={cn(
                                        "absolute right-0 bottom-0 top-0 w-1/2 hidden lg:block overflow-hidden transition-opacity duration-500 pointer-events-none",
                                        isActive ? "opacity-35 hover:opacity-50" : "opacity-15"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black/90 z-10" />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-center"
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