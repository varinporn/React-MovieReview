import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useUser } from '../../context/UserContext.jsx'
import toast from 'react-hot-toast'
import PopupModal from '../components/PopupModal.jsx'
import RatePopup from '../components/RatePopup.jsx'
import ReviewPopup from '../components/ReviewForm.jsx'
import WatchlistButton from '../components/WatchListButton.jsx'
import ReviewLayout from '../components/ReviewLayout.jsx'
import ReviewGridLayout from '../components/ReviewGridLayout.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const Detail = () => {
  const { user, setUser } = useUser()

  const [loading, setLoading] = useState(false)
  const initialData = useLoaderData()
  const [showData, setShowData] = useState(initialData)
  const [reviews, setReviews] = useState([])

  const API_URL = import.meta.env.VITE_API_URL

  const fetchShow = async (showId) => {
    try {
      const res = await fetch(`${API_URL}/shows/${showId}`)
      setLoading(true)
      const updatedShow = await res.json()
      setShowData(updatedShow)
    } catch (err) {
      console.error('Failed to fetch show:', err)
    } finally {
      setLoading(false)
    }
  }

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
  } = showData

  const getReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/reviews`)
      const data = await res.json()

      const filtered = data.filter(
        (review) => String(review.showId) === String(id)
      )

      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'))
        const dateB = new Date(b.date.split('-').reverse().join('-'))
        return dateB - dateA
      })

      setReviews(sorted)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  const [showAll, setShowAll] = useState(false)
  const visibleReviews = showAll
    ? reviews.filter((r) => r.message?.trim() !== '')
    : reviews.filter((r) => r.message?.trim() !== '').slice(0, 5)

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

  // update avg rate
  const updateAverageRating = async (showId) => {
    try {
      const res = await fetch(`${API_URL}/reviews`)
      const data = await res.json()

      const showReviews = data.filter(
        (r) => String(r.showId) === String(showId)
      )
      if (showReviews.length === 0) return

      const avg =
        showReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
        showReviews.length

      await fetch(`${API_URL}/shows/${showId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: avg.toFixed(1) }),
      })

      await fetchShow(showId)
    } catch (err) {
      console.error('Failed to update average rating:', err)
    }
  }

  // submit review / rate
  const handleRateSubmit = async (
    ratingValue,
    reviewMessage = '',
    reviewTitle = ''
  ) => {
    if (!user) return

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
        date:
          existingReview.date ||
          new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      }

      await fetch(`${API_URL}/reviews/${existingReview.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
      })
    } else {
      // create new review
      const newReview = {
        userId: String(user.id),
        showId: id,
        date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
        title: reviewTitle,
        message: reviewMessage,
        rating: ratingValue,
      }

      await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      })
    }

    await updateAverageRating(id)
    toast.success('Your review has been saved!')
    getReviews()
    setShowPopup(false)
  }

  const closePopup = () => {
    setShowPopup(false)
    setNewRating(0)
    setHover(0)
    setReviewTitle('')
    setReviewMessage('')
  }

  useEffect(() => {
    const review = reviews.find(
      (r) =>
        String(r.userId) === String(user?.id) && String(r.showId) === String(id)
    )
    if (review) setNewRating(Number(review.rating))
  }, [reviews, user, id])

  // เช็คว่า user เคยรีวิว show นี้หรือไม่
  const hasReviewed = reviews.some(
    (r) =>
      String(r.userId) === String(user?.id) &&
      String(r.showId) === String(id) &&
      r.title?.trim() &&
      r.message?.trim()
  )
  console.log('Reviews:', reviews)
  console.log('User ID:', user?.id, 'Show ID:', id)

  const existingReview = reviews.find(
    (r) =>
      String(r.userId) === String(user?.id) && String(r.showId) === String(id)
  )

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000 && showAll) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAll])

  const scrollToTop = () => {
    window.scrollTo({ top: 900, behavior: 'smooth' })
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                      {rating || '-'}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      /10
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#9E9E9E]">
                    YOUR RATING
                  </p>
                  <div
                    onClick={openRatePopup}
                    className="mt-1 text-[#574AA0] cursor-pointer"
                  >
                    <span className="font-medium">
                      {existingReview ? (
                        <div className="flex items-center gap-2">
                          <Star fill="#574AA0" stroke="#574AA0" />
                          <p>
                            <span className="text-xl">
                              {existingReview.rating}
                            </span>
                            /10
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 ">
                          <Star stroke="#574AA0" />
                          <p>Rate</p>
                        </div>
                      )}
                    </span>
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
                    <strong>Duration</strong>
                    <span> {transformDuration(duration)}</span>
                  </p>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <WatchlistButton
                  id={id}
                  title={title}
                  user={user}
                  setUser={setUser}
                  added={added}
                  setAdded={setAdded}
                  variant="detail"
                />
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
            {!showAll && visibleReviews && visibleReviews.length > 0 && (
              <ReviewLayout reviews={visibleReviews} page="detail" />
            )}
            {showAll && (
              <ReviewGridLayout reviews={visibleReviews} page="detail" />
            )}
            {visibleReviews.length === 0 && (
              <div className="text-white text-xl flex items-center justify-center mt-12 mb-10">
                <p>No Review</p>
              </div>
            )}
            {/* See All */}
            <div className="mt-4 text-right min-h-[28px]">
              {!showAll && visibleReviews.length > 0 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="text-[#BD93F9] font-medium hover:underline"
                >
                  See All
                </button>
              )}
              {showAll && (
                <button
                  onClick={() => setShowAll(false)}
                  className="text-[#BD93F9] font-medium hover:underline"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
          {showPopup && popupType === 'rate' && (
            <PopupModal onClose={closePopup}>
              <RatePopup
                title={title}
                newRating={newRating || existingReview?.rating || 0}
                setNewRating={setNewRating}
                hover={hover}
                setHover={setHover}
                handleRateSubmit={handleRateSubmit}
                existingReview={existingReview}
              />
            </PopupModal>
          )}
          {showPopup && popupType === 'review' && (
            <PopupModal onClose={closePopup}>
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
                onClose={closePopup}
              />
            </PopupModal>
          )}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-[#574AA0] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#6b5bcc] transition"
            >
              ↑ Back to Top
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Detail
