"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header({ user }) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("goaltracker_current_user")
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
      window.location.href = "/"
    }
  }

  return (
    <header className="header">
      <div className="logo">
        <h1>Goal Tracker</h1>
        <p className="tagline">Track and achieve your personal goals</p>
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link href="/dashboard" className={currentPath === "/dashboard" ? "active" : ""}>
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/dashboard/courses" className={currentPath === "/dashboard/courses" ? "active" : ""}>
              Courses
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className={currentPath === "/dashboard/profile" ? "active" : ""}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="user-menu">
          <div className="user-info">
            <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="user-avatar" />
            <span className="user-name">{user.name}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  )
}