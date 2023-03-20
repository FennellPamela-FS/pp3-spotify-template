// dynamic router handler for NextAuth.js
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";


export const authOptions = {
    // use env variable in production
    secret: process.env.SECRET,
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOT_CLIENT_ID,
            clientSecret: process.env.SPOT_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            return user;
            // console.log(user)
        },
        async jwt(token, user) {
            // Persist the token right after signin
            if (account) {
                token.accessToken = account.accessToken;
            }
            return token;
            // return user;
            // console.log(user)
            // console.log(token)
        },
        async session({ session, token }) {
            // send accessToken from provider to the client
            session.accessToken = token.accessToken;
            return session;
            // console.log(session)
            // console.log(token)
        },
    },
}

export default NextAuth(authOptions)