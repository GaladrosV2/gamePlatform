import { useEffect, useState } from "react";
import databaseFetch from "../../lib/databaseFetch";
import Layout from "../Layout";

const UsersOnline = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    async function lastActive() {
      const data = await databaseFetch(
        {
          model: "User",
          action: "findMany",
          where: {
            lastActive: { gt: new Date(Date.now() - 1000 * 60 * 30) },
          },
          select: {
            id: true,
            email: true,
            name: true,
            lastActive: true,
          },
        },
        setActiveUsers(data)
      );
    }

    lastActive();
  }, []);

  return (
    <Layout>
      <div>
        <ul>
          {activeUsers.map((user) => (
            <li key={user.id}>
              {user.name || user.email} - Ostatnio aktywny:
              {new Date(user.lastActive)}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default UsersOnline;
