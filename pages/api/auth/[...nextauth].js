import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials.email || !credentials.password) {
					throw new Error("Please enter an email and password");
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user) {
					throw new Error("No user found");
				}

				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) {
					throw new Error("Invalid password");
				}

				return user;
			},
		}),
	],
	theme: {
		colorScheme: "light",
	},
};

export default NextAuth(authOptions);
