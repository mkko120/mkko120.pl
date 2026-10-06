import {getPortfolio} from "@/lib/portfolio";
import PortfolioCardView from "@/components/porfolioCardView";
import ArchivedPortfolioSection from "@/components/archivedPortfolioSection";
import {Metadata} from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "portfolio"
}

export default async function Page() {
    const portfolio = await getPortfolio();
    
    return (
        <div className="w-full pb-20 pt-4 px-4 md:px-8">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h1 className="font-bold text-4xl md:text-5xl lowercase tracking-tight text-white mb-3">
                    Portfolio
                </h1>
                <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
                    Explore my featured projects, open-source repositories, and system engineering work.
                </p>
            </div>

            <PortfolioCardView
                title="Web Development"
                cardData={portfolio.web}
                accentColor="border-l-cyan-400"
            />
            <PortfolioCardView
                title="System Administration & Infrastructure"
                cardData={portfolio.sys}
                accentColor="border-l-teal-400"
            />
            <PortfolioCardView
                title="Minecraft & Backend Systems"
                cardData={portfolio.mc}
                accentColor="border-l-emerald-400"
            />
            <PortfolioCardView
                title="Other Projects"
                cardData={portfolio.other}
                accentColor="border-l-amber-400"
            />

            {/* Default-closed Archived Repositories Section */}
            <ArchivedPortfolioSection cardData={portfolio.archived} />
        </div>
    );
}