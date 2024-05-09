import {getPortfolio} from "@/lib/portfolio";
import PortfolioCardView from "@/components/porfolioCardView";

export const revalidate= 3600;


export default async function Page() {
    const portfolio = await getPortfolio()
    if (!portfolio) return <div>error</div>
    
    return (
        <div className={"pb-16"}>
            <h1 className={"w-fit mx-auto font-bold text-4xl mt-8 mb-4"}>portfolio</h1>
            <h2 className={"w-fit mx-auto text-xl mb-8 mt-4 px-8 text-center"}>if you want to check out some of the projects, visit my github page!</h2>
            <PortfolioCardView title={"web development"} cardData={portfolio.web}/>
            <PortfolioCardView title={"system administration"} cardData={portfolio.sys}/>
            <PortfolioCardView title={"minecraft"} cardData={portfolio.mc}/>
            <PortfolioCardView title={"other"} cardData={portfolio.other}/>
        </div>
    )
}