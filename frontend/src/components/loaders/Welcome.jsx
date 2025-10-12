export const Welcome=()=>{
    return (
        <div className="w-full h-screen flex flex-col gap-4 bg-[#0d1117] p-4 gap-4">
            <div className="bg-[#1e232750] rounded-4xl border-1 border-zinc-800 py-4"></div>
            <div className="bg-[#1e232750] rounded-4xl border-1 border-zinc-800 py-4 w-[75%]"></div>
            <div className="grid grid-cols-[1fr_1fr] py-8">
                <div className="h-full grid gap-6 px-5 border-r-1 border-zinc-800">
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                </div>
                <div className="h-full grid gap-6 px-5">
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                    <div className="bg-[#1e232750] border-1 border-zinc-800 rounded-4xl py-3"></div>
                </div>
            </div>
            <div className="bg-[#1e232750] rounded-4xl border-1 border-zinc-800 py-4"></div>
            <div className="bg-[#1e232750] rounded-4xl border-1 border-zinc-800 py-4 w-[75%]"></div>
            
            <div className="bg-zinc-900 rounded-4xl"></div>
        </div>
    )
}