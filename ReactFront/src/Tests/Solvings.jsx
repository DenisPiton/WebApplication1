import { useEffect, useState } from "react";
import Header from "../shared/Header";
import getRandomIntInclusive from "../misc/RandomInt";
import { useRef } from "react";
import api from "../api/api";
import Modal from "../misc/Modal";

function Solvings(){
    const [firstState,setFirstState] = useState(false)
    const [secondState,setSecondState] = useState(false)
    const [listOfSymbols,setList] = useState([])
    const [FistTimer,setFirstTimer] = useState(10)
    const [isFistTimerRunning,setIsFirstTimerRunning] = useState(false)

    const [isModal,setModalState] = useState(false);
    const [resp,setResp] = useState({data:{result:1}});
    const [SecondTimer,setSecondTimer] = useState(0)
    const SecondTimerRef = useRef(null);
    
    const [ansBuff,setBuff] = useState([0,0,0,0,0,0,0,0,0,0])

    const [bufGrid,setGrid] = useState([])
    const IntervalRef = useRef(null)

    useEffect(()=>{
        if(isFistTimerRunning && FistTimer>0){
            IntervalRef.current = setInterval(()=>{
                setFirstTimer(ps=>ps-1)
                console.log(FistTimer)
            },1000)
            
        }
        else if(FistTimer===0 && !secondState && SecondTimer==0){
            clearInterval(IntervalRef.current);
            setIsFirstTimerRunning(false);
            setSecondState(true);
            generateGrid();
        }
        if(secondState){
            SecondTimerRef.current = setInterval(()=>{
                setSecondTimer(p=>p+1);

            },1000)
        }
        else{
            clearInterval(SecondTimerRef.current);
        }


        return ()=>{
            clearInterval(IntervalRef.current);
            clearInterval(SecondTimerRef.current);
        }

    },[FistTimer,isFistTimerRunning,secondState,SecondTimer])

    const StartFirstTimer = ()=>{
        setIsFirstTimerRunning(true);
    };

    const shuffle=(array)=>{
        let newArray = array
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;


    }

    // const CreateSymbolCreate = () => {
    //     for (let i = 11020; i < 11090; i++) {
    //         setList(...listOfSymbols,[String.fromCharCode(i)]);
    //     }

    //     setList(shuffle(listOfSymbols));
        
    // }
    // CreateSymbolCreate();
    
    
    const generateGrid = () => {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            let val = getRandomIntInclusive(0,3);
            let buf = 0;
            switch (val) {
                case 0:
                    arr.push([getRandomIntInclusive(1,100),val,getRandomIntInclusive(1,100)]);
                    
                    break;

                case 1:
                    arr.push([getRandomIntInclusive(1,100),val,getRandomIntInclusive(1,100)]);
                    break;
                case 2:
                    arr.push([getRandomIntInclusive(1,15),val,getRandomIntInclusive(1,15)])
                    break;
                case 3:
                    buf = getRandomIntInclusive(1,15);
                    arr.push([buf*getRandomIntInclusive(1,15),val,buf]);
                default:
                    break;
            }
            
        }
        setGrid(arr);
        return arr;
    }
    
    const handle_submit = async ()=>{

        let ans_counter = 0;
        ansBuff.map((item,index)=>{
            switch (bufGrid[index][1]) {
                case 0:
                    console.log(toString(bufGrid[index][2]+bufGrid[index][0]))
                    if((bufGrid[index][0]+bufGrid[index][2]) === parseInt(item)){
                        ans_counter+=1;
                    }
                    break;
                case 1:
                    if((bufGrid[index][0]-bufGrid[index][2]) === parseInt(item)){
                        ans_counter+=1;
                    }

                    break;
                case 2:
                    if((bufGrid[index][0]*bufGrid[index][2]) === parseInt(item)){
                        ans_counter+=1;
                    }
                    break;
                case 3:
                    if((bufGrid[index][0]/bufGrid[index][2]) === parseInt(item)){
                        ans_counter+=1;
                    }
                    break;
                default:
                    break;
            }
        })
        console.log(ans_counter);
        const response = await api.post("/Api/CreateResult",{
            "score":ans_counter,
            "time":SecondTimer,
            "type":"solvings"
            
        })
        console.log(response)
        if(response.status == 200){
            setResp(response);
            setFirstState(false);
            setSecondState(false);
            setFirstTimer(10);
            setSecondTimer(0);
            setModalState(true);
        }

    }
    
    
    const CreateList = ()=>{
        let arr = [];

        for (let i = 0; i < 4; i++) {
            
            let val = getRandomIntInclusive(11020,11090);

            if(arr.includes(val) == false){
                arr.push(val)
            }
            else{
                i--;
            }    
            
        }
        
        setList(arr.map((item => (String.fromCharCode(item)))));
        console.log(listOfSymbols.length);
        // while(true){
        //     let val = getRandomIntInclusive(11020,11090);
        //     if(!listOfSymbols.includes(val)){
        //         setList([1,1,1])

        //     }
        //     if(listOfSymbols.length >= 3){
        //         break;
        //     }
        // }

    }

    
    
    
    return(<>
        
        <Header></Header>
        <h1 className="place-self-center m-8 font-bold text-xl text-center">Запоминание математических символов</h1>
        <h1 id="t" hidden={firstState} className="place-self-center text-white-800">Нажатие кнопки запустит тест</h1>
        <div className="place-self-center content-center h-auto">
            <button onClick={()=>{
                setFirstState(true);
                CreateList();
                console.log(listOfSymbols)
                StartFirstTimer();
                }} hidden={firstState} className="place-self-center w-48 h-24 mt-16 bg-blue-500 rounded-lg text-3xl font-bold" >Старт!</button>
            <div className={`${(!firstState || secondState)? "hidden" : "grid"} grid-cols-4 grid-rows-2 mt-[40px] content-center bg-gray-700 rounded-lg w-96 h-32 text-center text-2xl `}>
                <div className="self-center text-center">+</div>
                <div className="self-center text-center">-</div>
                <div className="self-center text-center">*</div>
                <div className="self-center text-center">/</div>
                {listOfSymbols.map((item, index) => (
                    <div key={index}>
                    {item}
                    </div>
                ))}

                
            </div>
            <div hidden={!firstState || secondState} className="place-self-center w-32 h-32 bg-gray-600 rounded-lg text-4xl text-center content-center m-8">
                <h1 className="text-6xl">{FistTimer}</h1>
            </div>
            <div className="text-2xl font-medium fixed bottom-10 right-10 py-2 px-5 rounded-lg bg-gray-700" hidden={!secondState}>
                {SecondTimer}
            </div>
            <div className={` ${secondState ? "grid":"hidden"} place-self-center grid-cols-2 bg-gray-800 gap-10 rounded-lg p-5 max-w-[700px] m-7 content-center `}>
                {bufGrid.map((item,index)=>(
                    <div key={index} className="h-16 text-center flex justify-stretch">
                        <span className="self-center text-2xl">{`${item[0]} ${listOfSymbols[item[1]]} ${item[2]} = `}</span>
                        <input onChange={e => {

                            let ans = ansBuff;
                            ans[index] = e.target.value;
                            setBuff(ans);

                        }} id={index} className="self-center ml-3 h-10 outline-none bg-gray-600 rounded-lg text-2xl w-14 text-center"></input>
                        <div className="w-14"></div>
                    </div>
                ))}
            </div>
            <div className={`w-screen ${secondState ? "grid" : "hidden"}  place-items-start`}><button onClick={handle_submit}  className="place-self-center bg-blue-500 text-3xl font-semibold px-6 py-3 rounded-lg">Отправить</button></div>
            <Modal isOpen={isModal}>

                <p className="text-3xl font-semibold">Вы решили:</p>
                <p className="text-6xl font-semibold my-4">{resp.data.result} из 10</p>
                <p className="font-light text-3xl mb-7">за {SecondTimer} секунд</p>


                <button className="bg-blue-500 px-6 py-3 text-2xl font-semibold rounded-lg self-center" onClick={()=>{
                    setModalState(false);
                }}>Закрыть</button>

                <p className="font-light text-sm mt-5 text-gray-400">*все результаты можно посмотреть в профиле</p>
            </Modal>
        </div>

    </>)
}
export default Solvings;