
export default function DashboardPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* <aside className="w-72 bg-white shadow-xl">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link href="/dashboard">
                <div className="flex items-center px-4 py-3.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                  <svg 
                    className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/courses">
                <div className="flex items-center px-4 py-3.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                  <svg 
                    className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-medium">Courses</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1   overflow-auto">
        <div className="max-w-7xl mx-auto  rounded-2xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
