import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screeืn pt-[240px] text-white p-4">
      <h1 className="text-9xl font-extrabold mb-6 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl mb-6 text-center drop-shadow-md">
        Oops! Page not found
      </p>
      <p className="mb-8 text-center max-w-md drop-shadow-sm">
        Sorry! This page doesn't exist on our system.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
