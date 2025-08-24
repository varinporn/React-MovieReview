import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryBadge from '../components/CategoryBadge'
import ConfirmModal from '../components/ConfirmModal'
import toast from 'react-hot-toast'

const ManageShows = () => {
  const [shows, setShows] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const getAllMovies = async () => {
    try {
      const res = await fetch('http://localhost:5001/shows')
      const data = await res.json()
      setShows(data)
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5001/shows/${deleteId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        toast.error('Failed to delete.')
        throw new Error('Failed to delete')
      }
      toast.success('Successfully Delete.')
      setShows((shows) => shows.filter((show) => show.id !== deleteId))
      await getAllMovies()
    } catch (error) {
      console.error('Delete error:', error)
    } finally {
      closeDeleteConfirm()
    }
  }

  const openDeleteConfirm = (id) => {
    setDeleteId(id)
    setShowConfirm(true)
  }

  const closeDeleteConfirm = () => {
    setDeleteId(null)
    setShowConfirm(false)
  }

  return (
    <div className="h-full">
      <div className="mx-6 mt-12 flex justify-between">
        <h2 className="font-semibold text-3xl text-black">Shows</h2>

        <Link to={'/admin/dashboard/create-show'}>
          <button className="text-[#BD93F9] font-medium py-1 px-4 border border-[#BD93F9] rounded-lg cursor-pointer hover:bg-[#F1E8FF] hover:text-[#AA6FFF] hover:border-[#AA6FFF] active:bg-[#F9F5FF] ">
            Create New Show
          </button>
        </Link>
      </div>

      <div className="mx-6 mt-8 mb-14">
        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="bg-[#FAFAFA] text-[#696969] border-[#EBEBEB] text-left">
            <tr>
              <th className="py-3 px-4 font-medium">Id</th>
              <th className="py-3 px-4 font-medium">Title</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Genre</th>
              <th className="py-3 px-4 font-medium">Platform</th>
              <th className="py-3 px-4 font-medium">Year</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr
                key={show.id}
                className=" hover:bg-gray-50 border-t border-[#EBEBEB]"
              >
                <td className="py-4 px-4 text-black text-sm">{show.id}</td>
                <td className="py-4 px-3 text-gray-900 text-sm">
                  {show.title || '-'}
                </td>
                <td className="py-4 px-4">
                  <CategoryBadge category={show.category || ''} />
                </td>
                <td className="py-4 px-4 w-1/3">
                  <div className="flex gap-2 flex-wrap">
                    {show.genres?.map((genre, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                      >
                        {genre}
                      </span>
                    )) || <span className="text-gray-400 text-xs">-</span>}
                  </div>
                </td>
                <td className="py-4 px-4 text-black text-sm">
                  {show.platform || '-'}
                </td>
                <td className="py-4 px-4 text-black text-sm">
                  {show.year || '-'}
                </td>
                <td className="py-4 px-4 flex gap-4 items-center">
                  {/* edit btn */}

                  <Link
                    to={`/admin/dashboard/edit-show/${show.id}`}
                    className="cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4867 2.84436L12.845 5.69636M4.44725 5.00036H1.96664C1.74734 5.00036 1.53702 5.10572 1.38196 5.29325C1.22689 5.48079 1.13977 5.73514 1.13977 6.00036V16.0004C1.13977 16.2656 1.22689 16.5199 1.38196 16.7075C1.53702 16.895 1.74734 17.0004 1.96664 17.0004H11.0622C11.2815 17.0004 11.4918 16.895 11.6469 16.7075C11.802 16.5199 11.8891 16.2656 11.8891 16.0004V11.5004M13.881 1.59036C14.036 1.77767 14.1589 2.00005 14.2427 2.24481C14.3266 2.48958 14.3697 2.75192 14.3697 3.01686C14.3697 3.2818 14.3266 3.54414 14.2427 3.78891C14.1589 4.03367 14.036 4.25605 13.881 4.44336L8.22192 11.2874L5.27413 12.0004L5.86369 8.43536L11.5228 1.59136C11.6775 1.4039 11.8613 1.25517 12.0637 1.1537C12.266 1.05223 12.4829 1 12.7019 1C12.9209 1 13.1378 1.05223 13.3402 1.1537C13.5425 1.25517 13.7263 1.4039 13.881 1.59136V1.59036Z"
                        stroke="#696969"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  {/* delete btn */}
                  <button
                    onClick={() => openDeleteConfirm(show.id)}
                    className="cursor-pointer"
                  >
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0751 1.875V14.125C12.0751 14.5625 11.7133 15 11.3516 15H7.73402H4.11646C3.7547 15 3.39294 14.5625 3.39294 14.125V1.875"
                        stroke="#E84954"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.94592 1.875H13.5221"
                        stroke="#E84954"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.28699 1H9.18104M6.28699 5.375V11.5M9.18104 5.375V11.5"
                        stroke="#E84954"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Do you want to delete this show?"
        message="This action is permanent and cannot be undone."
        onConfirm={handleDelete}
        onCancel={closeDeleteConfirm}
      />
    </div>
  )
}

export default ManageShows
