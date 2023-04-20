import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import databaseFetch from "../lib/databaseFetch";

const useUser = () => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const getUser = async () => {
      if (session?.user?.email) {
        const userData = await databaseFetch({
          model: "User",
          action: "findUnique",
          where: {
            email: session.user.email,
          },
        });

        setUser(userData);
      }
    };

    getUser();
  }, [session]);

  return user;
};

export default useUser;
