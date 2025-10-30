'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { CREATE_TASK, GET_TASKS } from '@/graphql'
import styles from './create-task.module.scss'

export function CreateTask() {
  const [title, setTitle] = useState('')
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
    onCompleted: () => {
      setTitle('')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) createTask({ variables: { title: title.trim() } })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite uma nova tarefa..."
        disabled={loading}
        className={styles.input}
        aria-label="Título da nova tarefa"
      />

      <button
        type="submit"
        disabled={loading || !title.trim()}
        className={styles.button}
        aria-label="Criar nova tarefa"
      >
        {loading ? 'Criando...' : 'Criar'}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          Erro ao criar tarefa: {error.message}
        </p>
      )}
    </form>
  )
}
