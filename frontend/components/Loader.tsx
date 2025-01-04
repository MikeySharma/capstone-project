import React from 'react'

const Loader = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                    >
                </div>
            </div>
            {/* <button type="button" className="bg-indigo-500 ..." disabled>
                <svg className="animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24">
                </svg>
            </button> */}

        </div>
    )
}

export default Loader
