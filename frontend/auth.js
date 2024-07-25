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

                console.log(credentials.email);

                try {
                    let {access_token} = await getToken(credentials.email, credentials.password);
                    accessToken = access_token;
                }
                catch (error) {
                    // console.log(error);
                    throw new Error("Invalid credentials.");
                    return null;
                }

                if(!accessToken) {
                    throw new Error("Access token not found.");
                    return null;
                }

                try {
                    user = await currentUser(accessToken);
                }
                catch (error) {
                    // console.log(error);
                    // throw new Error("User not found.");
                    return null;
                }

                console.log(user);

                return user
            },
        }),
    ],
})

