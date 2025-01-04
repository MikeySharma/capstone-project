interface AuthCardProps {
  children: React.ReactNode;
  rightSide?: boolean;
}

export const AuthCard = ({ children, rightSide = true }: AuthCardProps) => {
  return (
    <div className=" p-4 sm:p-8 mt-5 lg:p-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full mt-10 max-w-3xl flex flex-col md:flex-row rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative">
        {/* Content Side */}
        <div 
          className={`w-full md:w-1/2 p-4 sm:p-6 lg:p-8  transition-all duration-500 ease-in-out transform relative
            ${rightSide ? 'md:order-1' : 'md:order-2'}`}
        >
          {children}
        </div>

        {/* Decorative Divider - Only visible on tablet and up */}
        <div className="hidden md:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2">
          <div className="h-full w-[1px] bg-gray-200"></div>
        </div>

        {/* Brand Side - Hidden on mobile, shown as top section */}
        <div 
          className={`w-full md:w-1/2 bg-indigo-700 p-6 sm:p-8 lg:p-12 transition-all duration-500 ease-in-out
            ${rightSide ? 
              'md:rounded-bl-[5rem] md:rounded-tr-[5rem] lg:rounded-bl-[10rem] lg:rounded-tr-[10rem] md:order-2' : 
              'md:rounded-br-[5rem] md:rounded-tl-[5rem] lg:rounded-br-[10rem] lg:rounded-tl-[10rem] md:order-1'
            }
            ${rightSide ? 'order-first md:order-2' : 'order-first md:order-1'}
          `}
        >
          <div className="h-full flex flex-col justify-center text-white text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-6">
              Welcome to SilentWords
            </h2>
            <p className="text-base sm:text-lg opacity-90">
              Begin your journey to master sign language and connect with the deaf community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 