import axios from "axios";

export async function Logar(mail, pass){
    const response = await axios.get(`http://localhost:3000/profiles?mail=${mail}&password=${pass}`)
    if(response.data[0]){
        localStorage.setItem('user', JSON.stringify(response.data[0]))
        return true
    }
}

export function isAuthenticated(){
    var isAuth = false
    try{
        const {name, mail, password} = JSON.parse(localStorage.getItem('user'))
        if(name, mail, password){
            isAuth = true
        }   
    } catch {}

    return isAuth
}