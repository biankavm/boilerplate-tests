export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface GetTasksData {
  tasks: Task[]
}

export interface GetUserData {
  user: User | null
}

export interface GetUserVariables {
  id: string
}
