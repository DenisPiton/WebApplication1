import { useRef, useState, useEffect, use } from "react";
import Header from "../shared/Header";
import api from "../api/api";
import getRandomIntInclusive from "../misc/RandomInt";
import Modal from "../misc/Modal";


function WordsTest(){
    const [firstState,setFirstState] = useState(false)
    const [secondState,setSecondState] = useState(false)
    const [isFistTimerRunning,setIsFirstTimerRunning] = useState(false)
    const [FistTimer,setFirstTimer] = useState(10)
    const [isModal,setModal] = useState(false);

    const [result,setResult] = useState(0);

    const IntervalRef = useRef(null)

    const [WordsForSecondGrid,setWordsFSG] = useState([]);
    const [ans_grid,set_ans_grid] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    const [WordsForGrid,setWordsFG] = useState([])



    
    useEffect(()=>{
        if(isFistTimerRunning && FistTimer>0){
            IntervalRef.current = setInterval(()=>{
                setFirstTimer(ps=>ps-1)
                console.log(FistTimer)
            },1000)
            
        }
        else if(FistTimer===0 && !secondState && isFistTimerRunning){
            clearInterval(IntervalRef.current);
            setIsFirstTimerRunning(false);
            setSecondState(true);
            generateGrid();
        }



        return ()=>{
            clearInterval(IntervalRef.current);
        }

    },[FistTimer,isFistTimerRunning,secondState])


    const handle_gets_words = async () => {
        const response = await api.get("/Api/Get24Words");
        const resp_arr = response.data.words;
        let arr = [];

        let fin_arr = [];
        for (let i = 0; i < 24; i++) {
            
            let val = getRandomIntInclusive(0,99);

            if(arr.includes(val) == false){
                arr.push(val);
                fin_arr.push(resp_arr[val]);
            }
            else{
                i--;
            }    
            
        }
        
        

        setWordsFG(fin_arr);
        setFirstState(true);
        setIsFirstTimerRunning(true);
    }


    const handleSubmit = async ()=>{
        let c = 0;
        for (let i = 0; i < ans_grid.length; i++) {
            if(ans_grid[i]){
                if(WordsForGrid.includes(WordsForSecondGrid[i])){
                    c+=1;
                }
                else{
                    c-=1;
                }
            }

            
        }
        const response = await api.post("/Api/CreateResult",{
            'time':-1,
            'score':c,
            'type':'words'
        })
        if(response.status == 200){
            setFirstState(false);
            setSecondState(false);
            setModal(true);
            setFirstTimer(10);
            set_ans_grid([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            setResult(c);
        }



    }


    const shuffle=(array)=>{
        let newArray = array
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;


    }

    const generateGrid = async ()=>{
        let arr = [];
        let fin_arr = [];
        for (let i = 0; i < 12; i++) {
            
            let val = getRandomIntInclusive(0,23);

            if(arr.includes(val) == false){
                arr.push(val);
                fin_arr.push(WordsForGrid[val]);
            }
            else{
                i--;
            }    
            
        }

        const response = await api.get("/Api/Get24Words");
                for (let i = 0; i < 12; i++) {
            
            let val = getRandomIntInclusive(0,99);

            if(fin_arr.includes(response.data.words[val]) == false && WordsForGrid.includes(response.data.words[val])== false){
                fin_arr.push(response.data.words[val]);
            }
            else{
                i--;
            }    
            
        }

        setWordsFSG(shuffle(fin_arr));

    }


    function HandleClick(index){
        const alter = ans_grid.map((item,ind)=>{
            if(ind == index){
                return item ? 0 : 1;
            }
            return item;
        })
        set_ans_grid(alter);
    }



    return(<>
        <Header></Header>
        <h1 className="place-self-center m-8 font-bold text-4xl">Запоминание слов</h1>
        <h1 className="place-self-center text-center w-1/2 text-gray-400">Нажатие кнопки запустит тест, после этого вам будет отведено 2 минуты на запоминание слов после чего вам надо будет выбрать из списка слова которые вы запомнили (каждое неправильно выбранное слово будет отнимать 1 балл)</h1>
        <div className="place-self-center content-center h-auto">
            <button onClick={handle_gets_words} hidden={firstState} className="place-self-center w-48 h-24 mt-16 bg-blue-500 rounded-lg text-3xl font-bold">Начать</button>
        </div>
        <div className={`bg-gray-700 gap-3 mt-6 ${(firstState && !secondState) ? "grid" : "hidden"} grid-cols-6 grid-rows-4 content-center place-self-center rounded-lg`}>
            {
                WordsForGrid.map((item,index)=>(
                    <span className="text-xl text-center place-self-center  p-6 rounded-lg bg-gray-600 w-full" key={index}>{item}</span>
                ))
                
            }
        </div>
        <div hidden={!firstState || secondState} className="place-self-center w-32 h-32 bg-gray-600 rounded-lg text-4xl text-center content-center m-8">
            <h1 className="text-6xl">{FistTimer}</h1>
        </div>
        <div className={`bg-gray-700 gap-3 mt-6 ${(firstState && secondState) ? "grid" : "hidden"} grid-cols-6 grid-rows-4 content-center place-self-center rounded-lg`}>
            {WordsForSecondGrid.map((item,index)=>(
                <span id={index} onClick={(e)=>{
                    HandleClick(index);
                }} className={`text-xl text-center place-self-center  p-6 rounded-lg ${ans_grid[index] ? "bg-green-600":"bg-gray-600"} w-full`} key={index}>
                    {item}
                </span>
            ))}
        </div>
        <div className={`w-screen mt-10 ${secondState && !isModal ? "grid" : "hidden"}  place-items-start`}><button onClick={handleSubmit}  className="place-self-center bg-blue-500 text-3xl font-semibold px-6 py-3 rounded-lg">Отправить</button></div>
        <Modal isOpen={isModal}>
            <p className="text-3xl font-semibold">Вы решили:</p>
            <p className="text-6xl font-semibold my-4">{result} из 12</p>



            <button className="bg-blue-500 px-6 py-3 text-2xl font-semibold rounded-lg self-center" onClick={()=>{
                setModal(false);
            }}>Закрыть</button>

            <p className="font-light text-sm mt-5 text-gray-400">*все результаты можно посмотреть в профиле</p>
        </Modal>

    </>)

}

export default WordsTest;