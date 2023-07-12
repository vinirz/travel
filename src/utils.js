import axios from "axios";
import { SHA256 } from "crypto-js";

export async function Logar(mail, pass){

    const hashPass = SHA256(pass).toString()

    const response = await axios.get(`http://localhost:3000/profiles?mail=${mail}&password=${hashPass}`)
    if(response.data[0]){
        localStorage.setItem('user', JSON.stringify(response.data[0]))
        return true
    }
}

export async function AddUser(infos){
    const verify = await axios.get(`http://localhost:3000/profiles?mail=${infos.mail}`)
    if(verify.data.length == 0){
        const newUser = await axios.post(`http://localhost:3000/profiles`, infos)
        if(newUser){
            return true
        }
    }
}

export async function AddNewTravel(dest){
    try{
        const {id} = JSON.parse(localStorage.getItem('user'))
        const url = `http://localhost:3000/profiles/${id}`
        axios.get(url)
            .then(response => {
                const profile = response.data;
                profile.destinations.push(dest);
                
                return axios.put(url, profile);
            })
            .then(response => {
                console.log('Nova destino adicionada com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao adicionar nova destino:', error);
            });

        return true
    } catch {
        return false
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


export function removeTravel(travel){
    const {id} = JSON.parse(localStorage.getItem('user'))
    const url = `http://localhost:3000/profiles/${id}`

    return new Promise((resolve, reject) => {

        axios.get(url)
            .then(response => {
                const profile = response.data;
                const index = profile.destinations.findIndex(dest => dest.id === travel); // Supondo que você tenha o ID do destino que deseja excluir
                if (index !== -1) {
                    profile.destinations.splice(index, 1); // Remove o destino do array
                }
                
                return axios.put(url, profile);
            })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
    })
}