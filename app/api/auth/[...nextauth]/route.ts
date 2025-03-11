import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/app/lib/db'

async function getUser(email: string) {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

async function createUser(email: string, name: string, image?: string) {
  const result = await db.query(
    `INSERT INTO users (
      email,
      name,
      image,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING *`,
    [email, name, image]
  )

  // Criar configurações padrão
  await db.query(
    `INSERT INTO user_settings (
      user_id,
      theme,
      language,
      notifications,
      default_model,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
    [result.rows[0].id, 'system', 'pt', true, 'gpt-3.5-turbo']
  )

  // Criar limites de uso
  await db.query(
    `INSERT INTO usage_limits (
      user_id,
      prompt_limit,
      image_limit,
      prompts_used,
      images_used,
      reset_date,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
    [result.rows[0].id, 100, 50, 0, 0, new Date()]
  )

  return result.rows[0]
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false
      }

      try {
        // Se for login com Google
        if (account?.provider === 'google') {
          let dbUser = await getUser(user.email)

          if (!dbUser) {
            dbUser = await createUser(
              user.email,
              user.name || user.email,
              user.image || undefined
            )
          }
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          const user = await getUser(session.user.email)
          if (user) {
            session.user.id = user.id
          }
        } catch (error) {
          console.error('Error in session callback:', error)
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    newUser: '/auth/signup',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
