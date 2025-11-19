export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div role="status" aria-live="polite" className="flex flex-col items-center gap-4">
                <svg
                    className="animate-spin h-12 w-12 text-gray-600 dark:text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>

                <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">Loading...</p>

                <div className="w-56 h-2 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-[marquee_1.5s_linear_infinite]" />
                </div>

                <span className="sr-only">Loading</span>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}