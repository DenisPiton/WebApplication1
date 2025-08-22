let t = document.getElementById("t")
let field = document.getElementById("gr")
let but = document.getElementById("but")
but.addEventListener("click", click)
let result_desk = document.getElementById("result-desk")
let tim = 10
let tim_score = 0
let score = 0




let ans = Array();

let generation = function () {
    document.getElementById("timer_g").classList.remove("hidden")
    gr = document.getElementById("gen-grid");
    gr.classList.remove("hidden")
    gr.classList.add("grid")
    cells = gr.children;
    but = document.getElementById("submit");
    but.classList.remove("hidden")


    for (let i = 0; i < 10; i++) {
        console.log(getRandomInt(4))
        switch (getRandomInt(4)) {
            case 0:
                let x = getRandomInt(30);
                let y = getRandomInt(30);
                cells[i].children[0].textContent = (x.toString() + " " + arr[0].toString() + " " + y.toString() + " =")
                ans.push(x + y)
                break;
            case 1:
                let x1 = getRandomInt(30);
                let y1 = getRandomInt(30);
                cells[i].children[0].textContent = (x1.toString() + " " + arr[1].toString() + " " + y1.toString() + " =")
                ans.push(x1 - y1)
                break;
            case 2:
                let x2 = getRandomInt(10);
                let y2 = getRandomInt(10);
                cells[i].children[0].textContent = (x2.toString() + " " + arr[2].toString() + " " + y2.toString() + " =")
                ans.push(x2 * y2)
                break;
            case 3:
                let x3 = getRandomInt(10);
                let y3 = getRandomInt(10);
                cells[i].children[0].textContent = ((x3 * y3).toString() + " " + arr[3].toString() + " " + y3.toString() + " =")
                ans.push(x3)
                break;
        }
    }
    but.addEventListener("click", (event) => {
        for (let j = 0; j < ans.length; j++) {
            console.log(ans[j])
            if (cells[j].children[1].value == ans[j].toString()) {
                score++;

            }
        }



        //console.log(document.cookie)
        //let csrftoken = "";
        //for (let i = document.cookie.toString().indexOf("User_id=") + 10; i < document.cookie.length; i++) {
        //    if (document.cookie[i] != ";") {
        //        csrftoken += document.cookie[i];

        //    }
        //    else {

        //        break;
        //    }
        //}

        fetch("/Api/CreateResult", {
            method: "POST",
            headers:
            {
                'Content-Type': 'application/json'
                //'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(
                {
                    'score': score,
                    'time': tim_score,
                    'type': 'solvings'
                }),
            credentials: "same-origin"
        }).then((result) => {
            gr.classList.add("hidden")
            gr.classList.remove("grid")
            document.getElementById("timer_g").className += " hidden"
            but.className += " hidden"
            result_desk.className = "place-self-center w-96 h-80 bg-gray-800 text-center p-6 rounded-3xl"
            let res_score = document.getElementById("res-score")
            let res_time = document.getElementById("res-time")
            res_score.textContent = score.toString() + " из 10"
            res_time.textContent = "за " + tim_score.toString() + " секунд"
        })
    });
    setInterval(() => {
        tim_score++;
        document.getElementById("timer_g").textContent = tim_score.toString();
    }, 1000);

}





function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffle(array) {
    let newArray = array
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

let arr = Array();


function click(event) {

    t.hidden = true;
    but.hidden = true;
    let str = ref.className.toString()

    ref.className = str.slice(0, -6);
    timer.classList.remove("hidden")



    // let grid = document.createElement("div");
    // grid.className = "grid grid-cols-4 grid-rows-2  content-center bg-gray-700 rounded-lg w-96 h-32 text-center text-2xl";
    // grid.id="ref";
    // let span1 = document.createElement("div");
    // span1.className = "self-center text-center "
    // span1.textContent = "+";
    // grid.appendChild(span1);
    // let span2 = document.createElement("div");
    // span2.className = "self-center text-center"
    // span2.textContent = "-";
    // grid.appendChild(span2);
    // let span3 = document.createElement("div");
    // span3.className = "self-center text-center"
    // span3.textContent = "*";
    // grid.appendChild(span3);
    // let span4 = document.createElement("div");
    // span4.className = "self-center text-center"
    // span4.textContent = "/";
    // grid.appendChild(span4);

    grid = document.getElementById("ref");

    for (let i = 11020; i < 11090; i++) {
        arr.push(String.fromCharCode(i));
    }
    alert(arr[0]);
    arr = shuffle(arr);



    let span5 = document.createElement("div");
    span5.className = "self-center text-center"
    span5.textContent = arr[0]
    grid.appendChild(span5);
    let span6 = document.createElement("div");
    span6.className = "self-center text-center"
    span6.textContent = arr[1];
    grid.appendChild(span6);
    let span7 = document.createElement("div");
    span7.className = "self-center text-center"
    span7.textContent = arr[2];
    grid.appendChild(span7);
    let span8 = document.createElement("div");
    span8.className = "self-center text-center"
    span8.textContent = arr[3];
    grid.appendChild(span8);



    but.parentElement.appendChild(grid);
    setInterval(() => {
        tim -= 1;
        document.getElementById("timerr").textContent = tim.toString();
        if (tim == 0) {
            timer.className += " hidden";
            grid.className += " hidden";
            generation();


            clearInterval();
        }
    }, 1000)



}
