import { NavLink } from "react-router-dom"

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
                        <a href="https://github.com/Aaditya-Nigam" target="_blank">GitHub</a>    
                    </li>
                    <li className="border-r-1 border-zinc-800 px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        <a href="https://www.linkedin.com/in/aaditya-nigam-68871a290/" target="_blank">LinkedIn</a>
                    </li>
                    <li className="px-3 my-2 text-zinc-500 cursor-pointer hover:text-zinc-600 max-[475px]:px-1">
                        Contact Email
                    </li>
                </ul>
            </div>
        </footer>
    )
}