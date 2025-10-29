'use client'

import { useQuery } from '@apollo/client/react'
import { GET_TASKS } from '@/graphql'
import { GetTasksData } from '@/types/graphql'
import { TaskItem } from '@/components/tasks'
import { CreateTask } from '@/components/tasks'
import styles from './task-list.module.scss'

export function TaskList() {
  const { data, loading, error } = useQuery<GetTasksData>(GET_TASKS)

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Minhas Tarefas</h1>
        <CreateTask />
        <div
          className={styles.loading}
          role="status"
          aria-label="Carregando tarefas"
        >
          <p>Carregando tarefas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Minhas Tarefas</h1>
        <CreateTask />
        <div className={styles.error} role="alert">
          <p>Erro ao carregar tarefas: {error.message}</p>
        </div>
      </div>
    )
  }

  const tasks = data?.tasks || []

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minhas Tarefas</h1>
      <CreateTask />
      {tasks.length === 0 ? (
        <div className={styles.empty} role="status">
          <p>Nenhuma tarefa cadastrada ainda.</p>
          <p className={styles.emptySubtitle}>
            Comece criando sua primeira tarefa acima!
          </p>
        </div>
      ) : (
        <div className={styles.list} role="list">
          {tasks.map(
            (task: { id: string; title: string; completed: boolean }) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                completed={task.completed}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}
