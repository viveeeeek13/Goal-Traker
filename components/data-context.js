"use client"

import { useState, useEffect } from "react"

let globalState = {
  tasks: [],
  courses: [],
  user: null,
}

let listeners = []

function notify() {
  for (const listener of listeners) {
    listener(globalState)
  }
}

function setGlobalState(updater) {
  globalState = { ...globalState, ...updater }
  notify()
}

export function useGlobalState() {
  const [state, setState] = useState(globalState)

  useEffect(() => {
    const listener = (newState) => setState(newState)
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return state
}

if (typeof window !== "undefined") {
  try {
    const savedTasks = JSON.parse(localStorage.getItem("unitask_tasks"))
    if (savedTasks) globalState.tasks = savedTasks
    else {
      globalState.tasks = [
        { id: 1, title: "Complete Math Assignment", course: "Mathematics", dueDate: "2024-06-15", completed: false },
        { id: 2, title: "Read Chapter 5", course: "History", dueDate: "2024-06-10", completed: true },
        { id: 3, title: "Prepare Presentation", course: "Communication", dueDate: "2024-06-20", completed: false },
      ]
      localStorage.setItem("unitask_tasks", JSON.stringify(globalState.tasks))
    }

    const savedCourses = JSON.parse(localStorage.getItem("unitask_courses"))
    if (savedCourses) globalState.courses = savedCourses
    else {
      globalState.courses = [
        { id: 1, name: "Mathematics", code: "MATH101", instructor: "Dr. Smith", color: "#4a6fa5" },
        { id: 2, name: "History", code: "HIST202", instructor: "Prof. Johnson", color: "#66bb6a" },
        { id: 3, name: "Communication", code: "COMM110", instructor: "Dr. Williams", color: "#ef5350" },
      ]
      localStorage.setItem("unitask_courses", JSON.stringify(globalState.courses))
    }

    const currentUser = JSON.parse(localStorage.getItem("unitask_current_user"))
    if (currentUser) globalState.user = currentUser
  } catch (e) {
    console.error("Error initializing state", e)
  }
}

export function addTask(newTask) {
  const taskToAdd = { id: Date.now(), ...newTask, completed: false }
  const updatedTasks = [...globalState.tasks, taskToAdd]
  setGlobalState({ tasks: updatedTasks })
  localStorage.setItem("unitask_tasks", JSON.stringify(updatedTasks))
}

export function toggleTaskComplete(taskId) {
  const updatedTasks = globalState.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  )
  setGlobalState({ tasks: updatedTasks })
  localStorage.setItem("unitask_tasks", JSON.stringify(updatedTasks))
}

export function deleteTask(taskId) {
  const updatedTasks = globalState.tasks.filter((task) => task.id !== taskId)
  setGlobalState({ tasks: updatedTasks })
  localStorage.setItem("unitask_tasks", JSON.stringify(updatedTasks))
}

export function addCourse(newCourse) {
  const courseToAdd = { id: Date.now(), ...newCourse }
  const updatedCourses = [...globalState.courses, courseToAdd]
  setGlobalState({ courses: updatedCourses })
  localStorage.setItem("unitask_courses", JSON.stringify(updatedCourses))
}

export function updateUser(updatedUser) {
  setGlobalState({ user: updatedUser })
  localStorage.setItem("unitask_current_user", JSON.stringify(updatedUser))

  const users = JSON.parse(localStorage.getItem("unitask_users") || "[]")
  const userIndex = users.findIndex((u) => u.id === updatedUser.id)
  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    localStorage.setItem("unitask_users", JSON.stringify(users))
  }
}
