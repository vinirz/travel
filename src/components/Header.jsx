import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <main className="absolute top-3 w-full h-12 z-50 flex items-center justify-between px-10 text-zinc-100">
            <h1 className='font-semibold'>Travel !</h1>
            <ul className="flex items-center gap-10">
                <li className="cursor-pointer">
                    <Link to="/">Top viagens</Link>
                </li>
                <li className="cursor-pointer bg-white/75 rounded-full p-1 px-5 text-zinc-900">
                    <Link to="/profile">Meu perfil</Link>
                </li>
            </ul>
        </main>
    )
}