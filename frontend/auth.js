import { getToken, currentUser } from './app/client/api_actions';
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                let accessToken = null;

                try {
                    let { access_token } = await getToken(credentials.email, credentials.password);
                    accessToken = access_token;
                }
                catch (error) {
                    throw new Error(`Invalid credentials. ${error}`);
                }

                if (!accessToken) {
                    throw new Error("Access token not found.");
                }

                try {
                    user = await currentUser(accessToken);
                }
                catch (error) {
                    throw new Error("User not found.");
                }

                user = {
                    ...user,
                    accessToken,
                };

                return { ...credentials, ...user, accessToken };
            },
        }),
    ],
    trustHost: true,
    callbacks: {
        jwt({token, user}){
            if (user) {
                token.accessToken = user.accessToken;
                token.fullName = user.full_name;
                token.imageUrl = user.image_url;
            }
            return token;
        },
        session({session, token}){
            session.accessToken = token.accessToken;
            session.user.fullName = token.fullName;
            session.user.imageUrl = token.imageUrl;
            return session;
        },
        redirect({url, baseUrl}){
            return baseUrl;
        }
    },
    pages: {
        signIn: '/auth/login',
    },
})

