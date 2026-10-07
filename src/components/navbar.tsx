import {Krona_One} from "next/font/google";
import Link from "next/link";
import NavDrawer from "@/components/drawer";
import {Button} from "@/components/ui/button";

const font = Krona_One({
    subsets: ["latin"],
    weight: ["400"]
})

export default function Navbar() {
    
    return (
        <div className={"w-full flex flex-row items-center justify-between p-8 space-y-4"}>
            <div className={"flex flex-col items-start justify-start font-bold text-3xl md:text-5xl " + font.className}>
                <span>MIKOŁAJ</span>
                <span>RATAJCZAK</span>
            </div>
            <div className={"hidden lg:flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 space-x-8 text-3xl"}>
                <div className={"w-full flex flex-row items-center space-x-8"}>
                    <Link href={"/"} className={"flex-2 hover:underline underline-offset-8"}>home</Link>
                    <Link href={"/portfolio"} className={"hover:underline underline-offset-8"}>portfolio</Link>
                </div>
                <div className={"w-full flex flex-row items-center space-x-8"}>
                    <Link href={"/blog"} className={"hover:underline underline-offset-8"}>blog</Link>
                    <Link href={"/about"} className={"hover:underline underline-offset-8"}>about</Link>
                </div>
            </div>
            <div className={"lg:hidden"}>
                <NavDrawer />
            </div>
        </div>
    )
}