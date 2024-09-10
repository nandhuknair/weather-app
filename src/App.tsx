import React from 'react'
import Body from './components/Body'
const StarryBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animation: `twinkle ${Math.random() * 5 + 5}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div className=" flex flex-col justify-center min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Starry Background behind everything */}
      <StarryBackground />
      
      {/* Main content */}
      
      <div className="z-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-60">
      
      <Body />
      </div>
      
      {/* Add keyframes for twinkling stars */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default App
