export const Welcome=()=>{
    return (
        <div className="w-full h-screen bg-gradient-to-br from-black via-[#210537] to-[#490b76] grid grid-rows-[1fr_15fr_1fr] p-4 gap-4">
            <div className="bg-zinc-900 rounded-4xl"></div>
            <div className="grid grid-cols-[1fr_1fr] gap-4">
                <div className="h-full grid gap-4">
                    <div className="bg-gradient-to-br from-black  to-[#413f3f] rounded-4xl">
                    </div>
                    <div className="bg-gradient-to-br from-black  to-[#413f3f] rounded-4xl">
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-zinc-900 rounded-4xl h-[40px]">
                    </div>
                    <div className="bg-zinc-900 rounded-4xl h-[40px]">
                    </div>
                </div>
            </div>
            <div className="bg-zinc-900 rounded-4xl"></div>
        </div>
    )
}