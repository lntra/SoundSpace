"use client";

import { usePathname } from "next/navigation";
import { type UUID } from "crypto";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import useSessionData from "~/app/hooks/useSessionData";
import UserCheck from "~/app/_components/atoms/userCheck";

interface User {
  id: UUID;
  email: string;
  name: string;
  url_icon: string;
  url_banner: string;
  description: string;
}

const NewsPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data, isLoading, error } = useSessionData();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.01]">
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-red-500 text-white">
        Error: {error.message}
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.01]">
        <p>No user data available.</p>
      </div>
    );
  }

  const user: User = data.user as unknown as User;

  return (
    <span className="h-screen bg-violet-900 font-['Lato']">
      {id && <UserCheck path={id} user={user} />}
    </span>
  );
};

export default NewsPage;
