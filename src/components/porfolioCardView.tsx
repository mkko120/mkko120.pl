import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {Krona_One} from "next/font/google";

const font = Krona_One({
    subsets: ["latin"],
    weight: ["400"]
})

interface PortfolioCardViewProps {
    title: string;
    cardData: PortfolioEntry[];
    accentColor?: string;
}

export default function PortfolioCardView({ title, cardData, accentColor = "border-l-cyan-400" }: PortfolioCardViewProps) {
    if (!cardData || cardData.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col p-6 my-6">
            {/* Category Header */}
            <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-neutral-800">
                <span className="font-mono text-[10px] tracking-widest uppercase bg-white text-black px-2 py-0.5 font-bold">
                    {cardData.length} {cardData.length === 1 ? "PROJECT" : "PROJECTS"}
                </span>
                <h2 className={cn(font.className, "text-2xl md:text-3xl font-bold uppercase tracking-tight text-white")}>
                    {title}
                </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cardData.map((entry) => {
                    const formattedDate = entry.date && !isNaN(entry.date.getTime())
                        ? entry.date.toLocaleDateString("en-US", { year: 'numeric', month: 'short' })
                        : "2024";

                    return (
                        <div
                            key={entry.name}
                            className={cn(
                                "bg-neutral-900 border-t border-r border-b border-neutral-800 border-l-4 p-6 flex flex-col justify-between transition-all hover:brightness-110 group relative",
                                accentColor
                            )}
                        >
                            {/* Card Header */}
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                                        {entry.name}
                                    </h3>
                                    {entry.language && (
                                        <span className="font-mono text-[10px] uppercase bg-black/60 border border-white/20 px-2 py-0.5 text-neutral-300 shrink-0">
                                            {entry.language}
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-neutral-300 leading-relaxed mb-4 text-justify">
                                    {entry.content}
                                </p>
                            </div>

                            {/* Card Tags & Footer */}
                            <div className="space-y-4 pt-4 border-t border-white/10 mt-auto">
                                {entry.tags && entry.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {entry.tags.map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="font-mono text-[9px] uppercase bg-black/40 border border-neutral-700 px-1.5 py-0.5 text-neutral-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                                    <span>{entry.source || "Project"} • {formattedDate}</span>

                                    {entry.url && (
                                        <Link
                                            href={entry.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-1 text-white hover:text-cyan-400 transition-colors font-bold uppercase text-[11px]"
                                        >
                                            <span>REPO</span>
                                            <ExternalLink className="w-3 h-3 ml-0.5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}