import { useRef, useState, useEffect } from "react";
import Header from "../shared/Header";
import api from "../api/api";
import getRandomIntInclusive from "../misc/RandomInt";
import Modal from "../misc/Modal";

function WordsTest() {
    const [firstState, setFirstState] = useState(false);
    const [secondState, setSecondState] = useState(false);
    const [isFistTimerRunning, setIsFirstTimerRunning] = useState(false);
    const [FistTimer, setFirstTimer] = useState(120); // 2 минуты
    const [isModal, setModal] = useState(false);

    const [result, setResult] = useState(0);

    const IntervalRef = useRef(null);

    const [WordsForSecondGrid, setWordsFSG] = useState([]);
    const [ans_grid, set_ans_grid] = useState(Array(24).fill(false));
    const [WordsForGrid, setWordsFG] = useState([]);

    useEffect(() => {
        if (isFistTimerRunning && FistTimer > 0) {
            IntervalRef.current = setInterval(() => {
                setFirstTimer(ps => ps - 1);
            }, 1000);
        } else if (FistTimer === 0 && !secondState && isFistTimerRunning) {
            clearInterval(IntervalRef.current);
            setIsFirstTimerRunning(false);
            setSecondState(true);
            generateGrid();
        }

        return () => {
            clearInterval(IntervalRef.current);
        };
    }, [FistTimer, isFistTimerRunning, secondState]);

    const handle_gets_words = async () => {
        const response = await api.get("/Api/Get24Words");
        const resp_arr = response.data.words;
        let arr = [];
        let fin_arr = [];

        for (let i = 0; i < 24; i++) {
            let val = getRandomIntInclusive(0, 99);
            if (arr.includes(val) == false) {
                arr.push(val);
                fin_arr.push(resp_arr[val]);
            } else {
                i--;
            }
        }

        setWordsFG(fin_arr);
        setFirstState(true);
        setIsFirstTimerRunning(true);
    };

    const handleSubmit = async () => {
        let c = 0;
        for (let i = 0; i < ans_grid.length; i++) {
            if (ans_grid[i]) {
                if (WordsForGrid.includes(WordsForSecondGrid[i])) {
                    c += 1;
                } else {
                    c -= 1;
                }
            }
        }

        const response = await api.post("/Api/CreateResult", {
            'time': -1,
            'score': c,
            'type': 'words'
        });

        if (response.status == 200) {
            setFirstState(false);
            setSecondState(false);
            setModal(true);
            setFirstTimer(120);
            set_ans_grid(Array(24).fill(false));
            setResult(c);
        }
    };

    const shuffle = (array) => {
        let newArray = array;
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateGrid = async () => {
        let arr = [];
        let fin_arr = [];

        for (let i = 0; i < 12; i++) {
            let val = getRandomIntInclusive(0, 23);
            if (arr.includes(val) == false) {
                arr.push(val);
                fin_arr.push(WordsForGrid[val]);
            } else {
                i--;
            }
        }

        const response = await api.get("/Api/Get24Words");
        for (let i = 0; i < 12; i++) {
            let val = getRandomIntInclusive(0, 99);
            if (fin_arr.includes(response.data.words[val]) == false && WordsForGrid.includes(response.data.words[val]) == false) {
                fin_arr.push(response.data.words[val]);
            } else {
                i--;
            }
        }

        setWordsFSG(shuffle(fin_arr));
    };

    function HandleClick(index) {
        const alter = ans_grid.map((item, ind) => {
            if (ind == index) {
                return !item;
            }
            return item;
        });
        set_ans_grid(alter);
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const selectedCount = ans_grid.filter(Boolean).length;

    return (
        <>
            <Header />

            <main className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 py-8">
                {/* Title */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="gradient-text">Запоминание слов</span>
                    </h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Запомни слова за 2 минуты, затем выбери те, которые были в списке
                    </p>
                </div>

                {/* Start Button */}
                {!firstState && (
                    <div className="animate-fade-in-scale">
                        <div className="card p-6 mb-6 max-w-md text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <BookIcon className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-300 mb-4 text-sm">
                                Тебе будет показано 24 слова. Запомни как можно больше за 2 минуты.
                                Затем нужно будет выбрать запомненные слова из списка с отвлекающими вариантами.
                            </p>
                            <p className="text-warning-400 text-xs">
                                Неправильный выбор отнимает 1 балл
                            </p>
                        </div>

                        <button
                            onClick={handle_gets_words}
                            className="group relative btn-primary text-xl px-12 py-5"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <PlayIcon className="w-6 h-6" />
                                Начать тест
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                )}

                {/* Learning Phase */}
                {firstState && !secondState && (
                    <div className="animate-fade-in-scale w-full max-w-4xl">
                        {/* Timer */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-surface-800/80 backdrop-blur-sm border border-surface-700 rounded-2xl px-8 py-4 shadow-lg">
                                <div className="flex items-center gap-4">
                                    <ClockIcon className="w-8 h-8 text-cyan-400" />
                                    <div>
                                        <span className="text-4xl font-mono font-bold text-white">{formatTime(FistTimer)}</span>
                                        <p className="text-xs text-gray-400 text-center mt-1">осталось</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Words Grid */}
                        <div className="card p-6">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {WordsForGrid.map((word, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-4 bg-surface-800 border border-surface-700 rounded-xl text-center animate-fade-in"
                                        style={{ animationDelay: `${index * 30}ms` }}
                                    >
                                        <span className="text-white font-medium">{word}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Selection Phase */}
                {secondState && (
                    <div className="animate-fade-in-scale w-full max-w-4xl">
                        {/* Header with selection count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-400">
                                Выбери слова, которые были в списке
                            </p>
                            <div className="flex items-center gap-2 px-4 py-2 bg-surface-800 rounded-xl border border-surface-700">
                                <span className="text-gray-400">Выбрано:</span>
                                <span className={`font-bold ${selectedCount > 12 ? 'text-warning-400' : 'text-success-400'}`}>
                                    {selectedCount}
                                </span>
                                <span className="text-gray-500">/ 12</span>
                            </div>
                        </div>

                        {/* Words Selection Grid */}
                        <div className="card p-6 mb-8">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {WordsForSecondGrid.map((word, index) => (
                                    <button
                                        key={index}
                                        onClick={() => HandleClick(index)}
                                        className={`px-3 py-4 rounded-xl text-center font-medium transition-all duration-200 border animate-fade-in ${ans_grid[index]
                                            ? 'bg-success-500/20 border-success-500 text-success-400 shadow-glow-success'
                                            : 'bg-surface-800 border-surface-700 text-gray-300 hover:border-surface-600 hover:bg-surface-700'
                                            }`}
                                        style={{ animationDelay: `${index * 30}ms` }}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            {ans_grid[index] && <CheckIcon className="w-4 h-4" />}
                                            {word}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className="btn-success text-lg px-10 py-4"
                            >
                                <span className="flex items-center gap-2">
                                    <SendIcon className="w-5 h-5" />
                                    Отправить ответы
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Result Modal */}
                <Modal isOpen={isModal}>
                    <div className="text-center">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg ${result >= 8
                            ? 'bg-gradient-to-br from-success-500 to-success-600 shadow-glow-success'
                            : result >= 5
                                ? 'bg-gradient-to-br from-warning-500 to-warning-600'
                                : 'bg-gradient-to-br from-error-500 to-error-600'
                            }`}>
                            {result >= 8 ? (
                                <TrophyIcon className="w-10 h-10 text-white" />
                            ) : result >= 5 ? (
                                <ThumbsUpIcon className="w-10 h-10 text-white" />
                            ) : (
                                <RefreshIcon className="w-10 h-10 text-white" />
                            )}
                        </div>

                        <p className="text-xl text-gray-300 mb-2">Результат</p>
                        <p className="text-6xl font-bold gradient-text mb-2">
                            {result}
                        </p>
                        <p className="text-2xl text-gray-400 mb-6">из 12</p>

                        <p className="text-sm text-gray-500 mb-6">
                            {result >= 10 ? 'Отличный результат!' : result >= 7 ? 'Хорошая работа!' : result >= 4 ? 'Продолжай практиковаться!' : 'Не сдавайся, попробуй ещё раз!'}
                        </p>

                        <button
                            className="btn-primary px-8 py-3"
                            onClick={() => {
                                setModal(false);
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

function SendIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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

function ThumbsUpIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v10m7-10h-2" />
        </svg>
    );
}

function RefreshIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    );
}

function BookIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
}

export default WordsTest;