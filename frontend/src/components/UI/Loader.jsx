import { TbTruckLoading } from "react-icons/tb";

export const Loader=()=>{
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-2">
            <TbTruckLoading className="text-7xl"/>
            <h1 className="text-3xl">Loading...</h1>
        </div>
    )
}