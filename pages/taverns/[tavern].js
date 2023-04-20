import withAuth from "../../components/withAuth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import databaseFetch from "../../lib/databaseFetch";

import Layout from "../../components/Layout/index";
import Tavern from "../../components/Tavern/Tavern";

const TavernList = () => {
  const [inn, setInn] = useState();
  const router = useRouter();
  const { tavern } = router.query;

  useEffect(() => {
    fetchTavernData();
  }, [tavern]);

  async function fetchTavernData() {
    const data = await databaseFetch({
      model: "Taverns",
      action: "findUnique",
      where: {
        id: Number(tavern),
      },
    });
    setInn(data);
  }

  return (
    <Layout>{inn ? <Tavern tavernData={inn} /> : <div>Loading...</div>}</Layout>
  );
};
export default withAuth(TavernList);
