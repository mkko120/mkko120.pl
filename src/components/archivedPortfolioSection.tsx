"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import PortfolioCardView from "@/components/porfolioCardView";
import { Archive } from "lucide-react";

interface ArchivedPortfolioSectionProps {
    cardData: PortfolioEntry[];
}

export default function ArchivedPortfolioSection({ cardData }: ArchivedPortfolioSectionProps) {
    if (!cardData || cardData.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-6 mt-12 mb-8">
            <Accordion type="single" collapsible className="w-full border border-neutral-800 bg-neutral-950/80">
                <AccordionItem value="archived-section" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between text-neutral-400 hover:text-white transition-colors">
                        <div className="flex items-center space-x-3">
                            <Archive className="w-5 h-5 text-neutral-500" />
                            <span className="font-mono text-sm lowercase tracking-wider font-bold">
                                ARCHIVED REPOSITORIES ({cardData.length})
                            </span>
                        </div>
                        <span className="font-mono text-xs lowercase text-neutral-500 mr-2">
                            CLICK TO REVEAL
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 pb-6 pt-2 border-t border-neutral-900">
                        <PortfolioCardView
                            title="Archived Projects"
                            cardData={cardData}
                            accentColor="border-l-neutral-600"
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
