import { Task } from '@/types/graphql'

export type TaskDTO = Omit<Task, 'id'>
