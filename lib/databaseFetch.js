async function databaseFetch({ model, action, ...queryParameters }) {
	const response = await fetch("/api/database", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ model, action, ...queryParameters }),
	});

	return await response.json();
}

export default databaseFetch;
