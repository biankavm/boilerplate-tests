'use client'

import { useMutation } from '@apollo/client/react'
import { DELETE_TASK, TOGGLE_TASK, GET_TASKS } from '@/graphql'
import styles from './task-item.module.scss'

interface TaskItemProps {
  id: string
  title: string
  completed: boolean
}

export function TaskItem({ id, title, completed }: TaskItemProps) {
  const [toggleTask, { loading: toggleLoading }] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{ query: GET_TASKS }]
  })

  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }]
  })

  const handleToggle = () => {
    toggleTask({ variables: { id } })
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask({ variables: { id } })
    }
  }

  const isLoading = toggleLoading || deleteLoading

  return (
    <div className={styles.taskItem}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
        disabled={isLoading}
        aria-label={`Marcar tarefa "${title}" como ${completed ? 'não concluída' : 'concluída'}`}
      />

      <span className={completed ? styles.completed : ''}>{title}</span>

      <button
        onClick={handleDelete}
        disabled={isLoading}
        aria-label={`Excluir tarefa "${title}"`}
        className={styles.deleteButton}
        title="Excluir tarefa"
      >
        ×
      </button>
    </div>
  )
}
