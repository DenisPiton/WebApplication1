// google.charts.load('current',{packages:['corechart']});

// google.charts.setOnLoadCallback(drawChart);
// function drawChart()
// {
//     const data = google.visualization.arrayToDataTable([
//         ['Score', 'Number'],
//     ])
// }

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch("/Api/GetResults", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },
        credentials: "same-origin"
    
    }).then((result) => {
        return result.json()
    }).then((data) => {
        console.log(data["slova"])
        console.log(data["primer"])
        let data1 = data["slova"]
        let data3 = data["primer"]

        let buf = Array();
        let buf2 = Array();
        let buf3 = Array();
        buf3.push(['Number', 'Score'])
        buf2.push(['Number', 'Score'])
        buf.push(['Number', 'Score'])

        for (let i = 0; i < data1.length; i++) {
            buf.push([i, Number(data1[i]["score"])])
            console.log(data1[i])
        }
        for (let i = 0; i < data3.length; i++) {
            buf2.push([i, Number(data3[i]["score"])])
        }
        let i_c = 0
        for (let i = 0; i < data3.length; i++) {
            if (data3[i]["score"] == 10) {
                buf3.push([i_c, Number(data3[i]["time"])])
                i_c++;
            }

        }



        console.log(buf)

        const data2 = google.visualization.arrayToDataTable(
            buf
        )
        const data_p_s = google.visualization.arrayToDataTable(buf2)
        const data_t_p = google.visualization.arrayToDataTable(buf3);

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

        const chart = new google.visualization.LineChart(document.getElementById("myChart"));
        const chart_s_p = new google.visualization.LineChart(document.getElementById("myChart2"));
        const chart_t_p = new google.visualization.LineChart(document.getElementById("myChart3"));
        chart_t_p.draw(data_t_p, options_t_p);
        chart_s_p.draw(data_p_s, options_s_p);
        chart.draw(data2, options)

    })
}

