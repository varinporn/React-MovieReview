import React, { createContext, useState, useContext, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
