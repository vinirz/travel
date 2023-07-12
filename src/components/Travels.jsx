import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Travels(){
    const [travels, setTravels] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        async function getData(){
            const {id} = JSON.parse(localStorage.getItem('user'))
            const response = await axios.get(`http://localhost:3000/profiles/${id}`)
            setTravels(response.data.destinations)
        }

        getData()
    }, [])

    function handleExit(){
        localStorage.clear()
        navigate('/')
    }

    return(
        <div className="flex flex-col items-start absolute left-10 gap-5">
            {
                travels && (travels.map((travel, index)=>{
                    return(
                        <Link className="text-xl hover:pl-5 transition-all" to={`/travel/${travel.id}`} key={index}>{travel.destination}</Link>
                    )
                }))
            }

            <h1 className="text-xl hover:pl-5 transition-all text-rose-600 font-semibold" onClick={() => handleExit()}>Sair</h1>
        </div>
    )
}