export default function NotFound() {
    return (
        <div className={"w-1/6 h-full m-auto flex flex-col items-center justify-center"}>
            <div className={"m-16 text-center"}>
                <h1 className={"font-bold text-8xl"}>404</h1>
                <p className={"text-xl text-neutral-200"}>not found</p>
            </div>
            <div>
                <a href={"/"} className={"text-lg text-neutral-400 hover:underline"}>go back to home</a>
            </div>
            <div className={"flex-grow"} />
        </div>
    )
}