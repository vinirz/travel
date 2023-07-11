import { Link, useNavigate } from "react-router-dom"

export default function Travels(){
    const travels = JSON.parse(localStorage.getItem('user')).destinations
    const navigate = useNavigate()

    function handleExit(){
        localStorage.clear()
        navigate('/')
    }

    return(
        <div className="flex flex-col items-start absolute left-10 gap-5">
            {
                travels.map((travel)=>{
                    return(
                        <Link className="text-xl hover:pl-5 transition-all" to={`/travel/${travel.id}`}>{travel.destination}</Link>
                    )
                })
            }

            <h1 className="text-xl hover:pl-5 transition-all text-rose-600 font-semibold" onClick={() => handleExit()}>Sair</h1>
        </div>
    )
}