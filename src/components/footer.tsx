import Link from "next/link";
import {FaGithub, FaLinkedin} from "react-icons/fa6";

export default function Footer(): React.ReactNode {
    return (
        <div className={"w-dvw sticky bottom-0 left-0 flex flex-row items-center justify-between px-8 py-4 bg-black"}>
            <div>
                <span>&copy; mkko120</span>
                <span> | </span>
                <span>designed by <Link href={"https://melyrepules.hotglue.me"} target={"_blank"} className={"font-bold hover:underline"}>
                   Tóth Gréta
                </Link></span>
            </div>
            <div className={"flex flex-row space-x-4"}>
                <Link href={"https://github.com/mkko120"}>
                    <FaGithub size={"2rem"} />
                </Link>
                <Link href={"https://www.linkedin.com/in/mkko120/"}>
                    <FaLinkedin size={"2rem"} />
                </Link>
            </div>
        </div>
    )
}