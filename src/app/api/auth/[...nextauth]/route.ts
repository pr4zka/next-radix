import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/libs/prisma"
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: { label: "email", type: "email" },
            password: {  label: "Password", type: "password" }
        },
         async authorize(credentials :any, req){
          const {email, password} = credentials
          const userFound = await prisma.user.findUnique({
             where: {email}
          })
          if(!userFound) throw new Error('User not found')
          const validPassword = await bcrypt.compare(password, userFound.password)
          if(!validPassword) throw new Error('Password incorrect')

            return {
              id: userFound.id + '',
              email: userFound.email,
              name: userFound.name  
            }
         }
    })
  ],
  callbacks:  {
    async jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token
    },
    async session({session, token}){
        if(token){
          session.user.id = token.sub as string
        }
        return session
      
    }
  },
  pages: {
    signIn: '/auth/login',
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }