"use client"

import { useState } from "react"
import Link from "next/link"
import '../../styles/pages/authentication-pages.css';
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    department: "",
    year: "Beginner",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

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

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      try {
        const users = JSON.parse(window.localStorage.getItem("goaltracker_users") || "[]")
        const existingUser = users.find((u) => u.email === formData.email)

        if (existingUser) {
          setError("An account with this email already exists")
          setIsLoading(false)
          return
        }

        const newUser = {
          id: Date.now(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          studentId: formData.studentId.trim(),
          department: formData.department.trim(),
          year: formData.year,
          avatar: "/placeholder.svg?height=100&width=100",
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        window.localStorage.setItem("goaltracker_users", JSON.stringify(users))
        window.localStorage.setItem("goaltracker_current_user", JSON.stringify(newUser))

        window.location.href = "/dashboard"
      } catch (error) {
        console.error("Registration error:", error)
        setError("An error occurred during registration")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>Join Goal Tracker</h1>
          <p>Create your account to start tracking goals</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="studentId">User ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your user ID"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Focus Area</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter your focus area"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="year">Experience Level</label>
            <select id="year" name="year" value={formData.year} onChange={handleChange} disabled={isLoading}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="link-button">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
