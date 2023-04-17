import React, { useState, useEffect } from "react";
// import withAuth from "./api/withAuth";
import Layout from "../components/Layout";
import Link from "next/link";
import prisma from "./../lib/prisma";
import tavern from "../styles/pages/tavern.module.scss";
import databaseFetch from "../lib/databaseFetch";

const Karczmy = () => {
  const [tableData, setTableData] = useState([]);
  // console.log(prisma);

  useEffect(() => {
    fetchTavernData();
  }, []);

  async function fetchTavernData() {
    const data = await databaseFetch({
      model: "Taverns",
      action: "findUnique",
    });
    setTableData(data);
    console.log(tableData);
  }

  return (
    <Layout>
      <div className={tavern.linkContainer}>
        <ul>
          {tableData.map((tavern) => (
            <li key={tavern.TavernId}>
              <Link href={`/tavern/${tavern.TavernId}`}>{tavern.TavernId}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Karczmy;
