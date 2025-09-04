import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default LoadingSpinner
