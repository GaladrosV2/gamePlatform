import React, { useState, useEffect } from "react";
// import withAuth from "./api/withAuth";
import Layout from "../components/Layout";
import Link from "next/link";
import prisma from "./../lib/prisma";
import tavern from "../styles/pages/tavern.module.scss";

const Karczmy = () => {
  const [tableData, setTableData] = useState([]);
  console.log(prisma);

  useEffect(() => {
    fetchTavernData();
  }, []);

  async function fetchTavernData() {
    try {
      const data = await prisma.Taverns.findMany;

      setTableData(data);
    } catch (error) {
      console.error(error);
    }
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
