"use client"

import React, { useEffect, useState } from "react"
import Header from "./header"

export default function DashboardWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    try {
      const currentUser = window.localStorage.getItem("goaltracker_current_user")

      if (currentUser) {
        const userData = JSON.parse(currentUser)
        if (userData && userData.id) {
          setUser(userData)
          setIsLoading(false)
        } else {
          window.location.href = "/dashboard"
        }
      } else {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      console.error("Authentication error:", error)
      window.location.href = "/dashboard"
    }
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="dashboard-container">
      <Header user={user} />
      <main className="main-content">{children}</main>
    </div>
  )
}

