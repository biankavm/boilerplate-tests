import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ApolloProvider } from '@/components/providers/apollo-provider'
import './globals.scss'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Tasks Demo',
  description: 'Aplicação de tarefas com Next.js e Apollo Client'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}
