import { NavLink } from "react-router-dom"
import { RxAvatar } from "react-icons/rx";

export const Header=()=>{
    return (
        <header className="bg-[#010409] h-[8.3vh]">
            <div className="p-2 h-full text-white flex justify-between items-center w-[80%] mx-auto">
                <div>
                    <img src="./logo_long.png" alt="" className="invert w-[150px] max-[650px]:w-[100px] max-[430px]:w-[90px]"/>
                </div>
                <div>
                    <ul className="flex gap-20 text-xl items-center max-[650px]:text-base max-[650px]:gap-10 max-[430px]:text-sm max-[430px]:gap-5">
                        <li>
                            <NavLink to="/" className="hover:text-purple-700 ease-in duration-200">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects" className="hover:text-purple-700 ease-in duration-200">Project</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile"><RxAvatar className="text-3xl max-[650px]:text-2xl max-[430px]:text-xl"/></NavLink>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </header>
    )
}