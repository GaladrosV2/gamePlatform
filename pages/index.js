import Layout from "../components/Layout";
import withAuth from "../components/withAuth";

function Home() {
	return (
		<Layout>
			<h1>Home</h1>
			<p>
				<strong>test</strong>
			</p>
		</Layout>
	);
}

export default withAuth(Home);
