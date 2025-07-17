"use client"

import { useState, useEffect } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [courses, setCourses] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({})

  useEffect(() => {
    loadUser()
    loadTasks()
    loadCourses()
  }, [])

  const loadUser = () => {
    try {
      const currentUser = window.localStorage.getItem("goaltracker_current_user")
      if (currentUser) {
        const userData = JSON.parse(currentUser)
        setUser(userData)
        setEditedUser(userData)
      }
    } catch (error) {
      console.error("Error loading user:", error)
      setUser(null)
    }
  }

  const loadTasks = () => {
    try {
      const savedTasks = window.localStorage.getItem("goaltracker_goals")
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }
    } catch (error) {
      console.error("Error loading tasks:", error)
      setTasks([])
    }
  }

  const loadCourses = () => {
    try {
      const savedCourses = window.localStorage.getItem("goaltracker_categories")
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses))
      }
    } catch (error) {
      console.error("Error loading courses:", error)
      setCourses([])
    }
  }

  const saveUser = (userToSave) => {
    try {
      window.localStorage.setItem("goaltracker_current_user", JSON.stringify(userToSave))

      const users = JSON.parse(window.localStorage.getItem("goaltracker_users") || "[]")
      const userIndex = users.findIndex((u) => u.id === userToSave.id)
      if (userIndex !== -1) {
        users[userIndex] = userToSave
        window.localStorage.setItem("goaltracker_users", JSON.stringify(users))
      }
    } catch (error) {
      console.error("Error saving user:", error)
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const upcomingTasks = tasks
    .filter((task) => {
      const dueDate = new Date(task.dueDate)
      return !task.completed && dueDate >= today && dueDate <= nextWeek
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser(editedUser)
    saveUser(editedUser)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div className="profile-container">
        <div className="profile-header">
          <h2>User Profile</h2>
          <button
            className="edit-button"
            onClick={() => {
              if (isEditing) {
                setEditedUser(user)
              }
              setIsEditing(!isEditing)
            }}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            {isEditing ? (
              <form className="profile-edit-form" onSubmit={handleSubmit}>
                <div className="avatar-container">
                  <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="profile-avatar" />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentId">User ID:</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={editedUser.studentId || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Focus Area:</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={editedUser.department || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Experience Level:</label>
                  <select id="year" name="year" value={editedUser.year || "Beginner"} onChange={handleChange} required>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="profile-details">
                <div className="avatar-container">
                  <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="profile-avatar" />
                </div>
                <h3>{user.name}</h3>
                <p className="user-email">{user.email}</p>
                <div className="user-details">
                  <div className="detail-item">
                    <span className="detail-label">User ID:</span>
                    <span className="detail-value">{user.studentId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Focus Area:</span>
                    <span className="detail-value">{user.department}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Experience Level:</span>
                    <span className="detail-value">{user.year}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="profile-stats">
            <h3>Your Progress</h3>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-value">{totalTasks}</div>
                <div className="stat-label">Total Goals</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{completedTasks}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{pendingTasks}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{completionRate}%</div>
                <div className="stat-label">Completion Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{courses.length}</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>

            <div className="upcoming-tasks">
              <h3>Upcoming Tasks</h3>
              {upcomingTasks.length > 0 ? (
                <ul className="upcoming-task-list">
                  {upcomingTasks.map((task) => (
                    <li key={task.id}>
                      <div className="upcoming-task-title">{task.title}</div>
                      <div className="upcoming-task-meta">
                        <span className="upcoming-task-course">{task.course}</span>
                        <span className="upcoming-task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-message">No upcoming tasks for the next 7 days.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
