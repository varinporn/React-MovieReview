import React from 'react'

const PopupModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-[500px] max-w-full mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 26.625C20.7487 26.625 26.625 20.7487 26.625 13.5C26.625 6.25126 20.7487 0.375 13.5 0.375C6.25126 0.375 0.375 6.25126 0.375 13.5C0.375 20.7487 6.25126 26.625 13.5 26.625Z"
              fill="#F7F3FF"
            />
            <path
              d="M9.125 9.125L17.875 17.875M17.875 9.125L9.125 17.875"
              stroke="#7D7F89"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

export default PopupModal
