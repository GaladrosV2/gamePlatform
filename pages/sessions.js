import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Table } from "antd";
import Layout from "../components/Layout";
import withAuth from "../lib/withAuth";
import databaseFetch from "../lib/databaseFetch";
import useUser from "../hooks/useUser";

function Sessions() {
  const this_user = useUser();
  const dataSource = [{ key: "1", name: "bob", age: 32 }];
  const columns = [{ title: 1, dataIndex: 2 }];
  return (
    <Layout>
      <Table dataSource={dataSource} columns={columns}></Table>
    </Layout>
  );
}
export default withAuth(Sessions);
