'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className={`w-full max-w-md transition-all duration-700 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-10 px-6 text-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse-slow"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16 animate-pulse-slow delay-1000"></div>
            </div>
            
            {/* Store Name with Animation */}
            <h1 className={`text-4xl font-bold mb-2 relative z-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Ayesha Maryam Store
            </h1>
            
            {/* Animated Underline */}
            <div className={`h-1 bg-white mx-auto rounded-full mt-4 transition-all duration-1000 delay-500 ${isVisible ? 'w-24' : 'w-0'}`}></div>
          </div>
          
          {/* Content Section */}
          <div className="p-8 bg-white">
            {/* Question */}
            <div className="text-center mb-10">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                What is your role?
              </h2>
              <p className={`text-gray-600 text-sm transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Please select your role to continue
              </p>
            </div>
            
            {/* Buttons Container */}
            <div className="space-y-5">
              {/* Admin Button */}
              <div className={`transition-all duration-500 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <Link 
                  href="/admin-login"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 block text-center shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Admin (Owner)
                  </span>
                </Link>
              </div>
              
              {/* Sales Staff Button */}
              <div className={`transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <Link 
                  href="/salestaff-login"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 block text-center shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Sales Staff
                  </span>
                </Link>
              </div>
            </div>

            {/* Footer Note */}
            <div className={`text-center mt-8 pt-6 border-t border-gray-100 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-gray-900 text-xs">
                Secure access for authorized personnel only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}