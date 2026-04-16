import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import api from "../api/api";
import Header from "../shared/Header";

function Chart_F() {
    const [Loading, setLoading] = useState(true);
    const [chartData1, setChartData1] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [chartData3, setChartData3] = useState([]);
    const [userData, setUserData] = useState({ username: "" });

    useEffect(() => {
        const get_inf = async () => {
            if (Loading) {
                try {
                    const response = await api.get("/Api/GetResults");
                    let arr = response.data;

                    const newData1 = [
                        ['номер', 'Результат'],
                        ...arr.primer.map((item, index) => [index + 1, item.score])
                    ];
                    const newData2 = [
                        ['номер', 'Результат'],
                        ...arr.slova.map((item, index) => [index + 1, item.score])
                    ];
                    const newData3 = [
                        ['номер', 'Время (сек)']
                    ];
                    let c = 1;
                    for (let i = 0; i < arr.primer.length; i++) {
                        if (arr.primer[i].score == 10) {
                            newData3.push([c, arr.primer[i].time]);
                            c++;
                        }
                    }

                    setChartData1(newData1);
                    setChartData2(newData2);
                    setChartData3(newData3);

                    const user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                        setUserData(user);
                    }

                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching results:", error);
                    setLoading(false);
                }
            }
        };
        get_inf();
    }, [Loading]);

    const chartOptions = {
        backgroundColor: 'transparent',
        legend: { textStyle: { color: '#94a3b8' } },
        hAxis: {
            title: 'Попытка',
            titleTextStyle: { color: '#64748b' },
            textStyle: { color: '#94a3b8' },
            gridlines: { color: '#334155' }
        },
        vAxis: {
            title: 'Результат',
            titleTextStyle: { color: '#64748b' },
            textStyle: { color: '#94a3b8' },
            gridlines: { color: '#334155' },
            minValue: 0
        },
        curveType: 'function',
        pointSize: 6,
        colors: ['#6366f1', '#06b6d4', '#22c55e']
    };

    const timeOptions = {
        ...chartOptions,
        vAxis: {
            ...chartOptions.vAxis,
            title: 'Секунды'
        },
        colors: ['#22c55e']
    };

    if (Loading) {
        return (
            <>
                <Header />
                <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
                        <p className="text-gray-400">Загрузка статистики...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-80px)] px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
                            <UserIcon className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Привет, <span className="gradient-text">{userData.username}</span>!
                        </h1>
                        <p className="text-gray-400">Вот твоя статистика прогресса</p>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up">
                        <StatCard
                            label="Примеры решено"
                            value={chartData1.length - 1}
                            icon={<CalculatorIcon />}
                            color="from-violet-500 to-purple-600"
                        />
                        <StatCard
                            label="Лучший результат"
                            value={Math.max(...(chartData1.slice(1).map(d => d[1]) || [0]))}
                            suffix="/ 10"
                            icon={<TrophyIcon />}
                            color="from-amber-500 to-orange-600"
                        />
                        <StatCard
                            label="Тестов слов"
                            value={chartData2.length - 1}
                            icon={<BookIcon />}
                            color="from-cyan-500 to-blue-600"
                        />
                        <StatCard
                            label="Макс. слов"
                            value={Math.max(...(chartData2.slice(1).map(d => d[1]) || [0]))}
                            suffix="/ 12"
                            icon={<StarIcon />}
                            color="from-emerald-500 to-green-600"
                        />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Words Chart */}
                        <div className="card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <BookIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Запоминание слов</h3>
                                    <p className="text-sm text-gray-400">Прогресс по попыткам</p>
                                </div>
                            </div>
                            <div className="h-72">
                                {chartData2.length > 1 ? (
                                    <Chart
                                        chartType="LineChart"
                                        width="100%"
                                        height="100%"
                                        data={chartData2}
                                        options={{ ...chartOptions, title: null }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500">
                                        Нет данных
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Math Chart */}
                        <div className="card p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                    <CalculatorIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Примеры с подстановкой</h3>
                                    <p className="text-sm text-gray-400">Результаты по попыткам</p>
                                </div>
                            </div>
                            <div className="h-72">
                                {chartData1.length > 1 ? (
                                    <Chart
                                        chartType="LineChart"
                                        width="100%"
                                        height="100%"
                                        data={chartData1}
                                        options={{ ...chartOptions, title: null }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500">
                                        Нет данных
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Time Chart */}
                        <div className="card p-6 lg:col-span-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                    <ClockIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Время решения</h3>
                                    <p className="text-sm text-gray-400">При максимальном результате (10/10)</p>
                                </div>
                            </div>
                            <div className="h-72">
                                {chartData3.length > 1 ? (
                                    <Chart
                                        chartType="LineChart"
                                        width="100%"
                                        height="100%"
                                        data={chartData3}
                                        options={{ ...timeOptions, title: null }}
                                    />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                                        <ClockIcon className="w-12 h-12 opacity-30" />
                                        <p>Пока нет результатов с максимальным баллом</p>
                                        <p className="text-sm">Решите все 10 примеров правильно!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <a
                            href="/Test"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <span>Продолжить тренировку</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}

function StatCard({ label, value, suffix = "", icon, color }) {
    return (
        <div className="card p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-2xl font-bold text-white">
                {value}
                <span className="text-sm text-gray-400 ml-1">{suffix}</span>
            </p>
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    );
}

// Icons
function UserIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function BookIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
}

function CalculatorIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    );
}

function TrophyIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    );
}

function StarIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    );
}

function ClockIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function ArrowRightIcon({ className }) {
    return (
        <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}

export default Chart_F;