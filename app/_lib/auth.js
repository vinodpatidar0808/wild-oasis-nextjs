
import NextAuth from "next-auth";
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from "./data-service";


const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      return !!auth?.user
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email)

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name })
        }
        return true
      } catch (error) {
        return false
      }
    },
    async session({ session }) {
      // we need guestid at many places in our app, one way to get this session id is call getGuest everywhere you need the guestId or add guestId in session itself.
      const guest = await getGuest(session.user.email)
      session.user.guestId = guest.id
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
}

// NOTE: you can call this auth function in any server component. This handlers you need to import in a route handler and then export from their if you want to do custom validation etc. Refer --> api/auth folder.
export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config)