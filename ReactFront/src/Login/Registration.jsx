import { useState } from "react";
import { useAuth } from "../AuthMech/AuthContext";
import { useNavigate } from "react-router";

function Registration(){
    const navigate = useNavigate();
    const [formParams,setParams] = useState({
        email:"",
        username:"",
        password:""
    });
    const {error,register} = useAuth();
    const handle_submit = async ()=>{
        console.log(formParams)
        const response = await register(formParams.email,formParams.username,formParams.password);
        console.log(response)
        if(response.success == true){
            navigate("/Tests")
        }
        else{
            console.error("error in registration");
            console.error(error);
        }
    }
    return(<>
        <div className="min-h-screen grid items-center bg-gray-900">
            <div className="bg-gray-800 w-96 rounded-lg p-7 place-self-center">
                <h1 className="text-white text-2xl mb-6 text-center">Регистрация</h1>
                
                
                <div className="mb-6">
                    <label className="text-gray-200 block mb-2">Почта</label>
                    <input onChange={e=>{setParams({
                        email:e.target.value,
                        username: formParams.username,
                        password:formParams.password
                    })}}  name="email" className="transition-all duration-200 bg-gray-700 p-2 outline-none rounded-md text-white  w-full h-10 focus:border-2 border-sky-500 " type="email" placeholder="example@somemail.com"/>
                    <span asp-validation-for="email" className="text-red-500 text-size-xs font-[6px]"></span>
                </div>

                <div className="mb-6">
                    <label className="text-gray-200 block mb-2">Имя пользователя</label>
                    <input onChange={e => {setParams({
                        email:formParams.email,
                        username: e.target.value,
                        password:formParams.password

                    })
                        
                    }} value={formParams.username} name="username" className="transition-all duration-200 bg-gray-700 p-2 outline-none rounded-md text-white  w-full h-10 focus:border-2 border-sky-500 " type="text" placeholder="SomeName123" />
                    <span asp-validation-for="username" className="text-red-500 text-size-xs font-[6px]"></span>
                </div>
                <div className="mb-6">
                    <label className="text-gray-200 block mb-2">Пароль</label>
                    <input onChange={e=>{setParams({
                        email:formParams.email,
                        username:formParams.username,
                        password:e.target.value
                    })}} value={formParams.password} name="password" className="transition-all duration-200 bg-gray-700 p-2 outline-none rounded-md text-white  w-full h-10 focus:border-2 border-sky-500 " type="password" placeholder="Password" />
                </div>
                <div className="place-self-center">
                    <button onClick={handle_submit} type="submit" className="bg-blue-600 p-3 w-32 rounded-md focus:bg-blue-700 text-white">Отправить</button>
                </div>
            
            </div>
        </div>        
    </>)
}

export default Registration;
