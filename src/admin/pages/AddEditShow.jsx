import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'

const FormMovie = () => {
  const showCategories = ['Movies', 'TV Shows']
  const platformList = [
    'Netflix',
    'VIU',
    'Prime Video',
    'Disney+ Hotstar (Thailand)',
    'WeTV',
    'Apple TV'
  ]

  const [form, setForm] = useState({
    title: '',
    description: '',
    genres: '',
    category: '',
    year: '',
    platform: '',
    episode: '',
    duration: '',
    imageUrl: '',
    director: '',
    stars: '',
  })

  const [touched, setTouched] = useState({
    title: false,
    description: false,
    genres: false,
    category: false,
    director: false,
    stars: false,
    imageUrl: false,
  })

  const onBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setForm((prev) => ({ ...prev, [field]: prev[field].trim() }))
  }

  // Genres array state
  const [genresList, setGenresList] = useState([])
  const [genresInput, setGenresInput] = useState('')

  const removeGenre = (indexToRemove) => {
    setGenresList((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const handleGenreInputChange = (e) => {
    setGenresInput(e.target.value)
  }

  const handleGenreInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const genre = genresInput.trim()
      if (genre && !genresList.includes(genre)) {
        setGenresList((prev) => [...prev, genre])
        setGenresInput('')
      }
    }
  }

  // Stars array state
  const [starsList, setStarsList] = useState([])
  const [starsInput, setStarsInput] = useState('')

  const removeStar = (indexToRemove) => {
    setStarsList((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }
  const handleStarsInputChange = (e) => setStarsInput(e.target.value)
  const handleStarsInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const star = starsInput.trim()
      if (star && !starsList.includes(star)) {
        setStarsList((prev) => [...prev, star])
        setStarsInput('')
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      let updated = { ...prev, [name]: value }

      if (name === 'category') {
        if (value === 'Movies') {
          updated.episode = ''
        } else if (value === 'TV Shows') {
          updated.duration = ''
        }
      }

      return updated
    })

    if (name === 'genres') {
      const genres = value
        .split('\n')
        .map((g) => g.trim())
        .filter((g) => g.length > 0)
      setGenresList(genres)
    }
  }

  const isFormValid =
    form.title &&
    form.description &&
    genresList.length > 0 &&
    form.category &&
    form.director &&
    starsList.length > 0 &&
    form.imageUrl

  const handleShowSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid) return

    const payload = { ...form, genres: genresList, stars: starsList }

    fetch('http://localhost:5001/shows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Show uploaded successfully!')
        setForm({
          title: '',
          description: '',
          genres: '',
          category: '',
          year: '',
          platform: '',
          episode: '',
          duration: '',
          imageUrl: '',
          director: '',
          stars: '',
        })
        setGenresList([])
        setGenresInput('')
        setStarsList([])
        setStarsInput('')
        setTouched({
          title: false,
          description: false,
          genres: false,
          category: false,
          director: false,
          stars: false,
          imageUrl: false,
        })
      })
  }

  return (
    <div className="text-black my-10 mx-8 max-w-screen">
      <Breadcrumbs
        section="Management"
        link="/admin/dashboard/manage-movie"
        page="Add Show"
      />

      <h1 className="text-2xl font-semibold mt-8 mb-6">Create Show</h1>

      <form onSubmit={handleShowSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* General Information */}
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <h2 className="text-gray-500 font-semibold mb-4">
              General Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-semibold">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={() => onBlur('title')}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                />
                {touched.title && !form.title && (
                  <p className="text-red-600 text-sm">Title is required.</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={() => onBlur('description')}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                />
                {touched.description && !form.description && (
                  <p className="text-red-600 text-sm">
                    Description is required.
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="block font-semibold">Year </label>
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block font-semibold">Platform </label>
                  <select
                    name="platform"
                    value={form.platform}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Platform</option>
                    {platformList.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <h2 className="text-gray-500 font-semibold mb-4">Category</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-semibold">
                  Show Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  onBlur={() => onBlur('category')}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {showCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {touched.category && !form.category && (
                  <p className="text-red-600 text-sm">
                    Show category is required.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">
                  Genres <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="genres"
                  value={genresInput}
                  onChange={handleGenreInputChange}
                  onKeyDown={handleGenreInputKeyDown}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, genres: true }))
                    if (genresInput.trim()) {
                      if (!genresList.includes(genresInput.trim())) {
                        setGenresList((prev) => [...prev, genresInput.trim()])
                      }
                      setGenresInput('')
                    }
                  }}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {touched.genres && genresList.length === 0 && (
                  <p className="text-red-600 text-sm">Genres is required.</p>
                )}

                {/* แสดง tag */}
                <div className="flex flex-wrap gap-2 mt-2 ">
                  {genresList.map((g, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm select-none"
                    >
                      <span>{g}</span>
                      <button
                        type="button"
                        onClick={() => removeGenre(idx)}
                        className="ml-2 text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        aria-label={`Remove genre ${g}`}
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500 font-semibold mb-4">Details</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="block font-semibold">Episode</label>
                  <input
                    name="episode"
                    type="number"
                    min="1"
                    value={form.episode}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-200 ${
                      form.category === 'Movies'
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                    disabled={form.category === 'Movies'}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block font-semibold">Duration</label>
                  <input
                    name="duration"
                    type="number"
                    min="1"
                    value={form.duration}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-200 ${
                      form.category === 'TV Shows'
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                    disabled={form.category === 'TV Shows'}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-semibold">
                  Image URL <span className="text-red-400">*</span>
                </label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  onBlur={() => onBlur('imageUrl')}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                />
                {touched.imageUrl && !form.imageUrl && (
                  <p className="text-red-600 text-sm">Image URL is required.</p>
                )}
                <div>
                  {form.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-30 h-auto rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cast & Crew */}
          <div className="bg-white p-6 rounded-lg shadow min-h-fit">
            <h2 className="text-gray-500 font-semibold mb-4">Cast & Crew</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-semibold">
                  Director(s) <span className="text-red-400">*</span>
                </label>
                <input
                  name="director"
                  value={form.director}
                  onChange={handleChange}
                  onBlur={() => onBlur('director')}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                />
                {touched.director && !form.director && (
                  <p className="text-red-600 text-sm">
                    Director(s) is required.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">
                  Stars <span className="text-red-400">*</span>
                </label>

                {/* input สำหรับเพิ่มชื่อ stars */}
                <input
                  type="text"
                  name="stars"
                  value={starsInput}
                  onChange={handleStarsInputChange}
                  onKeyDown={handleStarsInputKeyDown}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, stars: true }))
                    if (starsInput.trim()) {
                      if (!starsList.includes(starsInput.trim())) {
                        setStarsList((prev) => [...prev, starsInput.trim()])
                      }
                      setStarsInput('')
                    }
                  }}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {touched.stars && starsList.length === 0 && (
                  <p className="text-red-600 text-sm">Star(s) is required.</p>
                )}

                {/* แสดง tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {starsList.map((star, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm select-none"
                    >
                      <span>{star}</span>
                      <button
                        type="button"
                        onClick={() => removeStar(idx)}
                        className="ml-2 text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        aria-label={`Remove star ${star}`}
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 mb-12 flex justify-end space-x-4">
          <button
            type="button"
            className="py-1 px-4 rounded-md bg-[#D9D9D9] cursor-pointer"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`py-1 px-4 rounded-md text-white ${
              isFormValid ? 'bg-[#7942FC] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormMovie
