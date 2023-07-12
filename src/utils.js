import axios from "axios";

export async function Logar(mail, pass){
    const response = await axios.get(`http://localhost:3000/profiles?mail=${mail}&password=${pass}`)
    if(response.data[0]){
        localStorage.setItem('user', JSON.stringify(response.data[0]))
        return true
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
