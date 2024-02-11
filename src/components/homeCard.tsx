import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useEffect, useRef} from "react";

export interface HomeCardProps {
    title: string;
    color: string;
    children: React.ReactNode;
    index?: number;
    image?: any;
}

export function HomeCardComponent({title, color, children, image, index}: HomeCardProps) {
    return (
        <AccordionItem value={`${index?.toString()}`} className={cn(color, "min-h-40 relative")}>
            <AccordionTrigger className={"text-[32px] min-h-40 text-left"}>
                {title}
            </AccordionTrigger>
            <AccordionContent className={"text-lg text-justify lg:w-1/2"}>
                {children}
            </AccordionContent>
            {image && <div className={`hidden absolute right-0 top-0 lg:flex items-center justify-center h-full overflow-clip max-w-hs`}>
                <Image src={image} alt={""} height={1000} width={1000} />
            </div> }
        </AccordionItem>
    );
}

export default function HomeCard({list}: {list: HomeCardProps[]}) {
    return (
        <Accordion type={"single"} collapsible>
            {list.map((props, index) => (
                <HomeCardComponent key={index} {...props} index={index}>
                    {props.children}
                </HomeCardComponent>
            ))}
        </Accordion>
    );
}