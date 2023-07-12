import Map from './../components/Map';
import Travels from './../components/Travels';
import {Plus } from 'react-feather'
import { Link } from 'react-router-dom';

export default function Profile(){

    const {name} = JSON.parse(localStorage.getItem('user'))

    return(
        <div className="h-screen w-screen bg-no-repeat bg-cover bg-bottom relative flex overflow-hidden" style={{backgroundImage: `url(https://i.pinimg.com/originals/fc/fa/d1/fcfad17eed2e76351bf3ba565104b422.jpg)`}}>
            <div className="absolute bg-zinc-700/10 h-full w-full backdrop-blur-md z-0"></div>
            <div className="z-10 text-zinc-100 flex flex-col w-full h-full items-center justify-center">
                <Travels/>
                <span className="flex flex-col items-center justify-center font-medium">
                    <h1 className="text-4xl">Olá, {name}</h1>
                    <h1>Seja bem vindo!</h1>
                </span>
                <div className="h-1/2 aspect-video select-none">
                    <Map/>
                </div>
                <Link className='h-14 aspect-square rounded-full bg-zinc-100 absolute bottom-7 right-7 flex items-center justify-center text-zinc-900' to="/AddTravel"><Plus/></Link>
            </div>
        </div>
    )
}