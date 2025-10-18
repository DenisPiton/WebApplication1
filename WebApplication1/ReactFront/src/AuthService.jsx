import api from "./api/api"

class AuthService {
    async login(username,password){
        const response = await api.post('',{
            "email_or":username,
            "password":password
        })

        if(response.status === 200){
            localStorage.setItem("user_id", JSON.stringify(response.data.user));
        }
        return response.data;
    }
    async logout(){
        localStorage.clear();
    }
    


}

export default new AuthService();