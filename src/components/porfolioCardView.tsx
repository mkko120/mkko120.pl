import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

interface PortfolioCardViewProps {
    title: string;
    cardData: PortfolioEntry[];
}

export default function PortfolioCardView({title, cardData}: PortfolioCardViewProps) {
    return (
        <div className={"flex flex-col justify-center items-center p-8"}>
            <h2 className={"text-2xl mb-8"}>{title}</h2>
            <div className={"max-w-[80%] flex flex-row flex-wrap items-center justify-center"}>
                {cardData.length === 0 && <div>no entries</div>}
                {cardData.map(entry => (
                    <div className={"p-2"} key={entry.name}>
                        <Card>
                            <CardHeader>
                                <h3 className={"text-2xl text-center"}>{entry.name}</h3>
                            </CardHeader>
                            <CardContent>
                                <p>{entry.content}</p>
                            </CardContent>
                            <CardFooter className={"flex-col"}>
                                <p>Commissioner:{" "}{entry.source}</p>
                                <p>Date of commission:{" "}{entry.date.toLocaleDateString("pl-PL")}</p>
                            </CardFooter>
                        </Card>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}