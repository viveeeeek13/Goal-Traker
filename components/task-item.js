"use client"


export default function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`} className="checkbox-label"></label>
        </div>

        <div className="task-details">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className="task-course">{task.course}</span>
            <span className="task-due-date">Due: {formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>

      <button className="delete-button" onClick={() => onDeleteTask(task.id)} aria-label="Delete goal">
        ×
      </button>
    </div>
  )
}
