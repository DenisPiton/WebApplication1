import { useState } from "react";


const Modal = ({children, isOpen=true})=>{

    if(!isOpen){
        return null;
    }
    else{
        return(<>
            <div className="absolute top-0 right-0 w-screen h-screen bg-[#000000a3] grid place-items-center">
                <div className="place-self-center w-96 h-80 bg-gray-800 mt-10 text-center p-6 rounded-3xl">
                    {children}
                </div>
            </div>
        </>);
    }
}

export default Modal;