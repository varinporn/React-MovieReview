import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import { Star, StarHalf, StarIcon } from 'lucide-react'
import { useUser } from '../../context/UserContext.jsx'
import toast from 'react-hot-toast'
import ReviewCard from '../components/ReviewCard.jsx'
import PopupModal from '../components/PopupModal.jsx'
import RatePopup from '../components/RatePopup.jsx'
import ReviewPopup from '../components/ReviewForm.jsx'

const Detail = () => {
  const { user, setUser } = useUser()
  const [reviews, setReviews] = useState([])
  const data = useLoaderData()

  const {
    id,
    title,
    genres,
    category,
    platform,
    episode,
    duration,
    year,
    description,
    director,
    stars,
    rating,
    imageUrl,
  } = data

  const getReviews = async () => {
    try {
      const res = await fetch('http://localhost:5001/reviews')
      const data = await res.json()
      const filteredReviews = data.filter(
        (review) => Number(review.showId) === Number(id)
      )
      setReviews(filteredReviews)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  const [showAll, setShowAll] = useState(false)
  const visibleReviews = showAll ? reviews : reviews.slice(0, 5)

  const logos = {
    Netflix:
      'https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940',
    VIU: 'https://play-lh.googleusercontent.com/Hdoa9iv9p80qm0KsXFURhKyFM5vCLo9Ai-_t6fhzeW3u49-0qZ0UUuM55rnqDBycbOcs',
    'Prime Video':
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Amazon_Prime_Video_logo_%282024%29.svg/2048px-Amazon_Prime_Video_logo_%282024%29.svg.png',
    'Disney+ Hotstar (Thailand)':
      'https://cdn.dribbble.com/userupload/26649642/file/still-c7ab4c8c5f565631f3b349abab561838.png',
    WeTV: 'https://storage.googleapis.com/techsauce-prod/uploads/2019/03/WeTV_Logo.jpg',
    'Apple TV':
      'https://www.bgr.com/bgr/guides/apple-tv-plus-guide/Apple-introduces-apple-tv-plus-03252019.jpg',
  }

  function transformDuration(duration) {
    const hour = Math.floor(duration / 60)
    const min = duration % 60
    return `${hour}hr ${min}min`
  }

  const [added, setAdded] = useState(false)
  useEffect(() => {
    if (user && user.watchlist?.includes(id)) {
      setAdded(true)
    }
    getReviews()
  }, [user, id])

  const handleAddToWatchlist = async () => {
    if (!user) {
      return
    }

    try {
      const updatedWatchlist = [...(user.watchlist || []), id]

      const res = await fetch(`http://localhost:5001/users/${user.id}`, {
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

      const res = await fetch(`http://localhost:5001/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const [showPopup, setShowPopup] = useState(false)

  const [popupType, setPopupType] = useState()

  const openRatePopup = () => {
    if (!user) {
      toast.error('Please login to rate!')
      return
    }
    setPopupType('rate')
    setShowPopup(true)
  }

  const openReviewPopup = () => {
    if (!user) {
      toast.error('Please login to review!')
      return
    }
    setPopupType('review')
    setShowPopup(true)
  }

  const [newRating, setNewRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviewMessage, setReviewMessage] = useState('')
  const [reviewTitle, setReviewTitle] = useState('')

  // rate submit
  const handleRateSubmit = async (
    ratingValue,
    reviewMessage = '',
    reviewTitle = ''
  ) => {
    if (!user) return

    // หา review เก่าของ user สำหรับ show นี้
    const existingReview = reviews.find(
      (r) => String(r.userId) === String(user.id) && r.showId === id
    )

    if (existingReview) {
      // update review
      const updatedReview = {
        rating: ratingValue,
        message: reviewMessage || existingReview.message,
        title: reviewTitle || existingReview.title,
        userId: existingReview.userId,
        showId: existingReview.showId,
        date: existingReview.date || new Date().toLocaleDateString('en-GB'),
      }

      await fetch(`http://localhost:5001/reviews/${existingReview.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
      })
    } else {
      // create new review
      const newReview = {
        userId: String(user.id),
        showId: id,
        date: new Date().toLocaleDateString('en-GB'),
        title: reviewTitle,
        message: reviewMessage,
        rating: ratingValue,
      }

      await fetch('http://localhost:5001/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      })
    }

    toast.success('Your review has been saved!')
    getReviews()
    setShowPopup(false)
  }

  // เช็คว่า user เคยรีวิว show นี้หรือไม่
  const hasReviewed = reviews.some(
    (r) => r.userId === String(user?.id) && r.showId === id
  )

  return (
    <div className="h-full text-black">
      <div className="mt-[150px] mx-auto bg-[#F8F8F2] rounded-2xl max-w-7xl px-18 py-10 flex gap-10">
        {/* LEFT: Poster + Categories */}
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt="Poster"
            className="w-96 h-auto rounded-lg shadow-md"
          />

          <div className="flex gap-2 mt-6 flex-wrap">
            {genres?.map((genre, index) => (
              <span
                key={index}
                className="border px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="mt-6 w-full border-t border-[#C0BABA] pt-2">
            <div className="flex justify-between pt-2 pb-4 text-sm">
              <span className="font-medium pr-4">Director</span>
              <span>{director}</span>
            </div>
            <div className="flex justify-between py-2 text-sm border-t border-[#C0BABA] pt-4">
              <span className="font-medium pr-4">Stars</span>
              <div>
                {stars?.map((star, index) => (
                  <span key={index}>
                    {star}
                    {index < stars.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Detail Info */}
        <div className="flex-1 mt-6">
          <span className="text-sm px-3 py-1 border rounded-full">
            {category}
          </span>
          <h1 className="text-3xl font-bold mt-6">{title}</h1>

          <div className="flex gap-20 items-center mt-6">
            <div>
              <p className="text-sm font-semibold text-[#9E9E9E]">RATING</p>
              <div className="flex items-center gap-2 mt-1">
                <Star fill="#DFB51F" stroke="#DFB51F" />
                <span className="text-lg font-semibold text-black">
                  {rating}
                </span>
                <span className="text-sm text-gray-500">/10</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#9E9E9E]">
                YOUR RATING
              </p>
              <div
                onClick={openRatePopup}
                className="flex items-center gap-2 mt-1 text-[#574AA0] cursor-pointer"
              >
                <Star stroke="#574AA0" />
                <span className="font-medium">Rate</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#4A4A4A] leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col gap-2 mt-4 text-sm">
            <p>
              <strong>Year</strong> <span>{year}</span>
            </p>
            {episode && (
              <p>
                <strong>Episode</strong> <span>{episode}</span>
              </p>
            )}

            {duration && (
              <p>
                <strong>Duration</strong>{' '}
                <span>{transformDuration(duration)}</span>
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#574AA0] text-white rounded-full text-sm hover:bg-[#5a3fd9] cursor-pointer"
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
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.625 7.5C0.625 3.70313 3.70313 0.625 7.5 0.625C11.2969 0.625 14.375 3.70313 14.375 7.5C14.375 11.2969 11.2969 14.375 7.5 14.375C3.70313 14.375 0.625 11.2969 0.625 7.5ZM7.5 13.125C6.76131 13.125 6.02986 12.9795 5.34741 12.6968C4.66495 12.4141 4.04485 11.9998 3.52252 11.4775C3.00019 10.9551 2.58586 10.3351 2.30318 9.65259C2.02049 8.97014 1.875 8.23869 1.875 7.5C1.875 6.76131 2.02049 6.02986 2.30318 5.34741C2.58586 4.66495 3.00019 4.04485 3.52252 3.52252C4.04485 3.00019 4.66495 2.58586 5.34741 2.30318C6.02986 2.02049 6.76131 1.875 7.5 1.875C8.99184 1.875 10.4226 2.46763 11.4775 3.52252C12.5324 4.57742 13.125 6.00816 13.125 7.5C13.125 8.99184 12.5324 10.4226 11.4775 11.4775C10.4226 12.5324 8.99184 13.125 7.5 13.125Z"
                    fill="white"
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
                    fill="#F8F8F2"
                  />
                </svg>
              )}
              {added ? 'In Watchlist' : 'Add to Watchlist'}
            </button>

            <button
              onClick={openReviewPopup}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                hasReviewed
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-white text-[#574AA0] border border-[#574AA0] hover:bg-[#f5f3ff] cursor-pointer'
              }`}
              disabled={hasReviewed}
            >
              {hasReviewed ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.40188 10.1962L3.75 7.54372L4.63375 6.65997L6.40188 8.42747L9.93688 4.89185L10.8212 5.77622L6.40188 10.1962Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.625 7.5C0.625 3.70313 3.70313 0.625 7.5 0.625C11.2969 0.625 14.375 3.70313 14.375 7.5C14.375 11.2969 11.2969 14.375 7.5 14.375C3.70313 14.375 0.625 11.2969 0.625 7.5ZM7.5 13.125C6.76131 13.125 6.02986 12.9795 5.34741 12.6968C4.66495 12.4141 4.04485 11.9998 3.52252 11.4775C3.00019 10.9551 2.58586 10.3351 2.30318 9.65259C2.02049 8.97014 1.875 8.23869 1.875 7.5C1.875 6.76131 2.02049 6.02986 2.30318 5.34741C2.58586 4.66495 3.00019 4.04485 3.52252 3.52252C4.04485 3.00019 4.66495 2.58586 5.34741 2.30318C6.02986 2.02049 6.76131 1.875 7.5 1.875C8.99184 1.875 10.4226 2.46763 11.4775 3.52252C12.5324 4.57742 13.125 6.00816 13.125 7.5C13.125 8.99184 12.5324 10.4226 11.4775 11.4775C10.4226 12.5324 8.99184 13.125 7.5 13.125Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.43317 13.7133L7.90067 13.29L16.7365 4.34835C16.8062 4.27693 16.845 4.18096 16.8445 4.08117C16.8441 3.98138 16.8044 3.88578 16.734 3.81501L16.2048 3.28001C16.1706 3.24488 16.1298 3.21691 16.0847 3.19773C16.0395 3.17855 15.9911 3.16856 15.942 3.16832C15.893 3.16809 15.8444 3.17763 15.7991 3.19637C15.7538 3.21512 15.7127 3.2427 15.6782 3.27751L6.86567 12.1958L6.43317 13.7133ZM17.2523 2.22001L17.7815 2.75585C18.5115 3.49501 18.5182 4.68751 17.7948 5.41918L8.68984 14.6342L5.55317 15.5375C5.45835 15.5642 5.3592 15.5719 5.26139 15.5602C5.16358 15.5486 5.06903 15.5177 4.98314 15.4695C4.89724 15.4213 4.82168 15.3567 4.76078 15.2792C4.69987 15.2018 4.65481 15.1132 4.62817 15.0183C4.5873 14.8808 4.58672 14.7345 4.6265 14.5967L5.539 11.3967L14.6198 2.20585C14.7925 2.03198 14.9981 1.89423 15.2245 1.80064C15.451 1.70705 15.6938 1.65949 15.9389 1.66073C16.1839 1.66197 16.4263 1.71199 16.6518 1.80787C16.8773 1.90375 17.0814 2.04441 17.2523 2.22001ZM7.65317 3.18085C8.0665 3.18085 8.4015 3.52001 8.4015 3.93835C8.40216 4.03724 8.38332 4.13529 8.34606 4.22689C8.3088 4.3185 8.25385 4.40186 8.18435 4.47221C8.11485 4.54256 8.03216 4.59852 7.94102 4.6369C7.84987 4.67527 7.75206 4.6953 7.65317 4.69585H4.65984C3.83317 4.69585 3.16317 5.37418 3.16317 6.21001V15.2983C3.16317 16.135 3.83317 16.8133 4.65984 16.8133H13.6398C14.4665 16.8133 15.1373 16.135 15.1373 15.2983V12.2692C15.1373 11.8508 15.4723 11.5117 15.8857 11.5117C16.299 11.5117 16.634 11.8508 16.634 12.27V15.2983C16.634 16.9717 15.2932 18.3283 13.6398 18.3283H4.65984C3.0065 18.3283 1.6665 16.9717 1.6665 15.2983V6.21001C1.6665 4.53751 3.0065 3.18085 4.65984 3.18085H7.65317Z"
                    fill="#574AA0"
                  />
                </svg>
              )}
              {hasReviewed ? 'Reviewed' : 'Add My Review'}
            </button>
          </div>

          <div className="mt-6 text-sm">
            <p className="text-gray-600 font-semibold mb-2">STREAMING</p>
            <div className="w-32 h-8">
              {logos[platform] ? (
                <img
                  src={logos[platform]}
                  alt={`${platform} Logo`}
                  className="w-full h-auto rounded-xl"
                />
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 my-[80px] px-2 py-10 mx-auto max-w-7xl h-full">
        <h2 className="text-2xl font-semibold text-white mb-3">Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <ReviewCard reviews={visibleReviews} />
        ) : (
          <div className="text-white text-xl flex items-center justify-center mt-12 mb-10">
            <p>No Review</p>
          </div>
        )}

        {/* See All */}
        <div className="mt-4 text-right min-h-[28px]">
          {!showAll && reviews.length > 5 && (
            <button
              onClick={() => setShowAll(true)}
              className="text-[#574AA0] font-medium hover:underline"
            >
              See All
            </button>
          )}
        </div>
      </div>

      {showPopup && popupType === 'rate' && (
        <PopupModal onClose={() => setShowPopup(false)}>
          <RatePopup
            title={title}
            newRating={newRating}
            setNewRating={setNewRating}
            hover={hover}
            setHover={setHover}
            handleRateSubmit={handleRateSubmit}
          />
        </PopupModal>
      )}

      {showPopup && popupType === 'review' && (
        <PopupModal onClose={() => setShowPopup(false)}>
          <ReviewPopup
            newRating={newRating}
            setNewRating={setNewRating}
            hover={hover}
            setHover={setHover}
            reviewTitle={reviewTitle}
            setReviewTitle={setReviewTitle}
            reviewMessage={reviewMessage}
            setReviewMessage={setReviewMessage}
            handleRateSubmit={handleRateSubmit}
          />
        </PopupModal>
      )}
    </div>
  )
}

export default Detail
