export default function TravelCard({image, title}){
    return(
        <main className="h-96 w-[17rem] flex items-end flex-shrink-0 rounded-xl bg-cover overflow-hidden relative" style={{backgroundImage: `url('${image}')`}}>
            <div className="absolute bg-gradient-to-t from-black/70 to-black/10 h-full w-full z-0 rounded-xl"></div>
            <h1 className="text-zinc-100 font-bold text-5xl z-10 my-5 mx-3">{title}</h1>
        </main>
    )
}