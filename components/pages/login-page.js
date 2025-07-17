"use client"

import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const initializeDemoUser = () => {
    try {
      const users = JSON.parse(window.localStorage.getItem("goaltracker_users") || "[]")
      if (users.length === 0) {
        const demoUser = {
          id: 1,
          name: "Goal Tracker Demo",
          email: "demo@goaltracker.com",
          password: "demo123",
          userId: "DEMO001",
          focusArea: "Personal Development",
          experienceLevel: "Intermediate",
          avatar: "/placeholder.svg?height=100&width=100",
          createdAt: new Date().toISOString(),
        }
        window.localStorage.setItem("goaltracker_users", JSON.stringify([demoUser]))
      }
    } catch (error) {
      console.error("Error initializing demo user:", error)
    }
  }

  useState(() => {
    initializeDemoUser()
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      try {
        const users = JSON.parse(window.localStorage.getItem("goaltracker_users") || "[]")
        const user = users.find((u) => u.email === formData.email && u.password === formData.password)

        if (user) {
          window.localStorage.setItem("goaltracker_current_user", JSON.stringify(user))
          window.location.href = "/dashboard"
        } else {
          setError("Invalid email or password")
        }
      } catch (error) {
        console.error("Login error:", error)
        setError("An error occurred during login")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Goal Tracker</h1>
          <p>Sign in to track your personal goals</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="link-button">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p>Email: demo@goaltracker.com</p>
          <p>Password: demo123</p>
          <button
            type="button"
            className="demo-button"
            onClick={() => {
              setFormData({
                email: "demo@goaltracker.com",
                password: "demo123",
              })
            }}
          >
            Use Demo Account
          </button>
        </div>
      </div>
    </div>
  )
}
