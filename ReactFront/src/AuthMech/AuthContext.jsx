import { useContext, useState, useEffect, use} from "react"
import AuthService from "./AuthService"
import { createContext } from "react";

const AuthContext = createContext();

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    //console.log('useAuth context:', context);
    if(!context){
        throw new Error("Use Auth Error with Context")
    }
    return context;    
};


export const AuthProvider = ({ children })=>{
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
        CheckAuth();
    },[]);
    
    const CheckAuth = async () =>{
        try{
            const user = await AuthService.GetUser();
            setCurrentUser(user);
        }
        catch(error){
            setCurrentUser(null);
        }
        finally{
            setLoading(false);
        }
    };
    const login = async (email,password) =>{
        setLoading(true);
        setError("");

        try{
            const user = await AuthService.login(email,password);
            console.log(user);
            setCurrentUser(user);
            return {"success" : true};

        }
        catch(error){
            setError(error.message);
            return {"success":false, error: error.message}
        }
        finally{
            setLoading(false);
        }
    }
    const logout = async ()=>{
        setLoading(true);

        try{
            await AuthService.logout();
            setCurrentUser(null);
            return{"success":true}
        }
        catch(error1)
        {
            setError(error1.message)
            console.log(error1.message);
            return {"success":false}

        }
        finally{
            setLoading(false);
        }
    }
    const register = async (email,username,password)=>{
        try{
            const user = await AuthService.Register(email,username,password);
            setCurrentUser(user);
            return {"success": true} 
        }
        catch(error1){
            setError(error1.message);
            return {"success":false}
            
        }
        finally{
            setLoading(false);
        }
        
        

    }
    const clearError = ()=>{
        setError('');
    }
    const value = {
        currentUser,
        loading,
        error,
        
        login,
        logout,
        register,
        clearError,
        CheckAuth,

        isAuthenticated: !!currentUser

    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}