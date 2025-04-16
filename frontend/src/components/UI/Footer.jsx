export const Footer=()=>{
    return (
        <footer className="bg-[#010409] text-white px-4 py-2 flex flex-col items-center gap-1">
            <h1 className="text-zinc-500 text-sm">@ copyright | All rights included</h1>
            <div>
                <ul className="flex text-xs max-[475px]:text-[11px]">
                    <li className="border-r-1 border-zinc-800 px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        About
                    </li>
                    <li className="border-r-1 border-zinc-800 px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        Terms
                    </li>
                    <li className="border-r-1 border-zinc-800 px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        Privacy
                    </li>
                    <li className="border-r-1 border-zinc-800 px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        GitHub
                    </li>
                    <li className="border-r-1 border-zinc-800 px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        LinkedIn
                    </li>
                    <li className="px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        Contact Email
                    </li>
                </ul>
            </div>
        </footer>
    )
}