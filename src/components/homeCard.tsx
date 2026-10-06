"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Plus, Minus, ArrowRight } from "lucide-react";

export interface HomeCardProps {
    title: string;
    color: string;
    children: React.ReactNode;
    index?: number;
    image?: any;
    tags?: string[];
}

export default function HomeCard({ list }: { list: HomeCardProps[] }) {
    // Showcase mode: 1 = Horizontal Accordion, 2 = Split Showcase, 3 = Enhanced Stacked Banners
    const [mode, setMode] = useState<1 | 2 | 3>(1);
    const [activeHoverIndex, setActiveHoverIndex] = useState<number>(0);

    return (
        <div className="w-full flex flex-col space-y-6">
            {/* Showcase Control Switcher */}
            <div className="w-full bg-neutral-900 border border-neutral-800 p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 font-mono uppercase text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SHOWCASE STRONY GŁÓWNEJ (WYBIERZ OPCJĘ):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setMode(1)}
                        className={cn(
                            "px-3 py-1.5 font-mono uppercase text-xs transition-all border",
                            mode === 1
                                ? "bg-white text-black border-white font-bold"
                                : "bg-black text-neutral-300 border-neutral-700 hover:border-neutral-500"
                        )}
                    >
                        1. HORYZONTALNE KOLUMNY
                    </button>
                    <button
                        onClick={() => setMode(2)}
                        className={cn(
                            "px-3 py-1.5 font-mono uppercase text-xs transition-all border",
                            mode === 2
                                ? "bg-white text-black border-white font-bold"
                                : "bg-black text-neutral-300 border-neutral-700 hover:border-neutral-500"
                        )}
                    >
                        2. UKŁAD DWUKOLUMNOWY (SPLIT)
                    </button>
                    <button
                        onClick={() => setMode(3)}
                        className={cn(
                            "px-3 py-1.5 font-mono uppercase text-xs transition-all border",
                            mode === 3
                                ? "bg-white text-black border-white font-bold"
                                : "bg-black text-neutral-300 border-neutral-700 hover:border-neutral-500"
                        )}
                    >
                        3. STACKED BANERY
                    </button>
                </div>
            </div>

            {/* OPCJA 1: Horyzontalne Kolumny (Horizontal Accordion 2.0) */}
            {mode === 1 && (
                <div className="w-full min-h-[500px] flex flex-col lg:flex-row gap-3">
                    {list.map((item, idx) => {
                        const isActive = activeHoverIndex === idx;
                        const formattedIndex = (idx + 1).toString().padStart(2, "0");

                        return (
                            <div
                                key={idx}
                                onMouseEnter={() => setActiveHoverIndex(idx)}
                                onClick={() => setActiveHoverIndex(idx)}
                                className={cn(
                                    item.color,
                                    "relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden p-6 md:p-8 flex flex-col justify-between min-h-[160px] lg:min-h-[500px]",
                                    isActive ? "lg:flex-[3]" : "lg:flex-1 hover:brightness-110"
                                )}
                            >
                                {/* Header / Index */}
                                <div className="flex items-start justify-between w-full z-10">
                                    <span className="font-mono text-xl lg:text-2xl font-bold opacity-80">
                                        0{idx + 1} /
                                    </span>
                                    {item.tags && (
                                        <div className={cn("flex flex-wrap gap-1.5 max-w-[70%]", !isActive && "hidden lg:flex")}>
                                            {item.tags.slice(0, isActive ? 5 : 2).map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="font-mono text-[10px] tracking-wider uppercase bg-black/40 border border-white/20 px-2 py-0.5 text-white"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Content Body */}
                                <div className="z-10 mt-6 lg:mt-0 space-y-4">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight">
                                        {item.title}
                                    </h3>

                                    {/* Expanded info on Desktop & Mobile */}
                                    <div
                                        className={cn(
                                            "transition-all duration-300 text-base md:text-lg text-justify text-neutral-100 max-w-xl space-y-3",
                                            isActive ? "block opacity-100" : "hidden lg:hidden"
                                        )}
                                    >
                                        {item.children}
                                    </div>
                                </div>

                                {/* Bottom bar / Indicator */}
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

                                {/* Image with Gradient Overlay */}
                                {item.image && (
                                    <div
                                        className={cn(
                                            "absolute right-0 bottom-0 top-0 w-1/2 hidden lg:block overflow-hidden transition-opacity duration-500 pointer-events-none",
                                            isActive ? "opacity-35 hover:opacity-50" : "opacity-15"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80 z-10" />
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
            )}

            {/* OPCJA 2: Układ Dwukolumnowy Showcase (Split View) */}
            {mode === 2 && (
                <div className="w-full flex flex-col lg:flex-row gap-4">
                    {/* Left Column Tabs */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-3">
                        {list.map((item, idx) => {
                            const isActive = activeHoverIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveHoverIndex(idx)}
                                    className={cn(
                                        item.color,
                                        "p-6 text-left transition-all relative flex flex-col justify-between min-h-[120px] border-2",
                                        isActive
                                            ? "border-white shadow-lg translate-x-1"
                                            : "border-transparent opacity-85 hover:opacity-100"
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full mb-2">
                                        <span className="font-mono text-sm opacity-80">0{idx + 1} /</span>
                                        {isActive && (
                                            <span className="font-mono text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase">
                                                AKTYWNA
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-bold uppercase">{item.title}</h4>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Canvas Stage */}
                    <div
                        className={cn(
                            list[activeHoverIndex].color,
                            "w-full lg:w-2/3 p-8 min-h-[420px] relative flex flex-col justify-between border-2 border-white/20 transition-all duration-300"
                        )}
                    >
                        <div className="z-10 space-y-6 max-w-xl">
                            <div className="flex items-center space-x-3">
                                <span className="font-mono text-2xl font-bold">0{activeHoverIndex + 1} /</span>
                                <h3 className="text-3xl md:text-4xl font-bold uppercase">
                                    {list[activeHoverIndex].title}
                                </h3>
                            </div>

                            {/* Tags list */}
                            {list[activeHoverIndex].tags && (
                                <div className="flex flex-wrap gap-2">
                                    {list[activeHoverIndex].tags.map((tag, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="font-mono text-xs uppercase bg-black/50 border border-white/30 px-3 py-1 text-white font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="text-lg leading-relaxed text-neutral-100 space-y-3">
                                {list[activeHoverIndex].children}
                            </div>
                        </div>

                        {/* Right background image */}
                        {list[activeHoverIndex].image && (
                            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden pointer-events-none opacity-30">
                                <Image
                                    src={list[activeHoverIndex].image}
                                    alt={list[activeHoverIndex].title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* OPCJA 3: Pełnoszerokościowe Ulepszone Banery (Stacked Banners) */}
            {mode === 3 && (
                <Accordion type="single" collapsible defaultValue="0" className="w-full space-y-3">
                    {list.map((props, index) => {
                        const formattedIndex = (index + 1).toString().padStart(2, "0");
                        return (
                            <AccordionItem
                                key={index}
                                value={`${index}`}
                                className={cn(props.color, "relative border-none overflow-hidden transition-all")}
                            >
                                <AccordionTrigger className="px-6 md:px-8 py-6 text-left hover:no-underline flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="font-mono text-xl md:text-2xl font-bold opacity-75">
                                            {formattedIndex} /
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold uppercase">
                                            {props.title}
                                        </h3>
                                    </div>

                                    {/* Header Tech Badges */}
                                    {props.tags && (
                                        <div className="flex flex-wrap gap-1.5 items-center">
                                            {props.tags.slice(0, 4).map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="font-mono text-[10px] uppercase bg-black/40 border border-white/20 px-2 py-0.5 text-neutral-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </AccordionTrigger>

                                <AccordionContent className="px-6 md:px-8 pb-8 pt-2">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                        <div className="text-base md:text-lg text-neutral-100 space-y-4">
                                            {props.children}
                                        </div>
                                        {props.image && (
                                            <div className="relative h-64 w-full overflow-hidden border border-white/20">
                                                <Image
                                                    src={props.image}
                                                    alt={props.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </div>
    );
}