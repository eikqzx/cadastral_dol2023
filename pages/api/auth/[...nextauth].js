import { loginByUsername } from '@/service/adm/login';
import axios from 'axios';
import dayjs from 'dayjs';
import buddhistEra from "dayjs/plugin/buddhistEra";
import { thdate } from "dayjs/locale/th"
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
dayjs.extend(buddhistEra);
dayjs.locale(thdate)

export const authOptions = {
    session: {
        strategy:'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            id:"credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                // console.log(credentials, "credentials");
                // console.log(req, "req");
                let url = `${process.env.hostAPI}/ADM_/userListLoginByUsername`
                let res = await axios.post(url, credentials)
                let data = res.data
                // Add logic here to look up the user from the credentials supplied
                const user = data
                if (user.rows.length > 0) {
                    user.rows[0].LOGIN_DTM_ISO = dayjs().toISOString();
                    user.rows[0].LOGIN_DTM = dayjs().locale('th').format("DD MMMM BBBB HH:mm:ss");
                    // Any object returned will be saved in `user` property of the JWT
                    return user.rows[0]
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    secret: process.env.privateKey,
    pages: {
        signIn: '/login'
    }
    ,
    callbacks: {
        async jwt({ token ,user }) {
            // console.log(account,"account");
            // console.log(token,"token");
            // console.log(user,"user");
            // Persist the OAuth access_token to the token right after signin
            return {...token,...user}
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token
            return session
        }
    },
}

export default NextAuth(authOptions)