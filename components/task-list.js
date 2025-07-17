import TaskItem from "./task-item"

export default function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="task-list-container">
      <h2>Your Goals</h2>
      <h3>Active Goals ({pendingTasks.length})</h3>
      <div className="task-list">
        {pendingTasks.length === 0 ? (
          <p className="empty-message">No active goals. Great job!</p>
        ) : (
          pendingTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />
          ))
        )}
      </div>
      <h3>Completed Goals ({completedTasks.length})</h3>
      <div className="task-list completed-list">
        {completedTasks.length === 0 ? (
          <p className="empty-message">No completed goals yet.</p>
        ) : (
          completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDeleteTask={onDeleteTask} />
          ))
        )}
      </div>
    </div>
  )
}
