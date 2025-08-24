import React from 'react'

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/20 flex justify-center items-center z-50 text-black'>
      <div className="bg-white p-8 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-[#BD93F9] hover:bg-[#A87FE3] text-white cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
