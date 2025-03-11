import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { SessionProvider } from '@/app/providers/SessionProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import Navigation from '@/app/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromptVault - Gerencie seus prompts de IA',
  description: 'Organize, gerencie e compartilhe seus prompts de IA',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900">
              {session && <Navigation />}
              <main className={session ? 'lg:pl-64' : ''}>
                {children}
              </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
