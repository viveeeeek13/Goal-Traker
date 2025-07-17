"use client"

import { useState, useEffect } from "react"


export default function CoursesPage() {
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    instructor: "",
  })

  useEffect(() => {
    loadCategories()
    loadTasks()

    const exampleTasks = [
      {
        id: Date.now(),
        title: "Finish goal planning sheet",
        course: "Personal",
        dueDate: new Date().toISOString(),
        completed: false
      },
      {
        id: Date.now() + 1,
        title: "Submit report to boss",
        course: "Work",
        dueDate: new Date().toISOString(),
        completed: false
      },
      {
        id: Date.now() + 2,
        title: "Daily workout",
        course: "Health",
        dueDate: new Date().toISOString(),
        completed: true
      }
    ]

    const savedTasks = window.localStorage.getItem("goaltracker_goals")
    if (!savedTasks || JSON.parse(savedTasks).length === 0) {
      window.localStorage.setItem("goaltracker_goals", JSON.stringify(exampleTasks))
      setTasks(exampleTasks)
    }
  }, [])

  const loadCategories = () => {
    try {
      const savedCategories = window.localStorage.getItem("goaltracker_categories")
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories))
      } else {
        const defaultCategories = [
          { id: 1, name: "Personal", code: "PERS", instructor: "Self", color: "#4a6fa5" },
          { id: 2, name: "Work", code: "WORK", instructor: "Boss", color: "#66bb6a" },
          { id: 3, name: "Health", code: "HLTH", instructor: "Doctor", color: "#ef5350" },
        ]
        setCategories(defaultCategories)
        saveCategories(defaultCategories)
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      setCategories([])
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

  const saveCategories = (categoriesToSave) => {
    try {
      window.localStorage.setItem("goaltracker_categories", JSON.stringify(categoriesToSave))
    } catch (error) {
      console.error("Error saving categories:", error)
    }
  }

  const courseColors = ["#4a6fa5", "#66bb6a", "#ef5350", "#ff9800", "#9c27b0", "#00bcd4", "#795548"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.code.trim() || !formData.instructor.trim()) {
      alert("Please fill in all fields")
      return
    }

    const randomColor = courseColors[Math.floor(Math.random() * courseColors.length)]
    const newCategory = {
      id: Date.now(),
      name: formData.name.trim(),
      code: formData.code.trim(),
      instructor: formData.instructor.trim(),
      color: randomColor,
    }

    const updatedCategories = [...categories, newCategory]
    setCategories(updatedCategories)
    saveCategories(updatedCategories)

    setFormData({ name: "", code: "", instructor: "" })
    setIsAddingCategory(false)
  }

  const getTasksForCategory = (categoryName) => {
    return tasks.filter((task) => task.course === categoryName)
  }

  const getCategoryStats = (categoryName) => {
    const categoryTasks = getTasksForCategory(categoryName)
    const totalTasks = categoryTasks.length
    const completedTasks = categoryTasks.filter((task) => task.completed).length
    const pendingTasks = totalTasks - completedTasks
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
    }
  }

  return (
    <div>
      <h1>Goal Categories</h1>
      <div className="courses-container">
        <div className="courses-header">
          <h2>Goal Categories</h2>
          <button className="add-button" onClick={() => setIsAddingCategory(!isAddingCategory)}>
            {isAddingCategory ? "Cancel" : "Add Category"}
          </button>
        </div>

        {isAddingCategory && (
          <div className="course-form-container">
            <h3>Add New Category</h3>
            <form className="course-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Category Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Mathematics"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="code">Category Code:</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="e.g. MATH101"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructor">Instructor:</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Smith"
                  required
                />
              </div>

              <button type="submit" className="add-button">
                Add Category
              </button>
            </form>
          </div>
        )}

        <div className="courses-grid">
          {categories.map((category) => {
            const stats = getCategoryStats(category.name)
            const isSelected = selectedCategory === category.id

            return (
              <div
                key={category.id}
                className={`course-card ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                style={{ borderTop: `4px solid ${category.color}` }}
              >
                <div className="course-header">
                  <h3>{category.name}</h3>
                  <span className="course-code">{category.code}</span>
                </div>

                <div className="course-details">
                  <p>
                    <strong>Instructor:</strong> {category.instructor}
                  </p>
                  <div className="course-stats">
                    <div className="stat">
                      <span className="stat-value">{stats.totalTasks}</span>
                      <span className="stat-label">Total Tasks</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{stats.pendingTasks}</span>
                      <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{stats.completionRate}%</span>
                      <span className="stat-label">Completed</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <>
                    {console.log("Selected category:", category.name)}
                    <div className="course-tasks">
                      <h4>Tasks for this category:</h4>
                      {getTasksForCategory(category.name).length > 0 ? (
                        <ul className="course-task-list">
                          {getTasksForCategory(category.name).map((task) => (
                            <li key={task.id} className={task.completed ? "completed" : ""}>
                              {task.title}{" "}
                              <span className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="empty-message">No tasks for this category yet.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .courses-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          background: #f0f6ff;
          border-radius: 12px;
          padding: 2rem;
          margin: 2rem 0;
        }
        .course-card {
          background: #fff;
          border: 2px solid #2563eb;
          border-radius: 10px;
          padding: 1.2rem;
          color: #0a2a66;
          min-width: 220px;
          box-shadow: 0 1px 4px rgba(0,0,255,0.06);
          transition: box-shadow 0.2s;
        }
        .course-card.selected {
          box-shadow: 0 4px 16px rgba(37,99,235,0.15);
          border-color: #1d4ed8;
        }
        .course-header h3 {
          color: #2563eb;
          margin-bottom: 0.2rem;
        }
      `}</style>
    </div>
  )
}