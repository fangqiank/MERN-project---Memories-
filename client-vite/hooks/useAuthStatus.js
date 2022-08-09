import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  const { authData } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) setLoggedIn(true)
    else setLoggedIn(false)

    setChecking(false)
  }, [authData])

  return { loggedIn, checking }
}
