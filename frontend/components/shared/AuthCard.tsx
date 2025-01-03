interface AuthCardProps {
  children: React.ReactNode;
  rightSide?: boolean;
}

export const AuthCard = ({ children, rightSide = true }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden">
        <div className={`w-full md:w-1/2 p-8 ${rightSide ? 'order-1' : 'order-2'}`}>
          {children}
        </div>
        <div className={`hidden md:block w-1/2 bg-indigo-700 p-12 ${rightSide ? 'order-2' : 'order-1'}`}>
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