import React, { useState } from 'react'
import ReversiGame from './components/ReversiGame'
import GameStartAnimation from './components/GameStartAnimation'

function App() {
  const [showStartAnimation, setShowStartAnimation] = useState(true);

  const handleStartAnimationComplete = () => {
    setShowStartAnimation(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      {showStartAnimation && (
        <GameStartAnimation onAnimationComplete={handleStartAnimationComplete} />
      )}
      
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8">
          リバーシゲーム
        </h1>
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl">
          <ReversiGame />
        </div>
      </div>
    </div>
  )
}

export default App