import { useContext, useEffect } from "react";
import { useState } from "react";
import "./Login.css"

import { useAuth } from "../AuthMech/AuthContext";

const API_ADDRESS = "http://localhost:5199/"

import api from '../api/api'
import { useNavigate } from "react-router";


function Login(){
    const {login,loading,error} = useAuth();
    const navigate =useNavigate();
    const [passBuf,setPass] = useState("");
    const [emailBuf,setEmail] = useState("");
    const handle_login = async ()=>{
        // console.log(passBuf)
        // // fetch(API_ADDRESS,{
        // //     method:"POST",
        // //     headers:{
        // //         'Content-Type':'application/json'
                
        // //     },
        // //     body:{
        // //         "email_or":emailBuf,
        // //         "password":passBuf
        // //     }
        // // }).then(d=>{
        // //     return d.json();
        // // }).then(a=>{
        // //     console.log(a);
        // // });
        // const response =await api.post('',{
        //     "email_or":emailBuf,
        //     "password":passBuf
            
        // }).then(a=>{console.log(a)})
        // console.log(response.data.token)
        
        const response = await login(emailBuf,passBuf)
        console.log(response);
        if(response.success==true){
            navigate("/Test")
        }
        else{
            console.log(error);
        }

    }
    return(<>
        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl text-white text-center mb-6">Вход в Аккаунт</h2>
                
            

                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" name="email">Войти</label>
                    <input className="inp" type="email"  placeholder="Введите свою электронную почту" value={emailBuf} onChange={e => {setEmail(e.target.value)}}/>
                    <span asp-validation-name="email_or" className={error != ""? "text-red-500 text-size-xs font-[6px]":"text-red-500 text-size-xs font-[6px] hidden"}></span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2"  name="password">Пароль</label>
                    <input className="inp" type="password" placeholder="Введите пароль" value={passBuf} onChange={e=>{setPass(e.target.value)}} required/>
                    {/* <span asp-validation-name="password" className="text-red-500 text-size-xs font-[6px]"></span> */}
                </div>
                <button disabled={loading} className="butun" onClick={handle_login}>{loading? "Вход...": "Войти"}</button>

                <div className="mt-4 text-center">
                    <a className="text-blue-400 hover:underline" href="#">Забыли Пароль?</a>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-400">Нет Аккаунта?</p><a className="text-blue-400 hover:underline" href="/Registration">Зарегистрироваться</a>
                </div>
            </div>
        </div>
    </>)
}

export default Login;