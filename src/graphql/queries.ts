import { gql } from '@apollo/client'

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
      createdAt
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      createdAt
    }
  }
`
