"use client"

import { useEffect, useState } from "react"
import LoginPage from "./pages/login-page"
export default function AuthChecker() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const currentUser = window.localStorage.getItem("goaltracker_current_user")

      if (currentUser) {
        const userData = JSON.parse(currentUser)
        if (userData && userData.id) {
          setIsLoggedIn(true)
          window.location.href = "/dashboard"
        } else {
          setIsLoggedIn(false)
        }
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      setIsLoggedIn(false)
    }

    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }
  if (!isLoggedIn) {
    return <LoginPage />
  }

  return null
}