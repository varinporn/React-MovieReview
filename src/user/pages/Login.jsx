import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useUser } from '../../context/UserContext.jsx'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useUser()

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        setUser(data.user)

        toast.success('Logged in successfully!')
        navigate('/')
      } else {
        toast.error(data)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow py-10 px-2 h-[500px] w-[30%] mx-auto my-36 text-[#000000]">
      <div className="px-10 space-y-8 pt-4">
        <div className="space-y-4">
          <h1 className="font-semibold text-3xl text-[#1E1B2E]">
            StreamTeller.
          </h1>
          <p className="text-2xl font-light text-[#1E1B2E]">
            Log in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-1">
            <label className="text-[#484848] block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="border-[#E4E4E4] mt-1 w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF79C6] text-sm placeholder-[#A2A2A2]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#484848] block text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                className="border-[#E4E4E4] mt-1 w-full border rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF79C6] text-sm placeholder-[#A2A2A2]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.6493 4.34564L2.70479 3.2984L16.4921 17.0857L15.4448 18.1412L12.9051 15.6014C11.9568 15.9147 10.9508 16.0797 9.89528 16.0797C5.77229 16.0797 2.25126 13.5152 0.824707 9.89518C1.39368 8.44389 2.30074 7.16576 3.45517 6.15151L1.6493 4.34564ZM9.89528 7.42139C10.5514 7.42139 11.1806 7.68202 11.6445 8.14594C12.1084 8.60987 12.3691 9.23909 12.3691 9.89518C12.3695 10.176 12.3221 10.4549 12.2289 10.7198L9.07068 7.56157C9.3356 7.46837 9.61445 7.42097 9.89528 7.42139ZM9.89528 3.7107C14.0183 3.7107 17.5393 6.2752 18.9658 9.89518C18.2925 11.6045 17.1489 13.0883 15.6675 14.1748L14.4965 12.9957C15.6369 12.2069 16.5566 11.1396 17.1682 9.89518C16.5017 8.53448 15.4667 7.3881 14.181 6.58636C12.8953 5.78462 11.4105 5.3597 9.89528 5.35989C8.99647 5.35989 8.11415 5.50832 7.28955 5.77219L6.01967 4.51056C7.20709 3.99931 8.5182 3.7107 9.89528 3.7107ZM2.62233 9.89518C3.28889 11.2559 4.32385 12.4023 5.60954 13.204C6.89524 14.0057 8.38009 14.4307 9.89528 14.4305C10.4642 14.4305 11.025 14.3727 11.5445 14.2573L9.66439 12.369C9.0906 12.3075 8.55516 12.0514 8.14711 11.6433C7.73906 11.2353 7.48299 10.6999 7.42148 10.1261L4.61785 7.31419C3.8015 8.0151 3.11709 8.88917 2.62233 9.89518Z"
                      fill="#C8C8C8"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6059 10.8847C13.6059 11.6064 13.3192 12.2985 12.8089 12.8088C12.2986 13.3192 11.6064 13.6059 10.8847 13.6059C10.163 13.6059 9.4709 13.3192 8.96059 12.8088C8.45027 12.2985 8.16357 11.6064 8.16357 10.8847C8.16357 10.163 8.45027 9.47084 8.96059 8.96053C9.4709 8.45021 10.163 8.16351 10.8847 8.16351C11.6064 8.16351 12.2986 8.45021 12.8089 8.96053C13.3192 9.47084 13.6059 10.163 13.6059 10.8847Z"
                      fill="#C8C8C8"
                    />
                    <path
                      d="M19.859 10.4792C17.9015 6.56346 14.4257 4.53528 10.8845 4.53528C7.34339 4.53528 3.86755 6.56346 1.91012 10.4792C1.8472 10.6051 1.81445 10.7439 1.81445 10.8847C1.81445 11.0254 1.8472 11.1642 1.91012 11.2901C3.86755 15.2059 7.34339 17.2341 10.8845 17.2341C14.4257 17.2341 17.9015 15.2059 19.859 11.2901C19.9219 11.1642 19.9546 11.0254 19.9546 10.8847C19.9546 10.7439 19.9219 10.6051 19.859 10.4792ZM10.8845 15.42C8.19149 15.42 5.44038 13.9505 3.746 10.8847C5.44038 7.81882 8.19058 6.34939 10.8845 6.34939C13.5785 6.34939 16.3287 7.81882 18.0231 10.8847C16.3287 13.9505 13.5776 15.42 10.8845 15.42Z"
                      fill="#C8C8C8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#FF79C6] hover:bg-[#FF94D2] focus:bg-[#FF88CC] w-full py-3 rounded-full mt-4 cursor-pointer text-[#FFFFFF]"
          >
            Log In
          </button>

          <p className="text-[#808080] font-normal text-sm mt-4 text-center">
            Don’t have an account yet?
            <Link className="text-[#FF79C6] ml-2" to={'/register'}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
