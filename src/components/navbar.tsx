import {Krona_One} from "next/font/google";
import Link from "next/link";

const font = Krona_One({
    subsets: ["latin"],
    weight: ["400"]
})

export default function Navbar() {
    
    return (
        <div className={"w-full flex flex-col md:flex-row items-center justify-between p-8 space-y-4"}>
            <div className={"flex flex-col items-start justify-start font-bold text-5xl " + font.className}>
                <span>MIKOŁAJ</span>
                <span>RATAJCZAK</span>
            </div>
            <div className={"flex flex-row items-center justify-between space-x-8 text-3xl"}>
                <Link href={"/"} className={"hover:underline underline-offset-8"}>home</Link>
                <Link href={"/blog"} className={"hover:underline underline-offset-8"}>blog</Link>
                <Link href={"/about"} className={"hover:underline underline-offset-8"}>about</Link>
            </div>
        </div>
    )
}