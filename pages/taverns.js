import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import withAuth from "../components/withAuth";
import databaseFetch from "../lib/databaseFetch";
import tavern from "../styles/pages/tavern.module.scss";

const Taverns = () => {
  const [tableData, setTableData] = useState();
  useEffect(() => {
    fetchTavernData();
    console.log(tableData);
  }, []);

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
            <Link key={table.id} href={`./taverns/${table.id}`}>
              {table.name}
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export default withAuth(Taverns);
