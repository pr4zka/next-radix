import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'credentials',
          credentials: {
              username: { label: "username", type: "text"},
              password: {  label: "Password", type: "password" }
          },
           async authorize(credentials : any, req){
            const { username, password } = credentials;
            try {
              const response = await axios.post('https://billetera.z1.mastarjeta.net/auth-token/', { username, password });
              const data = response.data;
              if (data.token) {
                return {
                  ...data,
                  accessToken: data.token 
                };
              } else {
                throw new Error('Invalid credentials');
              }
            } catch (error: any) {
              throw new Error('Invalid credentials');
            }
           }
      })
    ],
    callbacks:  {
      async jwt({ token }){
        if(token){
          token.accessToken = token.accessToken
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