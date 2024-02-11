import Image from "next/image";
import me from "@/../public/me.png";
import {Krona_One} from "next/font/google";
import {cn} from "@/lib/utils";

const font = Krona_One({
    subsets: ["latin"],
    weight: ["400"]
})

export const metadata = {
    title: "about"
}


export default function Page() {
    return (
        <div className={"p-8 text-2xl flex flex-col-reverse md:flex-row justify-between"}>
            <div className={"md:w-1/2 flex flex-col justify-start"}>
                <div>
                    <h1 className={cn(font.className, "font-bold text-4xl")}>hello!</h1>
                    <p>i&apos;m mikołaj, also known as mkko120.</p>
                    <p>computer science student at day, developer at night</p>
                    <p>my passion is to create software for people with ideas in mind, that could revolutionize the world</p>
                </div>
                <div className={"mt-8"}>
                    <h1 className={cn(font.className, "font-bold text-3xl")}>skills:</h1>
                    <p>Next.JS, Prisma, shadcn/ui, mantine ui;</p>
                    <p>Ubuntu, Debian, AlmaLinux, Arch, Windows Server 2016;</p>
                    <p>Java, Spigot and Paper, Kotlin, Spring Boot Web;</p>
                </div>
                <div className={"mt-8"}>
                    <h1 className={cn(font.className, "font-bold text-3xl")}>certificates:</h1>
                    <p>AI4Youth, PCSS;</p>
                    <p>INF.02;</p>
                    <p>more to go...</p>
                </div>
                <div className={"flex-grow"}/>
            </div>
            <div>
                <Image src={me} alt={"me"}/>
            </div>
        </div>
    )
}