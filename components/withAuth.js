import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const { data, status } = useSession();
		const router = useRouter();

		// Show a loading state while the session is being fetched
		if (status === "loading") {
			return <div>Loading...</div>;
		}

		// If no session exists, redirect to the login page
		if (status === "unauthenticated") {
			if (router) {
				router.replace("/login");
			}
			return null;
		}

		// If a session exists, render the wrapped component
		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
