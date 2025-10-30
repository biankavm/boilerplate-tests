'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_USER } from '@/graphql'
import { GetUserData, GetUserVariables } from '@/types/graphql'
import styles from './page.module.scss'

function ProfilePage() {
  const [userId, setUserId] = useState('1')
  const { data, loading, error } = useQuery<GetUserData, GetUserVariables>(
    GET_USER,
    {
      variables: { id: userId },
      skip: !userId
    }
  )

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Perfil do Usuário</h1>

        <div className={styles.search}>
          <label htmlFor="userId" className={styles.label}>
            ID do Usuário:
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Digite o ID do usuário"
            className={styles.input}
          />
        </div>

        {loading && (
          <div
            className={styles.loading}
            role="status"
            aria-label="Carregando perfil"
          >
            <p>Carregando perfil...</p>
          </div>
        )}

        {error && (
          <div className={styles.error} role="alert">
            <p>Erro ao carregar perfil: {error.message}</p>
          </div>
        )}

        {data?.user && (
          <div className={styles.profile}>
            <h2 className={styles.profileName}>{data.user.name}</h2>
            <div className={styles.profileInfo}>
              <p>
                <strong>Email:</strong> {data.user.email}
              </p>
              <p>
                <strong>ID:</strong> {data.user.id}
              </p>
              <p>
                <strong>Criado em:</strong>{' '}
                {new Date(data.user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && !data?.user && userId && (
          <div className={styles.empty} role="status">
            <p>Usuário não encontrado.</p>
          </div>
        )}
      </div>
    </>
  )
}
export default ProfilePage
