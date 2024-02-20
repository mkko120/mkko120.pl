export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className={"max-w-[1200px] w-full h-full px-8 m-auto"}>
            {children}
        </div>
    )
}