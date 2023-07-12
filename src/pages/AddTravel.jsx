import { ArrowDown, Plus, X, Save} from 'react-feather'
import Barcode from "react-barcode"
import { useRef, useState } from 'react'
import { AddNewTravel } from '../utils'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddTravel(){
    const [packages, setPackages] = useState([])
    const [places, setPlaces] = useState([])
    const [budget, setBudget] = useState(null)
    const [outlay, setOutlay] = useState(null)
    const destinationRef = useRef('')
    const startRef = useRef('')
    const endRef = useRef('')
    const noteRef = useRef('')
    const navigate = useNavigate()

    function addPackages(e){
        const item = e.target.item.value
        if(item){
            setPackages(packages => ([...packages, item]))
        }

        e.target.item.value = ''
    }

    function removePackages(id){
        setPackages(packages.filter((pack, index) => {
            if(index != id){
                return pack
            }
        }))
    }

    function addPlaces(e){
        const spot = e.target.spot.value
        if(spot){
            setPlaces(places => ([...places, spot]))
        }

        e.target.spot.value = ''
    }

    function removePlaces(id){
        setPlaces(places.filter((pack, index) => {
            if(index != id){
                return pack
            }
        }))
    }


    async function addDestination(){

        const coordinates = await axios.get(`https://nominatim.openstreetmap.org/search?q=${destinationRef.current.value}&format=json`)

        const newDestination = {
            "id": coordinates.data[0].place_id,
            "destination": destinationRef.current.value,
            "coordinates": [coordinates.data[0].lon, coordinates.data[0].lat],
            "start": startRef.current.value,
            "end": endRef.current.value,
            "budget": budget,
            "outlay": outlay,
            "packing": packages,
            "notes": noteRef.current.value,
            "hotspots": places
        }

        console.log(newDestination)

        if(AddNewTravel(newDestination)){
            window.location.href = '/profile'
        }
    }

    return(
        <div className="h-screen w-screen bg-no-repeat bg-cover bg-bottom flex relative overflow-hidden" style={{backgroundImage: `url(https://i.pinimg.com/originals/fc/fa/d1/fcfad17eed2e76351bf3ba565104b422.jpg)`}}>
            <div className="absolute h-full w-full bg-cover z-0 opacity-50" style={{backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/000/121/658/original/grunge-paper-texture-vectors.jpg')"}}></div>
            <div className="h-screen w-screen z-10 flex items-center justify-center relative">
                <h1 className="absolute top-5 left-5 text-2xl font-semibold text-zinc-100"></h1>
                <div className="h-96 w-2/3 grid gap-4 grid-cols-7">
                    <div className="bg-zinc-700 overflow-hidden col-span-2 row-span-2 rounded-md flex flex-col">
                        <div className="w-full h-10 p-3">
                            <h1 className="text-zinc-100 font-semibold text-xl">PACKING LIST</h1>
                        </div>
                        
                        <div className="h-full flex flex-col w-full p-3 py-5 gap-3 overflow-auto">
                            {
                                packages.map((pack, index) => {
                                    return (
                                        <span className='flex w-full items-center justify-between text-zinc-100' key={index}>
                                            <h1 className="text-md"> - {pack}</h1>
                                            <X className='h-5 text-rose-500 cursor-pointer' onClick={() => {removePackages(index)}}/>
                                        </span>
                                    )
                                })
                            }
                        </div>
                        
                        <form className="bg-zinc-600 h-20 w-full flex justify-center gap-3 p-5" onSubmit={(e) => {e.preventDefault(), addPackages(e) }}>
                            <input id='item' type="text" className="rounded-full p-3 w-44" placeholder='Type...'/>
                            <button className='h-full aspect-square bg-white rounded-full flex items-center justify-center text-zinc-600'><Plus/></button>
                        </form>

                    </div>
                    <div className="bg-zinc-700 flex items-center justify-around col-span-5 rounded-md">
                        <div className="w-2/5 flex flex-col items-start pl-5 justify-center gap-5 overflow-hidden">
                            <span className="flex items-center gap-2 text-emerald-500 appearance-none">
                                <ArrowDown className='-rotate-90'/>
                                <input type="number" min="1" step="any" placeholder='Type your budget' className="text-lg w-full bg-transparent outline-none" onChange={(e) => {setBudget(e.target.value)}}/>
                            </span>
                            <span className="flex items-center gap-2 text-rose-500 appearance-none">
                                <ArrowDown className='rotate-90'/>
                                <input type="number" min="1" step="any" placeholder='Type your outlay' className="text-lg w-full bg-transparent outline-none" onChange={(e) => {setOutlay(e.target.value)}}/>
                            </span>
                            <h1 className="text-4xl text-zinc-100 w-full whitespace-nowrap">R$ {budget ? parseFloat(budget - outlay).toFixed(2) : '0.00'}</h1>
                        </div>  

                        <div className="w-3/4 h-full bg-zinc-600 flex flex-col gap-3 justify-center rounded-r-lg p-3">
                            <form className='h-10 w-full flex justify-between items-center px-5' onSubmit={(e) => {e.preventDefault(), addPlaces(e)}}>
                                <input id='spot' placeholder='> Type a spot to visit' className='bg-transparent outline-none text-zinc-100'/>
                                <button className='text-zinc-100 bg-emerald-500 h-8 rounded-full aspect-square flex items-center justify-center'><Plus/></button>
                            </form>
                            <div className='h-20 w-full overflow-auto'>
                                {
                                    places.map((place, index) => {
                                        return(
                                            <span className='flex w-full items-center justify-between text-zinc-100' key={index}>
                                                <h1 className="text-md"> - {place}</h1>
                                                <X className='h-5 text-rose-500 cursor-pointer' onClick={() => {removePlaces(index)}}/>
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
                        <textarea className="text-zinc-100 bg-transparent w-full h-full outline-none p-3 pb-10 resize-none" placeholder='Type your travel notes...' ref={noteRef}></textarea>
                    </div>
                    <div className="col-span-3 flex row-span-1 overflow-hidden rounded-md relative">
                        <div className="w-2/3 relative h-full overflow-hidden bg-zinc-700 flex items-end rounded-r-2xl outline outline-zinc-100 outline-1 outline-offset-[-5px]">
                            <span className="absolute top-3 left-3">
                                <h1 className="text-xl font-semibold text-zinc-100">AIRPLANE TICKET</h1>
                                <input placeholder='Type destination...' className="uppercase text-zinc-100 text-sm bg-transparent outline-none" ref={destinationRef}/>
                            </span>
                            <h1 className="absolute bottom-3 left-3 text-5xl text-zinc-100 font-bold"></h1>
                            <form className="absolute flex flex-col items-start bottom-3 left-5">
                                <input type='date' id='start' className="text-xl text-zinc-100 font-bold bg-transparent outline-none" onClick={(e) => e.target.showPicker()} ref={startRef}/>
                                <input type='date' id='end' className="text-sm text-zinc-100 font-bold bg-transparent  outline-none" onClick={(e) => e.target.showPicker()} ref={endRef}/>
                            </form>
                        </div>

                        <div className="w-1/3 h-full bg-zinc-100 flex items-center justify-center rounded-l-2xl outline outline-1 outline-offset-[-5px]">
                            <span className="rotate-90 flex">
                                <Barcode displayValue={false} background="none" width={.65} height={40} value="mytravel"/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='h-14 aspect-square rounded-full bg-zinc-100 absolute bottom-7 right-7 flex items-center justify-center text-zinc-900' onClick={() => addDestination()}><Save/></div>
            </div>
        </div>
    )
}