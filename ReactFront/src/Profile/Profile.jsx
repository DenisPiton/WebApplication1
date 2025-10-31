import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import api from "../api/api";
import Header from "../shared/Header";

function Chart_F(){
    const [Loading,setLoading] = useState(true);
    const [chartData1,setChartData1] = useState([]);
    const [chartData2,setChartData2] = useState([]);
    const [chartData3,setChartData3] = useState([]);
    useEffect(()=>{
        
        const get_inf = async()=>{
            if(Loading){
                const response = await api.get("/Api/GetResults");
                let arr = response.data;
                const newData1 = [
                    ['номер','Результат'],
                    ...arr.primer.map((item,index)=>[index,item.score])
                ];
                const newData2 = [
                    ['номер','Результат'],
                    ...arr.slova.map((item,index)=>[index,item.score])
                ];
                const newData3 = [
                    ['номер','Результат']
                ];
                let c = 0
                for (let i = 0; i < arr.primer.length; i++) {
                    
                    if(arr.primer[i].score == 10){
                        newData3.push([c,arr.primer[i].time]);
                        c++;
                    }
                    
                }
                setChartData1(newData1);
                setChartData2(newData2);
                setChartData3(newData3);

                setLoading(false);
            }
        }
        get_inf();
        
    },[Loading])
    const options = {
        title: 'Количество запомненных слов',
        hAxis: { title: 'Попытка' },
        vAxis: { title: 'Кол-во' },
        legend: 'none'
    };
    const options_s_p = {
        title: 'Количество решённых примеров',
        hAxis: { title: 'Попытка' },
        vAxis: { title: 'Кол-во' },
        legend: 'none'
    };
    const options_t_p = {
        title: '',
        hAxis: { title: 'Попытка' },
        vAxis: { title: 'Секунды' },
        legend: 'none'
    };
    if(Loading){
        return(<>
            <Header></Header>
        </>)
    }
    else{
        return(<>
        <Header></Header>
        <h1 className="text-4xl place-self-center mt-8 text-center">Привет {JSON.parse(localStorage.getItem("user")).username}, вот твоя статистика:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-5 place-items-center mt-8">
            <div>
                <h1 className="text-xl text-gray-400">Результаты по запоминанию слов:</h1>
                <div id="myChart" className="h-96 w-96"><Chart chartType="LineChart" width="100%" height="100%" data={chartData2} options={options}/></div>
            </div>
            <div>
                <h1 className="text-xl text-gray-400">Колличество решёных примеров:</h1>
                <div id="myChart2" className="h-96 w-96"><Chart chartType="LineChart" width="100%" height="100%" data={chartData1} options={options_s_p}/></div>
            </div>


        </div>
        <h1 className="text-xl text-gray-400 place-self-center mt-8 text-center">время решения примеров с максимальным результатом:</h1>
        <div id="myChart3" className="h-96 w-96 place-self-center m-2"><Chart chartType="LineChart" width="100%" height="100%" data={chartData3} options={options_t_p}/></div>


        </>)
    }
}

export default Chart_F;