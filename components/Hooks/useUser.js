import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

const useUser = () => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const getUser = async () => {
      if (session?.user?.email) {
        const userData = await prisma.user.findUnique({
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
