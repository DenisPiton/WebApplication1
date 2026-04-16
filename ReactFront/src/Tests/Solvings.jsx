import { useEffect, useState } from "react";
import Header from "../shared/Header";
import getRandomIntInclusive from "../misc/RandomInt";
import { useRef } from "react";
import api from "../api/api";
import Modal from "../misc/Modal";

function Solvings() {
    const [firstState, setFirstState] = useState(false);
    const [secondState, setSecondState] = useState(false);
    const [listOfSymbols, setList] = useState([]);
    const [FistTimer, setFirstTimer] = useState(60);
    const [isFistTimerRunning, setIsFirstTimerRunning] = useState(false);

    const [isModal, setModalState] = useState(false);
    const [resp, setResp] = useState({ data: { result: 1 } });
    const [SecondTimer, setSecondTimer] = useState(0);
    const SecondTimerRef = useRef(null);

    const [ansBuff, setBuff] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const [bufGrid, setGrid] = useState([]);
    const IntervalRef = useRef(null);

    useEffect(() => {
        if (isFistTimerRunning && FistTimer > 0) {
            IntervalRef.current = setInterval(() => {
                setFirstTimer(ps => ps - 1);
            }, 1000);
        } else if (FistTimer === 0 && !secondState && SecondTimer == 0) {
            clearInterval(IntervalRef.current);
            setIsFirstTimerRunning(false);
            setSecondState(true);
            generateGrid();
        }
        if (secondState) {
            SecondTimerRef.current = setInterval(() => {
                setSecondTimer(p => p + 1);
            }, 1000);
        } else {
            clearInterval(SecondTimerRef.current);
        }

        return () => {
            clearInterval(IntervalRef.current);
            clearInterval(SecondTimerRef.current);
        };
    }, [FistTimer, isFistTimerRunning, secondState, SecondTimer]);

    const StartFirstTimer = () => {
        setIsFirstTimerRunning(true);
    };

    const shuffle = (array) => {
        let newArray = array;
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateGrid = () => {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            let val = getRandomIntInclusive(0, 3);
            let buf = 0;
            switch (val) {
                case 0:
                    arr.push([getRandomIntInclusive(1, 100), val, getRandomIntInclusive(1, 100)]);
                    break;
                case 1:
                    arr.push([getRandomIntInclusive(1, 100), val, getRandomIntInclusive(1, 100)]);
                    break;
                case 2:
                    arr.push([getRandomIntInclusive(1, 15), val, getRandomIntInclusive(1, 15)]);
                    break;
                case 3:
                    buf = getRandomIntInclusive(1, 15);
                    arr.push([buf * getRandomIntInclusive(1, 15), val, buf]);
                default:
                    break;
            }
        }
        setGrid(arr);
        return arr;
    };

    const handle_submit = async () => {
        let ans_counter = 0;
        ansBuff.map((item, index) => {
            switch (bufGrid[index][1]) {
                case 0:
                    if ((bufGrid[index][0] + bufGrid[index][2]) === parseInt(item)) {
                        ans_counter += 1;
                    }
                    break;
                case 1:
                    if ((bufGrid[index][0] - bufGrid[index][2]) === parseInt(item)) {
                        ans_counter += 1;
                    }
                    break;
                case 2:
                    if ((bufGrid[index][0] * bufGrid[index][2]) === parseInt(item)) {
                        ans_counter += 1;
                    }
                    break;
                case 3:
                    if ((bufGrid[index][0] / bufGrid[index][2]) === parseInt(item)) {
                        ans_counter += 1;
                    }
                    break;
                default:
                    break;
            }
        });

        const response = await api.post("/Api/CreateResult", {
            "score": ans_counter,
            "time": SecondTimer,
            "type": "solvings"
        });

        if (response.status == 200) {
            setResp(response);
            setFirstState(false);
            setSecondState(false);
            setFirstTimer(60);
            setSecondTimer(0);
            setModalState(true);
        }
    };

    const CreateList = () => {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            let val = getRandomIntInclusive(11020, 11090);
            if (arr.includes(val) == false) {
                arr.push(val);
            } else {
                i--;
            }
        }
        setList(arr.map((item => (String.fromCharCode(item)))));
    };

    const operations = ['+', '-', '×', '÷'];

    return (
        <>
            <Header />

            <main className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 py-8">
                {/* Title */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="gradient-text">Математические символы</span>
                    </h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Запомни связь между символами и операциями, затем реши примеры
                    </p>
                </div>

                {/* Start Button */}
                {!firstState && (
                    <div className="animate-fade-in-scale">
                        <button
                            onClick={() => {
                                setFirstState(true);
                                CreateList();
                                StartFirstTimer();
                            }}
                            className="group relative btn-primary text-xl px-12 py-5"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <PlayIcon className="w-6 h-6" />
                                Начать тест
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                )}

                {/* Symbol Learning Phase */}
                {firstState && !secondState && (
                    <div className="animate-fade-in-scale w-full max-w-lg">
                        {/* Timer */}
                        <div className="flex justify-center mb-8">
                            <div className="timer-display animate-timer-pulse">
                                <div className="relative z-10 flex flex-col items-center">
                                    <span className="text-5xl font-bold text-white">{FistTimer}</span>
                                    <span className="text-sm text-gray-400">секунд</span>
                                </div>
                                {/* Circular progress */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        fill="none"
                                        stroke="rgba(99, 102, 241, 0.2)"
                                        strokeWidth="4"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeDasharray={377}
                                        strokeDashoffset={377 * (1 - FistTimer / 60)}
                                        className="transition-all duration-1000"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#06b6d4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Instructions */}
                        <p className="text-center text-gray-400 mb-6">
                            Запомни связь между символами и операциями
                        </p>

                        {/* Symbols Grid */}
                        <div className="card p-6">
                            <div className="grid grid-cols-4 gap-4">
                                {/* Operations */}
                                {operations.map((op, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-primary-400">{op}</span>
                                        </div>
                                    </div>
                                ))}
                                {/* Symbols */}
                                {listOfSymbols.map((symbol, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center">
                                            <span className="text-3xl">{symbol}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Solving Phase */}
                {secondState && (
                    <div className="animate-fade-in-scale w-full max-w-2xl">
                        {/* Timer Badge */}
                        <div className="fixed bottom-6 right-6 z-10">
                            <div className="bg-surface-800/90 backdrop-blur-sm border border-surface-700 rounded-2xl px-5 py-3 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="w-5 h-5 text-primary-400" />
                                    <span className="text-2xl font-mono font-bold text-white">{SecondTimer}s</span>
                                </div>
                            </div>
                        </div>

                        {/* Problems Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bufGrid.map((item, index) => (
                                <div
                                    key={index}
                                    className="card p-4 animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xl font-medium text-white flex-1 text-right">
                                            {item[0]} {listOfSymbols[item[1]]} {item[2]} =
                                        </span>
                                        <input
                                            type="number"
                                            onChange={e => {
                                                let ans = [...ansBuff];
                                                ans[index] = e.target.value;
                                                setBuff(ans);
                                            }}
                                            className="w-20 h-12 text-center text-xl font-mono bg-surface-800 border border-surface-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                            placeholder="?"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handle_submit}
                                className="btn-success text-lg px-10 py-4"
                            >
                                <span className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5" />
                                    Отправить ответы
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Result Modal */}
                <Modal isOpen={isModal}>
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center shadow-glow-success">
                            <TrophyIcon className="w-10 h-10 text-white" />
                        </div>

                        <p className="text-xl text-gray-300 mb-2">Результат</p>
                        <p className="text-6xl font-bold gradient-text mb-2">
                            {resp.data.result}
                        </p>
                        <p className="text-2xl text-gray-400 mb-6">из 10</p>

                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
                            <ClockIcon className="w-5 h-5" />
                            <span>{SecondTimer} секунд</span>
                        </div>

                        <button
                            className="btn-primary px-8 py-3"
                            onClick={() => {
                                setModalState(false);
                            }}
                        >
                            Закрыть
                        </button>

                        <p className="text-sm text-gray-500 mt-6">
                            * результаты сохранены в профиле
                        </p>
                    </div>
                </Modal>
            </main>
        </>
    );
}

// Icons
function PlayIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function ClockIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function CheckIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );
}

function TrophyIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

export default Solvings;