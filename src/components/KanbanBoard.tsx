import { useState } from "react"

/* ---------- Types (local only) ---------- */
type Task = {
  id: string
  title: string
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

/* ---------- Component ---------- */
const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([])

  /* Create a new column */
  const createColumn = () => {
    setColumns(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: `Column ${prev.length + 1}`,
        tasks: []
      }
    ])
  }

  /* Add task to a column */
  const addTask = (columnId: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                { id: crypto.randomUUID(), title: "New Task" }
              ]
            }
          : col
      )
    )
  }

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-start
        gap-6
        overflow-x-auto
        px-[40px]
      "
    >
      {/* Render Columns */}
      {columns.map(column => (
        <div
          key={column.id}
          className="w-[300px] shrink-0 rounded bg-gray-800 p-4 text-white"
        >
          <h2 className="mb-4 text-lg font-semibold">
            {column.title}
          </h2>

          {/* Tasks */}
          <div className="space-y-2">
            {column.tasks.map(task => (
              <div
                key={task.id}
                className="rounded bg-gray-700 p-2 text-sm"
              >
                {task.title}
              </div>
            ))}
          </div>

          {/* Add Task */}
          <button
            className="mt-4 w-full rounded bg-blue-600 py-1 text-sm"
            onClick={() => addTask(column.id)}
          >
            + Add Task
          </button>
        </div>
      ))}

      {/* Add Column */}
      <button
        className="h-[50px] shrink-0 rounded bg-blue-600 px-4 text-white"
        onClick={createColumn}
      >
        + Add Column
      </button>
    </div>
  )
}

export default KanbanBoard
