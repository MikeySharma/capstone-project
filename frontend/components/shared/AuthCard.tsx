interface AuthCardProps {
  children: React.ReactNode;
  rightSide?: boolean;
}

export const AuthCard = ({ children, rightSide = true }: AuthCardProps) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 mt-10 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-5xl mx-auto rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden bg-white/95 backdrop-blur-sm">
        <div 
          className={`w-full md:w-1/2 p-8 sm:p-10 lg:p-12 transition-all duration-300 ease-in-out
            ${rightSide ? 'md:order-1' : 'md:order-2'}`}
        >
          {children}
        </div>

        <div 
          className={`w-full md:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 sm:p-10 lg:p-12
            transition-all duration-300 ease-in-out relative overflow-hidden
            ${rightSide ? 'order-first md:order-2' : 'order-first md:order-1'}
          `}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute transform -rotate-12 translate-x-1/3 -translate-y-1/4 w-[150%] h-[100%] bg-white/30 rounded-[100%] blur-3xl"></div>
          </div>
          
          <div className="relative h-full flex flex-col justify-center text-white text-center md:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Welcome to SilentWords
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-md mx-auto md:mx-0">
              Begin your journey to master sign language and connect with the deaf community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 