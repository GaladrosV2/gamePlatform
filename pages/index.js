import Layout from "../components/Layout";
import withAuth from "../components/withAuth";

function Home() {
  return <Layout>content</Layout>;
}

export default withAuth(Home);
