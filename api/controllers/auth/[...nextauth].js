// dynamic router handler for NextAuth.js
// import { NextAuth } from "../../../nextjs/.next/server/lib/NextAuth";
// import SpotifyProvider from "next-auth/providers/spotify";

const NextAuth = require("next-auth");
// const Providers = require("next-auth/providers");
const SpotifyProvider = require("next-auth/providers/spotify");
// const GoogleProvider = require("next-auth/providers/google");
// const GithubProvider = require("next-auth/providers/github");


export const authOptions = {
    // use env variable in production
    secret: process.env.CLIENT_SECRET,
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        }),
    ],
    session: {
        jwt: true,
        // 30 days * 24 hours * 60 minutes * 60 seconds * 10
        maxAge: 30 * 24 * 60 * 60
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async session({ session, user, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id

            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        }
    },
}

export default NextAuth(authOptions)