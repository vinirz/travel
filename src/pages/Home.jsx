import axios from "axios"
import { useEffect, useState } from "react"
import TravelCard from './../components/TravelCard';
import Header from './../components/Header';

export default function Home(){

    const [destinations, setDestinations] = useState([])
    const [currentDest, setCurrentDest] = useState({})

    useEffect(()=>{
        async function getData(){
            const response = await axios.get('http://localhost:3000/trend')
            setDestinations(response.data)
            setCurrentDest(response.data[0])

            const profileInfo = await axios.get('http://localhost:3000/profiles')
            localStorage.setItem('user', JSON.stringify(profileInfo.data[0]))
        }

        getData()
    }, [])

    return(
        <main className="h-screen w-screen bg-cover bg-no-repeat flex items-center justify-center relative overflow-hidden transition-all select-none" style={{backgroundImage: `url('${currentDest.image}')`}}>
            <Header/>
            <div className="absolute bg-gradient-to-r from-black/50 to-black/10 h-full w-full backdrop-blur-sm z-0"></div>
            <div className="w-full flex gap-60 items-center z-10">
                <span className="text-zinc-100 w-1/2 h-60 pl-10 flex flex-col">
                    <h1 className="text-4xl font-bold pl-1">{currentDest.country}</h1>
                    <h1 className="text-8xl font-extrabold">{currentDest.name}</h1>
                    <h1 className="text-2xl pl-1 mt-7">{currentDest.description}</h1>
                </span>

                <div className="flex mt-24 overflow-auto gap-10 p-10 rounded-xl w-1/2 snap-x">
                    {
                        destinations.map((destination)=>{
                            return (
                                <span onClick={()=>setCurrentDest(destination)} className="snap-start cursor-pointer" key={destination.id}>
                                    <TravelCard image={destination.image} title={destination.name}/>
                                </span>
                            ) 
                        })
                    }
                </div>
            </div>
        </main>
    )
}