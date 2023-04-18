import withAuth from "../components/withAuth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import databaseFetch from "../lib/databaseFetch";

import Layout from "../components/Layout/index";
import Tavern from "../components/Tavern/Tavern";

const TavernList = () => {
  const [taverns, setTaverns] = useState();
  const router = useRouter();
  const { tavern } = router.query;

  useEffect(() => {
    if (tavern) {
      fetchTavernData();
    }
  }, [tavern]);

  async function fetchTavernData() {
    const data = await databaseFetch({
      model: "Taverns",
      action: "findOne",
      query: { id: tavern },
    });
    setTaverns(data);
  }

  return (
    <Layout>
      {taverns ? <Tavern tavern={taverns} /> : <div>Loading...</div>}
    </Layout>
  );
};
export default withAuth(TavernList);
