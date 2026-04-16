import Header from "../shared/Header";

function Tests_main() {
    const tests = [
        {
            id: 'solvings',
            title: 'Примеры с подстановкой',
            description: 'Запомни связь между символами и операциями, затем реши примеры за минимальное время',
            href: '/Solvings',
            icon: MathIcon,
            gradient: 'from-violet-500 to-purple-600',
            shadowColor: 'shadow-violet-500/25',
            features: ['10 примеров', 'Таймер', 'Статистика']
        },
        {
            id: 'words',
            title: 'Запоминание слов',
            description: 'Запомни список слов и найди их среди отвлекающих вариантов',
            href: '/Words',
            icon: WordsIcon,
            gradient: 'from-cyan-500 to-blue-600',
            shadowColor: 'shadow-cyan-500/25',
            features: ['24 слова', '2 минуты', 'Точность']
        }
    ];

    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Упражнения</span>
                        <span className="text-white"> для памяти</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Развивай когнитивные способности с помощью интерактивных тестов
                    </p>
                </div>

                {/* Test Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {tests.map((test, index) => (
                        <a
                            key={test.id}
                            href={test.href}
                            className={`group relative card card-hover p-6 overflow-hidden animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${test.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${test.gradient} flex items-center justify-center mb-4 ${test.shadowColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <test.icon className="w-7 h-7 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                                {test.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                {test.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {test.features.map((feature, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-medium bg-surface-800 text-gray-300 rounded-full border border-surface-700"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-2 text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
                                <span>Начать</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            {/* Decorative corner */}
                            <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${test.gradient} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                        </a>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <StatItem value="2" label="Упражнения" />
                    <StatItem value="10+" label="Примеров" />
                    <StatItem value="∞" label="Попыток" />
                </div>
            </main>
        </>
    );
}

function StatItem({ value, label }) {
    return (
        <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
        </div>
    );
}

// Icons
function MathIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    );
}

function WordsIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
}

export default Tests_main;