let but = document.getElementById("but");
let but2 = document.getElementById("but_send");
let words_prime = Array();
let t = document.getElementById("t")
let res_desk = document.getElementById("result-desk")
let grid = document.getElementById("words-grid-1");
let grid2 = document.getElementById("words-grid-2");
let words_sec = Array();
let tim = 10;
but2.hidden = true;
function change_color() {

    if (this.className == "text-xl text-center place-self-center  p-6 rounded-lg w-full bg-green-600") {
        this.className = "text-xl text-center place-self-center  p-6 rounded-lg w-full bg-gray-600";
    }
    else {
        this.className = "text-xl text-center place-self-center  p-6 rounded-lg w-full bg-green-600";
    }


}
function shuffle(array) {
    let newArray = array
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
but.addEventListener("click", () => {
    t.className += " hidden"
    fetch("/Api/Get24Words").then(res => res.json()).then((res) => {
        console.log(res);

        for (let i = 0; i < 100; i++) {
            console.log(typeof res);
            words_prime.push(res["words"][i]);

        }
        shuffle(words_prime);
        for (let i = 0; i < 24; i++) {
            words_sec.push(words_prime[i]);
        }
    }).then(() => {
        but.hidden = true
        grid.className = grid.className.slice(0, -6)
        document.getElementById("timer").className = document.getElementById("timer").className.slice(0, -6)

        for (let i = 0; i < 24; i++) {
            let span_buf = document.createElement("span");
            span_buf.className = "text-xl text-center place-self-center  p-6 rounded-lg bg-gray-600 w-full"
            span_buf.textContent = words_prime[i];
            console.log(words_sec[i]);
            grid.appendChild(span_buf);

        }
        setInterval(() => {
            let timer = document.getElementById("timer");
            tim -= 1;
            timer.textContent = tim.toString();
            if (tim == 0) {
                timer.className += "hidden";
                grid.className += "hidden";
                shuffle(words_sec);
                words_buf = Array();
                for (let i = 0; i < 24; i++) {
                    if (i % 2 == 0) {
                        words_buf.push(words_prime[i + 24]);

                    }
                    else {
                        words_buf.push(words_sec[i])
                    }
                }
                shuffle(words_buf);
                grid2.className = grid2.className.slice(0, -6);
                for (let i = 0; i < 24; i++) {
                    let span1 = document.createElement("span");
                    span1.className = "text-xl text-center place-self-center  p-6 rounded-lg w-full bg-gray-600"
                    span1.textContent = words_buf[i];
                    console.log(span1.textContent)
                    grid2.appendChild(span1);

                }
                spans = document.getElementsByTagName("span");
                for (let i = 0; i < spans.length; i++) {
                    const spann = spans[i]
                    spann.addEventListener("click", change_color)
                }
                but2.hidden = false;


            }
        }, 1000);

    })


})
but2.addEventListener("click", () => {


    let grid2_child = grid2.children
    let words_send = 0
    for (let i = 0; i < grid2_child.length; i++) {
        if (grid2_child[i].className == "text-xl text-center place-self-center  p-6 rounded-lg w-full bg-green-600" && words_sec.includes(grid2_child[i].textContent)) {
            words_send++;
        }
        else if (grid2_child[i].className == "text-xl text-center place-self-center  p-6 rounded-lg w-full bg-green-600") {
            words_send--;
        }
    }


    fetch("/Api/CreateResult", {
        method: "POST",
        headers:
        {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                'time': -1,
                'score': words_send,
                'type' : 'words'

            }),
        credentials: "same-origin"
    }).then((result) => {
        console.log(result)
        return result.json()
    }).then((res) => {
        console.log(res)
        res_desk.className = "place-self-center w-96 h-70 bg-gray-800 mt-10 text-center p-6 rounded-3xl"
        let res_t = document.getElementById("res-score")
        res_t.textContent = res["result"] + " из 12"
        grid2.className += " hidden"
        but2.className += " hidden"


    })
})