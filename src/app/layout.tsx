import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ApolloProvider } from '@/providers'
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
  title: 'My TodoList',
  description:
    'Uma aplicação para você gerenciar suas tarefas de forma simples e eficiente!'
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
