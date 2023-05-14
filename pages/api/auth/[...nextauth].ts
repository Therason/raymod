import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // idk why this error is popping up
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/userAuth",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // this is not secure... oh well :]
        if (!credentials) throw new Error('no credentials provided')
        if (credentials.username !== process.env.AUTH_USERNAME || credentials.password !== process.env.AUTH_PASSWORD) {
          throw new Error('invalid credentials')
        }

        return { username: 'ray', id: 'raymod' }
      }
    })
  ]
}

export default NextAuth(authOptions)