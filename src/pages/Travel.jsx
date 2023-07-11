import { useParams } from "react-router-dom"
import { ArrowDown } from 'react-feather'
import Barcode from "react-barcode"

export default function Travel(){

    const {id} = useParams()
    const currentTravel = JSON.parse(localStorage.getItem('user')).destinations[id - 1]
    const average = ((currentTravel.outlay * 100 ) / currentTravel.budget).toString()
    console.log(average)

    return(
        <div className="h-screen w-screen bg-no-repeat bg-cover bg-bottom flex relative overflow-hidden" style={{backgroundImage: `url(https://i.pinimg.com/originals/fc/fa/d1/fcfad17eed2e76351bf3ba565104b422.jpg)`}}>
            <div className="absolute h-full w-full bg-cover z-0 opacity-75" style={{backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/000/121/658/original/grunge-paper-texture-vectors.jpg')"}}></div>
            <div className="h-screen w-screen z-10 flex items-center justify-center relative">
                <h1 className="absolute top-5 left-5 text-2xl font-semibold text-zinc-800">{currentTravel.destination}</h1>
                <div className="h-96 w-2/3 grid gap-4 grid-cols-7">
                    <div className="bg-zinc-700 overflow-hidden col-span-2 row-span-2 rounded-md">
                        <div className="w-full h-10 p-3">
                            <h1 className="text-zinc-100 font-semibold text-xl">PACKING LIST</h1>
                        </div>
                        <div className="h-full flex flex-col w-full p-3 py-5 gap-3 overflow-auto">
                            {
                                currentTravel.packing.map((pack) => {
                                    return <h1 className="text-md text-zinc-100"> - {pack}</h1>
                                })
                            }
                        </div>
                    </div>
                    <div className="bg-zinc-700 flex items-center justify-around col-span-5 rounded-md overflow-hidden">
                        <div className="w-1/3 flex flex-col items-start pl-5 justify-center gap-5">
                            <h1 className="text-5xl text-zinc-100">R${currentTravel.budget}</h1>
                            <span className="flex items-center gap-3 text-rose-500">
                                <ArrowDown/>
                                <h1 className="text-2xl">R${currentTravel.outlay}</h1>
                            </span>
                        </div>  

                        <div className="h-[90%] w-1 flex items-end mx-7 overflow-hidden bg-white rounded-full">
                            <div className={`bg-rose-500 rounded-full w-full h-[${average}%]`}></div>
                        </div>

                        <div className="w-2/3 h-full bg-zinc-600 flex items-center justify-center">
                            <div className="w-3/4 h-1 rounded-full bg-zinc-100 flex items-center [&>*:nth-child(even)]:flex-col-reverse [&>*:nth-child(even)]:mt-[5.5rem]">
                                {
                                    currentTravel.hotspots.map((hotspot) => {
                                        return (
                                            <span className="flex flex-col items-center mb-[2.7rem]">
                                                <h1 className="text-sm whitespace-nowrap text-zinc-100 overflow-hidden">{hotspot}</h1>
                                                <div className="h-5 w-1 bg-zinc-800 rounded-t-full"></div>
                                                <div className="rounded-full flex items-center justify-center h-5 aspect-square bg-zinc-800"><div className="h-2 aspect-square rounded-full bg-zinc-100"/></div>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-700 col-span-2 rounded-md overflow-hidden">
                        <div className="w-full h-5 mb-5 p-3 text-zinc-100 font-semibold text-xl">
                            <h1>NOTES OF TRAVEL</h1>
                        </div>
                        <textarea className="text-zinc-100 bg-transparent w-full h-full outline-none p-3 pb-10" disabled value={currentTravel.notes}></textarea>
                    </div>
                    <div className="col-span-3 flex row-span-1 overflow-hidden rounded-md relative">
                        <div className="w-2/3 relative h-full overflow-hidden bg-zinc-700 flex items-end rounded-r-2xl outline outline-zinc-100 outline-1 outline-offset-[-5px]">
                            <span className="absolute top-3 left-3">
                                <h1 className="text-xl font-semibold text-zinc-100"> AIRPLANE TICKET</h1>
                                <h1 className="uppercase text-zinc-100 text-sm">{currentTravel.destination}</h1>
                            </span>
                            <h1 className="absolute bottom-3 left-3 text-5xl text-zinc-100 font-bold">{currentTravel.id}</h1>
                            <span className="absolute flex flex-col items-end bottom-3 right-5">
                                <h1 className="text-xl text-zinc-100 font-bold">20/08/22</h1>
                                <h1 className="text-sm text-zinc-100 font-bold">01/09/22</h1>
                            </span>
                        </div>

                        <div className="w-1/3 h-full bg-zinc-100 flex items-center justify-center rounded-l-2xl outline outline-1 outline-offset-[-5px]">
                            <span className="rotate-90 flex">
                                <Barcode displayValue={false} background="none" width={.65} height={40} value="mytravel"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}