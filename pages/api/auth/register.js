import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { name, email, password } = req.body;

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		res.status(201).json({ message: "User created successfully", user: newUser });
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
