import React from 'react'

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
            <div className="relative">
                {/* Outer spinning ring */}
                <div
                    className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-400 border-t-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]  "
                    role="status">
                </div>
                {/* Inner pulsing circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-primary/30 animate-pulse"></div>
                </div>
            </div>
            {/* Loading text */}
            <p className="text-primary/70 text-sm font-medium animate-pulse">Loading...</p>
        </div>
    )
}

export default Loader
