import React, { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "../components/Layout";
import withAuth from "../lib/withAuth";
import databaseFetch from "../lib/databaseFetch";
import useUser from "../hooks/useUser";

import creator from "../components/Creator/creator.module.scss";

function Home() {
  const this_user = useUser();
  const [characterData, setData] = useState();

  useEffect(
    (this_user) => {
      if (this_user) loadData();
    },
    [this_user]
  );

  async function loadData() {
    const data = await databaseFetch({
      model: "characters",
      where: { id: this_user.id },
      action: "findMany",
    });
    setData(data);
  }

  return (
    <Layout>
      <p>Oho, a kogóż to kot przyniósł?</p>
      {characterData ? (
        <p>Witaj serdecznie, {characterData.name}, przyjacielu!</p>
      ) : (
        <div>
          <p>
            Ahh, pamięć już nie ta, lub wzrok za słaby. Chyba się nie znamy,
            prawda? Absolutnie nic nie szkodzi. Tu masz{" "}
            <Link className={creator.creatorLink} href="/creator">
              nasz Kreator Postaci
            </Link>
            .
          </p>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Home);
