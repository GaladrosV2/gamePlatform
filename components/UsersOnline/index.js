import { useEffect, useState } from "react";
import databaseFetch from "../../lib/databaseFetch";

const UsersOnline = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    async function lastActive() {
      const data = await databaseFetch({
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
      });
      setActiveUsers(data);
    }
    lastActive();
  }, []);

  return (
    <div>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id}>
            {user.name || user.email} - Ostatnio aktywny: <br />
            {new Date(user.lastActive).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersOnline;
