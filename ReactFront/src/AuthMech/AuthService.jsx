import { renderToReadableStream } from "react-dom/server";
import api from "../api/api"

class AuthService {
    async login(username,password){
        const response = await api.post('Auth/Index',{
            "email_or":username,
            "password":password
        })

        if(response.status === 200){
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            return localStorage.getItem("user");

        }
        else{
            console.error("BadRequest")
            return null;
        }

        
    }
    async Register(email,username,password){
        const response = await api.post("Auth/Reg",{
            "email":email,
            "password":password,
            "username":username
        })
        if(response.status === 200){
            console.log(response.data);
            localStorage.setItem("user",JSON.stringify(response.data));
            return JSON.stringify(response.data);
        }
        else{
            
        }
    } 
    async logout(){
        localStorage.clear();
    }
    async GetUser(){
        return localStorage.getItem("user");
    }


}

export default new AuthService();