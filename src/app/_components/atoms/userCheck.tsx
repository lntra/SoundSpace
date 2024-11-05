import { type UUID } from "crypto";
import PageLayout from "../organisms/pagelayout";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

interface User {
  id: UUID;
  email: string;
  name: string;
  url_icon: string;
  url_banner: string;
  description: string;
}

interface UserCheckProps {
  path: string;
  user: {
    id: UUID;
    email?: string;
    name: string;
    url_icon: string;
    url_banner: string;
    description: string;
  };
}

const UserCheck = ({ path, user }: UserCheckProps) => {
  const [exportedUser, setExportedUser] = useState(user);

  const { data, isLoading, error } = api.user.getOtherUsers.useQuery({
    id: path,
  });

  useEffect(() => {
    if (data?.user && data.user.id !== user.id) {
      setExportedUser(data.user as User);
    }
  }, [data, user.id]);

  return (
    <>
      <PageLayout session={user} user={exportedUser} />
    </>
  );
};

export default UserCheck;
