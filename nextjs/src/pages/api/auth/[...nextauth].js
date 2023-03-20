// dynamic router handler for NextAuth.js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        SpotifyProvider({
            clientId: process.env.SPOT_CLIENT_ID,
            clientSecret: process.env.SPOT_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        }),
    ],

    // use env variable in production
    secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
