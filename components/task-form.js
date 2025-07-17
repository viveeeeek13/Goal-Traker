"use client"

import { useState } from "react"

export default function TaskForm({ onAddTask, courses = [] }) {

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    dueDate: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.course.trim() || !formData.dueDate) {
      alert("Please fill in all fields")
      return
    }
    const newTask = {
      title: formData.title.trim(),
      course: formData.course.trim(),
      dueDate: formData.dueDate,
    }
    onAddTask(newTask)
    setFormData({
      title: "",
      course: "",
      dueDate: "",
    })
  }

  return (
    <div className="task-form-container">
      <h2>Add New Goal</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Goal Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter goal title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Category:</label>
          {courses.length > 0 ? (
            <select id="course" name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select a category</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </div>

        <button type="submit" className="add-button">
          Add Goal
        </button>
      </form>
    </div>
  )
}
