import { NextRequest, NextResponse } from 'next/server'

let tasks = [
  {
    id: '1',
    title: 'Tarefa exemplo 1',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Tarefa exemplo 2',
    completed: true,
    createdAt: new Date().toISOString()
  }
]

let users = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    createdAt: new Date().toISOString()
  }
]

function executeGraphQL(query: string, variables: Record<string, unknown>) {
  // GET_TASKS
  if (query.includes('query GetTasks')) {
    return {
      data: {
        tasks
      }
    }
  }

  // GET_USER
  if (query.includes('query GetUser')) {
    const user = users.find((u) => u.id === variables.id)
    return {
      data: {
        user: user || null
      }
    }
  }

  // CREATE_TASK
  if (query.includes('mutation CreateTask')) {
    const title = typeof variables.title === 'string' ? variables.title : ''
    const newTask = {
      id: String(tasks.length + 1),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return {
      data: {
        createTask: newTask
      }
    }
  }

  // TOGGLE_TASK
  if (query.includes('mutation ToggleTask')) {
    const task = tasks.find((t) => t.id === variables.id)
    if (task) {
      task.completed = !task.completed
      return {
        data: {
          toggleTask: {
            id: task.id,
            completed: task.completed
          }
        }
      }
    }
    return {
      errors: [{ message: 'Task not found' }]
    }
  }

  // DELETE_TASK
  if (query.includes('mutation DeleteTask')) {
    const index = tasks.findIndex((t) => t.id === variables.id)
    if (index !== -1) {
      tasks.splice(index, 1)
      return {
        data: {
          deleteTask: {
            id: variables.id
          }
        }
      }
    }
    return {
      errors: [{ message: 'Task not found' }]
    }
  }

  return {
    errors: [{ message: 'Unknown query or mutation' }]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, variables } = body

    const result = executeGraphQL(query, variables || {})

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      {
        errors: [{ message: 'Invalid request' }]
      },
      { status: 400 }
    )
  }
}
