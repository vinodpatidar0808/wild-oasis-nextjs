
import NextAuth from "next-auth";
import Google from 'next-auth/providers/google';


const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ]
}

// NOTE: you can call this auth function in any server component. This handlers you need to import in a route handler and then export from their if you want to do custom validation etc. Refer --> api/auth folder.
export const { auth, handlers: { GET, POST } } = NextAuth(config)