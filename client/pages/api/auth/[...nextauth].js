import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { firebaseAuth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// For a detailed explanation: https://next-auth.js.org/configuration/providers/credentials
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Firebase Email/Password login',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
          const { user } = response;
          return {
            email: user.email,
            id: user.id
          };
        } catch(error) {
          console.error('Got authorize error: ', error);
          return null;
        }
      }
    })
  ]
});