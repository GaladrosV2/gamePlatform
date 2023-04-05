import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { method, body } = req;

	if (method !== "POST") {
		res.setHeader("Allow", "POST");
		res.status(405).end(`Method ${method} Not Allowed`);
		return;
	}

	const { action, model, ...queryParameters } = body;

	try {
		if (!prisma[model]) {
			res.status(400).json({ error: `Invalid model: ${model}` });
			return;
		}

		if (!prisma[model][action]) {
			res.status(400).json({ error: `Invalid action: ${action}` });
			return;
		}

		const result = await prisma[model][action](queryParameters);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
