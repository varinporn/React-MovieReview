import React from 'react'
import toast from 'react-hot-toast'

const WatchlistButton = ({
  id,
  title,
  user,
  setUser,
  added,
  setAdded,
  variant = 'detail',
}) => {
  const API_URL = import.meta.env.VITE_API_URL

  const handleAddToWatchlist = async () => {
    if (!user) {
      toast.error('Please login to add!')
      return
    }

    try {
      const updatedWatchlist = [...(user.watchlist || []), id]

      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watchlist: updatedWatchlist }),
      })

      if (!res.ok) throw new Error('Failed to update watchlist')

      const updatedUser = await res.json()
      setUser(updatedUser)
      setAdded(true)
      toast.success(`${title} added to your watchlist!`)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  const removeFromWatchList = async () => {
    try {
      const updatedWatchlist = (user.watchlist || []).filter(
        (item) => item !== id
      )

      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watchlist: updatedWatchlist }),
      })

      if (!res.ok) throw new Error('Failed to update watchlist')

      const updatedUser = await res.json()
      setUser(updatedUser)
      setAdded(false)
      toast.success(`${title} removed from your watchlist!`)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  const buttonClass =
    variant === 'detail'
      ? 'bg-[#574AA0] text-white hover:bg-[#5a3fd9]'
      : 'text-[#574AA0] bg-none hover:bg-none'

  return (
    <button
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer transition ${buttonClass}
      `}
      onClick={added ? removeFromWatchList : handleAddToWatchlist}
    >
      {added ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.40188 10.1962L3.75 7.54372L4.63375 6.65997L6.40188 8.42747L9.93688 4.89185L10.8212 5.77622L6.40188 10.1962Z"
            fill={`${variant === 'detail' ? 'white' : '#574AA0'}`}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.625 7.5C0.625 3.70313 3.70313 0.625 7.5 0.625C11.2969 0.625 14.375 3.70313 14.375 7.5C14.375 11.2969 11.2969 14.375 7.5 14.375C3.70313 14.375 0.625 11.2969 0.625 7.5ZM7.5 13.125C6.76131 13.125 6.02986 12.9795 5.34741 12.6968C4.66495 12.4141 4.04485 11.9998 3.52252 11.4775C3.00019 10.9551 2.58586 10.3351 2.30318 9.65259C2.02049 8.97014 1.875 8.23869 1.875 7.5C1.875 6.76131 2.02049 6.02986 2.30318 5.34741C2.58586 4.66495 3.00019 4.04485 3.52252 3.52252C4.04485 3.00019 4.66495 2.58586 5.34741 2.30318C6.02986 2.02049 6.76131 1.875 7.5 1.875C8.99184 1.875 10.4226 2.46763 11.4775 3.52252C12.5324 4.57742 13.125 6.00816 13.125 7.5C13.125 8.99184 12.5324 10.4226 11.4775 11.4775C10.4226 12.5324 8.99184 13.125 7.5 13.125Z"
            fill={`${variant === 'detail' ? 'white' : '#574AA0'}`}
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.3335 11.3333H8.66683V8.66665H11.3335V7.33331H8.66683V4.66665H7.3335V7.33331H4.66683V8.66665H7.3335V11.3333ZM8.00016 14.6666C7.07794 14.6666 6.21127 14.4944 5.40016 14.15C4.58905 13.7944 3.8835 13.3166 3.2835 12.7166C2.6835 12.1166 2.20572 11.4111 1.85016 10.6C1.50572 9.78887 1.3335 8.9222 1.3335 7.99998C1.3335 7.07776 1.50572 6.21109 1.85016 5.39998C2.20572 4.58887 2.6835 3.88331 3.2835 3.28331C3.8835 2.68331 4.58905 2.21109 5.40016 1.86665C6.21127 1.51109 7.07794 1.33331 8.00016 1.33331C8.92239 1.33331 9.78905 1.51109 10.6002 1.86665C11.4113 2.21109 12.1168 2.68331 12.7168 3.28331C13.3168 3.88331 13.7891 4.58887 14.1335 5.39998C14.4891 6.21109 14.6668 7.07776 14.6668 7.99998C14.6668 8.9222 14.4891 9.78887 14.1335 10.6C13.7891 11.4111 13.3168 12.1166 12.7168 12.7166C12.1168 13.3166 11.4113 13.7944 10.6002 14.15C9.78905 14.4944 8.92239 14.6666 8.00016 14.6666ZM8.00016 13.3333C9.48905 13.3333 10.7502 12.8166 11.7835 11.7833C12.8168 10.75 13.3335 9.48887 13.3335 7.99998C13.3335 6.51109 12.8168 5.24998 11.7835 4.21665C10.7502 3.18331 9.48905 2.66665 8.00016 2.66665C6.51127 2.66665 5.25016 3.18331 4.21683 4.21665C3.1835 5.24998 2.66683 6.51109 2.66683 7.99998C2.66683 9.48887 3.1835 10.75 4.21683 11.7833C5.25016 12.8166 6.51127 13.3333 8.00016 13.3333Z"
            fill={`${variant === 'detail' ? 'white' : '#574AA0'}`}
          />
        </svg>
      )}
      {added ? 'In Watchlist' : 'Add to Watchlist'}
    </button>
  )
}

export default WatchlistButton
