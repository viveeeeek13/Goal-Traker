"use client"

import { useState, useEffect } from "react"
import TaskForm from "../task-form"
import TaskList from "../task-list"


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
        const defaultTasks = [
          { id: 1, title: "Complete Online Course", course: "Education", dueDate: "2024-06-15", completed: false },
          {
            id: 2,
            title: "Read 2 Books This Month",
            course: "Personal Development",
            dueDate: "2024-06-10",
            completed: true,
          },
          {
            id: 3,
            title: "Practice Public Speaking",
            course: "Health & Fitness",
            dueDate: "2024-06-20",
            completed: false,
          },
        ]
        setTasks(defaultTasks)
        saveTasks(defaultTasks)
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
        const defaultCourses = [
          { id: 1, name: "Education", code: "EDU101", instructor: "Various", color: "#4a6fa5" },
          { id: 2, name: "Personal Development", code: "PD202", instructor: "Various", color: "#66bb6a" },
          { id: 3, name: "Health & Fitness", code: "HF110", instructor: "Various", color: "#ef5350" },
        ]
        setCourses(defaultCourses)
        saveCourses(defaultCourses)
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

