import { useNavigate, Link } from "react-router-dom"
import { AddUser, isAuthenticated } from "../utils"
import { useEffect } from "react"
import { SHA256 } from "crypto-js"

export default function CreateAccount(){

    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated()){
            navigate('/profile')
        }
    })

    async function createAccount(event){
        const name = event.target.name.value
        const mail = event.target.mail.value
        const password = event.target.password.value
        
        const infos = {
            "id": SHA256(name+mail).toString(),
            "name": name ,
            "mail": mail,
            "password": SHA256(password).toString(),
            "destinations": []
        }
        
        const created = await AddUser(infos)

        if(created){
            navigate('/login')
        }
    }

    return(
        <div className="h-screen w-screen bg-no-repeat bg-cover bg-bottom relative flex items-center justify-center overflow-hidden" style={{backgroundImage: `url(https://i.pinimg.com/originals/fc/fa/d1/fcfad17eed2e76351bf3ba565104b422.jpg)`}}>
            <div className="absolute bg-zinc-700/10 h-full w-full backdrop-blur-md z-0"></div>
            <form className="z-10 flex flex-col items-center justify-center gap-5 w-1/4" onSubmit={(e) => {e.preventDefault(), createAccount(e)}}>
                <h1 className="text-3xl text-center mb-8 text-zinc-100">Crie sua conta <br/> para continuar</h1>
                <input type="text" id="name" placeholder="Nome" className="h-14 w-full p-5 rounded-full"/>
                <input type="email" id="mail" placeholder="Email" className="h-14 w-full p-5 rounded-full"/>
                <input type="password" id="password" placeholder="Senha" className="h-14 w-full p-5 rounded-full"/>
                <input type="submit" value="Criar conta" className="h-14 w-full mt-8 bg-cyan-600 flex items-center justify-center text-zinc-100 p-5 rounded-full"/>
                <Link className="text-zinc-100 cur" to="/login">voltar</Link>
            </form>
        </div>
    )
}