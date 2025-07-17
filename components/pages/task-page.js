"use client"

import { useState, useEffect } from "react"
import TaskForm from "../task-form"
import TaskList from "../task-list"
import '../../styles/pages/task-page.css';

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    loadTasks()
    loadCourses()
  }, [])

  const loadTasks = () => {
    try {
      const savedTasks = window.localStorage.getItem("goaltracker_goals")
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      } else {
        setTasks([])
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
      } else {
        setCourses([])
      }
    } catch (error) {
      console.error("Error loading courses:", error)
      setCourses([])
    }
  }

  const saveTasks = (tasksToSave) => {
    try {
      window.localStorage.setItem("goaltracker_goals", JSON.stringify(tasksToSave))
    } catch (error) {
      console.error("Error saving tasks:", error)
    }
  }

  const saveCourses = (coursesToSave) => {
    try {
      window.localStorage.setItem("goaltracker_categories", JSON.stringify(coursesToSave))
    } catch (error) {
      console.error("Error saving courses:", error)
    }
  }

  const addTask = (newTask) => {
    const taskToAdd = {
      id: Date.now(),
      ...newTask,
      completed: false,
    }

    const updatedTasks = [...tasks, taskToAdd]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const toggleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  return (
    <div>
      <h1>Your Goals</h1>
      <div className="task-manager">
        <TaskForm onAddTask={addTask} courses={courses} />
        <TaskList tasks={tasks} onToggleComplete={toggleTaskComplete} onDeleteTask={deleteTask} />
      </div>
    </div>
  )
}
