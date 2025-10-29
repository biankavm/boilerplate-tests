'use client'

import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react'
import { apolloClient } from '@/lib/apollo-client'
import { ReactNode } from 'react'

interface ApolloProviderProps {
  children: ReactNode
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
  )
}
