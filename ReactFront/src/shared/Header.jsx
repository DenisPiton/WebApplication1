import { useState } from "react";

function Header() {
    const [accordion, setAccordion] = useState(false);

    const navLinks = [
        { href: "/profile", label: "Профиль", icon: profileIcon },
        { href: "/Test", label: "Упражнения", icon: exercisesIcon },
        { href: "/profile", label: "Лидеры", icon: leaderboardIcon },
        { href: "/Auth", label: "Выйти", icon: logoutIcon },
    ];

    return (
        <>
            {/* Desktop Header */}
            <header className="hidden sm:block sticky top-0 z-50 bg-surface-900/80 backdrop-blur-md border-b border-surface-800">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <a href="/Test" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-accent transition-shadow duration-300">
                                <BrainIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">Мнемос</span>
                        </a>

                        <nav className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href + link.label}
                                    href={link.href}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-800 transition-all duration-200"
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-medium">{link.label}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="sm:hidden sticky top-0 z-50 bg-surface-900/90 backdrop-blur-md border-b border-surface-800">
                <div className="flex items-center justify-between px-4 py-3">
                    <a href="/Test" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <BrainIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold gradient-text">Мнемос</span>
                    </a>

                    <button
                        onClick={() => setAccordion(!accordion)}
                        className={`w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center transition-all duration-300 ${accordion ? 'rotate-90 bg-primary-500/20' : ''}`}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d={accordion ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {/* Mobile Accordion Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${accordion ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <nav className="px-4 pb-4 space-y-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href + link.label}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-surface-800 transition-all duration-200"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <link.icon className="w-5 h-5" />
                                <span className="font-medium">{link.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    );
}

// Icons
function BrainIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 2.828l-.707.707m10.607 10.607l-.707.707M12 21v-1m-6.364-1.636l-.707.707M12 12a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
    );
}

function profileIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function exercisesIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
    );
}

function leaderboardIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    );
}

function logoutIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );
}

export default Header;