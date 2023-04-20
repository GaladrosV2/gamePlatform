import withAuth from "../../components/withAuth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import databaseFetch from "../../lib/databaseFetch";

import Layout from "../../components/Layout/index";
import Tavern from "../../components/Tavern/Tavern";

const TavernList = () => {
  const [inn, setInn] = useState();
  const router = useRouter();
  const { tavernRouter } = router.query;

  useEffect(() => {
    fetchTavernData();
  }, [tavernRouter]);

  async function fetchTavernData() {
    const data = await databaseFetch({
      model: "Taverns",
      action: "findMany",
    });
    setInn(data);
  }

  console.log(inn);
  console.log(tavernRouter);

  return (
    <Layout>
      {inn ? <Tavern tavernID={tavernRouter} /> : <div>Loading...</div>}
    </Layout>
  );
};
export default withAuth(TavernList);
