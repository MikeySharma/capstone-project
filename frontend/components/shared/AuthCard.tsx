interface AuthCardProps {
  children: React.ReactNode;
  rightSide?: boolean;
}

export const AuthCard = ({ children, rightSide = true }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl  overflow-hidden relative">
        <div 
          className={`w-full md:w-1/2 p-8 transition-all duration-500 ease-in-out transform relative
            ${rightSide ? 'order-1 translate-x-0' : 'order-2 translate-x-0'}`}
        >
          {children}
        </div>

        {/* Decorative Divider */}
        <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
            {/* <div className="h-full w-12 bg-indigo-600 rounded-full mx-2"></div> */}
        </div>

        <div 
          className={`hidden md:block w-1/2 bg-indigo-700 p-12 transition-all  duration-500 ease-in-out transform
            ${rightSide ? ' rounded-bl-[10rem] rounded-tr-[10rem]  order-2 translate-x-0' : ' rounded-br-[10rem] rounded-tl-[10rem]  order-1 translate-x-0'}`}
        >
          <div className="h-full flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome to SilentWords</h2>
            <p className="text-lg opacity-90">
              Begin your journey to master sign language and connect with the deaf community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 