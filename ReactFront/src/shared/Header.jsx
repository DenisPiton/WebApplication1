import { useState } from "react";

function Header(){
    const [accordion,setAccordion] = useState(false);


    return(<>

        <header className="bg-gray-800 p-6 hidden sm:block">
            <h1 className="text-3xl font-bold text-center">Упражнение для памяти</h1>
            <nav className="mt-4 flex justify-center space-x-4">
                <a href="/profile" className="text-gray-300 hover:text-blue-400">Профиль</a>
                <a href="Test" className="text-gray-300 hover:text-blue-400">Упражнения</a>
                <a href="/profile"  className="text-gray-300 hover:text-blue-400">Таблица лидеров</a>
                <a href="Auth"  className="text-gray-300 hover:text-blue-400">Выйти</a>
                <a className="text-gray-300 hover:text-blue-400">О проекте</a>
            </nav>
        </header>

        <header className="p-4 z-100 mb-6 w-full h-15 place-self-center sticky  top-0 right-0 left-0 rounded-lg justify-items-stretch display sm:hidden ">
            <div className="  backdrop-blur-md grid grid-cols-2 w-full h-15 p-2 bg-gray-800">
                <div>
                    <a href="/profile">
                        <svg className="w-10 h-10  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd" />
                        </svg>
                    </a>

                </div>

                <div onClick={() => {setAccordion(accordion ? false : true)}} className={`h-full justify-self-end place-self-center shadow  w-10 bg-gray-700 rounded-md transition duration-200 ease-in-out ${accordion ? "rotate-90" : ""} active:bg-gray-500`}>
                    <svg className="w-10 h-10 transition-all justify-self-center place-self-center text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-widt="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                    </svg>

                </div>
            </div>
            <div id="cord" className={`z-10 transition duration-200 ease-in-out ${accordion ? "max-h-auto" : "max-h-0"} overflow-hidden  sticky  bg-gray-800 `}>
                <h1 className="place-self-center text-xl font-light mx-3 p-2 w-full transition duration-200 active:bg-[#c4ab873b]"><a href="/profile" className="w-full h-full">Профиль</a></h1>
                <h1 className="place-self-center text-xl font-light mx-3 p-2 w-full transition duration-200 active:bg-gray-700"><a href="/Test"className="w-full h-full">Упражнения</a></h1>
                <h1 className="place-self-center text-xl font-light mx-3 p-2 w-full transition duration-200 active:bg-gray-700"><a href="/profile" className="w-full h-full">Таблица лидеров</a></h1>
                <h1 className="place-self-center text-xl font-light mx-3 p-2 w-full transition duration-200 active:bg-gray-700"><a href="" className="w-full h-full">Выйти</a></h1>
                <h1 className="place-self-center text-xl font-light mx-3 p-2 w-full transition duration-200 active:bg-gray-700"><a className="w-full h-full">О проекте</a></h1>
            </div>

        </header>
    </>)
}

export default Header;