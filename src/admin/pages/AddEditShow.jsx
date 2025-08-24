import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddEditShow = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  const showCategories = ['Movies', 'TV Shows']
  const platformList = [
    'Netflix',
    'VIU',
    'Prime Video',
    'Disney+ Hotstar (Thailand)',
    'WeTV',
    'Apple TV',
  ]

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    year: '',
    platform: '',
    episode: '',
    duration: '',
    imageUrl: '',
    director: '',
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

  const [genresList, setGenresList] = useState([])
  const [genresInput, setGenresInput] = useState('')
  const [starsList, setStarsList] = useState([])
  const [starsInput, setStarsInput] = useState('')

  useEffect(() => {
    if (!isEditMode) return
    fetch(`http://localhost:5001/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          year: data.year || '',
          platform: data.platform || '',
          episode: data.episode || '',
          duration: data.duration || '',
          imageUrl: data.imageUrl || '',
          director: data.director || '',
        })
        setGenresList(data.genres || [])
        setStarsList(data.stars || [])
      })
  }, [id, isEditMode])

  const onBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setForm((prev) => ({ ...prev, [field]: prev[field]?.trim() }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      let updated = { ...prev, [name]: value }

      if (name === 'category') {
        if (value === 'Movies') updated.episode = ''
        else if (value === 'TV Shows') updated.duration = ''
      }

      return updated
    })
  }

  // Genres handlers
  const handleGenreInputChange = (e) => setGenresInput(e.target.value)
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
  const removeGenre = (index) =>
    setGenresList((prev) => prev.filter((_, i) => i !== index))

  // Stars handlers
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
  const removeStar = (index) =>
    setStarsList((prev) => prev.filter((_, i) => i !== index))

  const isFormValid =
    form.title &&
    form.description &&
    genresList.length > 0 &&
    form.category &&
    form.director &&
    starsList.length > 0 &&
    form.imageUrl

  const handleShowSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid) return

    const payload = { ...form, genres: genresList, stars: starsList }
    const url = isEditMode
      ? `http://localhost:5001/shows/${id}`
      : 'http://localhost:5001/shows'
    const method = isEditMode ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`Show ${isEditMode ? 'updated' : 'uploaded'} successfully!`)
        navigate('/admin/dashboard/manage-shows')
        if (!isEditMode) {
          setForm({
            title: '',
            description: '',
            category: '',
            year: '',
            platform: '',
            episode: '',
            duration: '',
            imageUrl: '',
            director: '',
          })
          setGenresList([])
          setStarsList([])
        }
      })
  }

  return (
    <div className="text-black my-10 mx-8 max-w-screen">
      <Breadcrumbs
        section="Management"
        link="/admin/dashboard/manage-movie"
        page={isEditMode ? 'Edit Show' : 'Create Show'}
      />
      <h1 className="text-2xl font-semibold mt-8 mb-6">
        {isEditMode ? 'Edit Show' : 'Create Show'}
      </h1>

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
                    {' '}
                    Description is required.{' '}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="block font-semibold">Year</label>
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block font-semibold">Platform</label>
                  <select
                    name="platform"
                    value={form.platform}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Platform</option>
                    {platformList.map((p) => (
                      <option key={p} value={p}>
                        {p}
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
                  onBlur={() => onBlur('category')}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {showCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {touched.category && !form.category && (
                  <p className="text-red-600 text-sm">
                    {' '}
                    Show category is required.{' '}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-semibold mt-2">
                  Genres <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {genresList.map((g, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {g}
                      <button
                        type="button"
                        onClick={() => removeGenre(idx)}
                        className="ml-2"
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
                    disabled={form.category === 'Movies'}
                    className={`w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      form.category === 'Movies'
                        ? 'bg-gray-200 cursor-not-allowed'
                        : ''
                    }`}
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
                    disabled={form.category === 'TV Shows'}
                    className={`w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      form.category === 'TV Shows'
                        ? 'bg-gray-200 cursor-not-allowed'
                        : ''
                    }`}
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
                />
                {touched.imageUrl && !form.imageUrl && (
                  <p className="text-red-600 text-sm">Image URL is required.</p>
                )}
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="mt-2 w-30 h-auto rounded-md border"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Cast & Crew */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500 font-semibold mb-4">Cast & Crew</h2>
            <div className='space-y-4'>
              <div className="space-y-2">
                <label className="block font-semibold">
                  Director(s) <span className="text-red-400">*</span>
                </label>
                <input
                  name="director"
                  value={form.director}
                  onBlur={() => onBlur('director')}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {touched.director && !form.director && (
                  <p className="text-red-600 text-sm">
                    Director(s) is required.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block font-semibold mt-2">
                  Stars <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {starsList.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeStar(idx)}
                        className="ml-2"
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
              isFormValid
                ? 'bg-[#7942FC] cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isEditMode ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEditShow
