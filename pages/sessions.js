import React, { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "../components/Layout";
import withAuth from "../lib/withAuth";
import databaseFetch from "../lib/databaseFetch";
import useUser from "../hooks/useUser";

function Sessions() {
  const this_user = useUser();

  return (
    <Layout>
      <input></input>
    </Layout>
  );
}
export default withAuth(Sessions);
