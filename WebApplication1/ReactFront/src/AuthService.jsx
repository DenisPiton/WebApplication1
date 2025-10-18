import api from "./api/api"

class AuthService {
    async login(username,password){
        const response = await api.post('',{
            "email_or":username,
            "password":password
        })

        if(response.status === 200){
            console.log(response.data.jwstoken);
            localStorage.setItem("token", JSON.stringify(response.data.jwstoken));

        }
        return response.data;
    }
    async logout(){
        localStorage.clear();
    }
    


}

export default new AuthService();