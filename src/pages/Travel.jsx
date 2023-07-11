import { useParams } from "react-router-dom"

export default function Travel(){

    const {id} = useParams()
    const currentTravel = JSON.parse(localStorage.getItem('user')).destinations[id - 1]
    console.log(currentTravel)

    return(
        <div className="h-screen w-screen bg-no-repeat bg-cover bg-bottom relative flex overflow-hidden" style={{backgroundImage: `url(https://i.pinimg.com/originals/fc/fa/d1/fcfad17eed2e76351bf3ba565104b422.jpg)`}}>
            <div className="absolute bg-zinc-700/10 h-full w-full backdrop-blur-3xl z-0"></div>
            <div className="z-10 h-screen w-screen flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-3xl font-semibold text-zinc-100">{currentTravel.destination}</h1>
                    <span className="flex gap-5">
                        {
                            currentTravel.hotspots.map((hotspot) => {
                                return <h1 className="text-xl font-semibold text-zinc-100">{hotspot}</h1>
                            })
                        }
                    </span>
                </div>

                <h1>inicio: </h1>
                <h1>fim: </h1>
            </div>
        </div>
    )
}