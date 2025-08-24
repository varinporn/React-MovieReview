import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../user/pages/Home'
import Movie from '../user/pages/Movie'
import Show from '../user/pages/Show'
import WatchList from '../user/pages/WatchList'
import Detail from '../user/pages/Detail'
import AllList from '../user/pages/AllList'
import DashboardLayout from '../admin/pages/DashboardLayout'
import Dashboard from '../admin/pages/Dashboard'
import ManageMovies from '../admin/pages/ManageMovies'
import AddEditShow from '../admin/pages/AddEditShow'
// import AddMovie from '../admin/pages/AddMovie'
// import UpdateMovie from '../admin/pages/UpdateMovie'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/movies', element: <Movie /> },
      { path: '/tv-show', element: <Show /> },
      { path: '/all', element: <AllList /> },
      { path: '/watch-list', element: <WatchList /> },
      {
        path: '/title/:id',
        element: <Detail />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/shows/${params.id}`),
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/admin/dashboard/manage-movie',
        element: <ManageMovies />,
      },
      {
        path: '/admin/dashboard/create-show',
        element: <AddEditShow />,
      },
      {
        path: '/admin/dashboard/edit-show/:id',
        element: <AddEditShow/>,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/shows/${params.id}`)
      },
    ],
  },
])

export default router
