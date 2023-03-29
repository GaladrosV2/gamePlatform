import withAuth from "../components/withAuth";
import Layout from "../components/Layout";

function Dashboard() {
	return (
		<Layout>
			<h1>Dashboard</h1>
		</Layout>
	);
}

export default withAuth(Dashboard);
