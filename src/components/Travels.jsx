import { Link } from "react-router-dom"

export default function Travels(){
    const travels = JSON.parse(localStorage.getItem('user')).destinations

    return(
        <div className="flex flex-col items-start absolute left-10 gap-5">
            {
                travels.map((travel)=>{
                    console.log(travel)
                    return(
                        <Link className="text-xl hover:pl-5 transition-all" to={`/travel/${travel.id}`}>{travel.destination}</Link>
                    )
                })
            }
        </div>
    )
}