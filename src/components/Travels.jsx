import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { X } from "react-feather"
import { removeTravel } from "../utils"

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

    async function handleRemoveTravel(travel){
        removeTravel(travel)
            .then(data => {
                if(data.status == 200){
                    navigate(0)
                }
            }) .catch(error => {console.log(error)})
    }


    return(
        <div className="flex flex-col items-start absolute left-10 gap-5">
            {
                travels && (travels.map((travel)=>{
                    return(
                        <div className="flex items-center relative group cursor-pointer" key={travel.id}>
                            <X className="absolute -rotate-180 left-[-10rem] group-hover:left-0 group-hover:rotate-0 transition-all hover:text-rose-500" onClick={() => {handleRemoveTravel(travel.id)}}/>
                            <Link className="text-xl group-hover:pl-8 transition-all capitalize" to={`/travel/${travel.id}`}>{travel.destination}</Link>
                        </div>
                    )
                }))
            }

            <h1 className="text-xl hover:pl-5 transition-all text-rose-600 font-semibold cursor-pointer" onClick={() => handleExit()}>Sair</h1>
        </div>
    )
}