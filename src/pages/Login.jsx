import { useNavigate } from "react-router-dom"
import { Logar, isAuthenticated } from "../utils"
import { useEffect } from "react"

export default function Login(){

    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated()){
            navigate('/profile')
        }
    })

    async function handleLogin(event){
        const mail = event.target.mail.value
        const password = event.target.password.value
        const login = await Logar(mail, password)

        if(login){
            navigate('/profile')
        }
    }

    return(
        <div className="h-screen w-screen bg-no-repeat bg-cover bg-bottom relative flex items-center justify-center overflow-hidden" style={{backgroundImage: `url(https://i.pinimg.com/originals/fc/fa/d1/fcfad17eed2e76351bf3ba565104b422.jpg)`}}>
            <div className="absolute bg-zinc-700/10 h-full w-full backdrop-blur-md z-0"></div>
            <form className="z-10 flex flex-col gap-5 w-1/4" onSubmit={(e) => {e.preventDefault(), handleLogin(e)}}>
                <input type="email" id="mail" placeholder="Email" className="h-14 w-full p-5 rounded-full"/>
                <input type="password" id="password" placeholder="Senha" className="h-14 w-full p-5 rounded-full"/>
                <input type="submit" value="Entrar" className="h-14 w-full bg-cyan-600 flex items-center justify-center text-zinc-100 p-5 rounded-full"/>
            </form>
        </div>
    )
}