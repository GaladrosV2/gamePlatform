import React, { useState, useEffect } from "react";
// import withAuth from "./api/withAuth";
import Layout from "../components/Layout";
import Link from "next/link";
import databaseFetch from "../lib/databaseFetch";
import tavern from "../styles/pages/tavern.module.scss";

const Taverns = () => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    fetchTavernData();
  }, []);

  // useEffect(() => {
  //   console.log(tableData);
  // }, [tableData]);

  async function fetchTavernData() {
    const data = await databaseFetch({
      model: "Taverns",
      action: "findMany",
    });
    setTableData(data);
  }

  return (
    <Layout>
      <div className={tavern.linkContainer}>
        {tableData &&
          tableData.map((table) => (
            <Link key={table.id} href={`/tavern/${tavern.id}`}>
              {table.name}
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export default Taverns;
