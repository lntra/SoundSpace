"use client";

import useSessionData from "~/app/hooks/useSessionData";
import NavigationBar from "../../_components/organisms/navigationBar";

import NewsArea from "~/app/_components/organisms/newsArea";
import { useEffect, useState } from "react";
import { type UUID } from "crypto";
import { useRouter } from "next/navigation";
import LogoHD from "~/app/_components/assets/RAIOHD.png";
import { api } from "~/trpc/react";
import useDarkMode from "~/app/hooks/useDarkMode";

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


interface Notifications {
  content: string;
  user?: string;
  postId?: UUID;
  img?: string;
  seen?: boolean;
  created_at: Date;
}

export default function HomePage() {
  const router = useRouter();

  const { data, isLoading, error } = useSessionData();

  const mutation = api.user.edit.useMutation();

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== "undefined" && data?.user?.id) {
      const sessionId = localStorage.getItem("sessionID");

      if (sessionId && sessionId !== data.user.id) {
        localStorage.clear();
        localStorage.setItem("sessionID", data.user.id as string);
        router.refresh();
        router.replace("/pages/home");
      }

      if (sessionId && sessionId === data.user.id) {
        const description = localStorage.getItem("description");
        const url_banner = localStorage.getItem("bannerImage");
        const url_icon = localStorage.getItem("profileImage");

        const setUrl_icon = url_icon ? "set" : "unset";
        const setUrl_banner = url_banner ? "set" : "unset";
        const setDescription = description ? "set" : "unset";

        const resultFunc = async () => {
          try {
            const result = await mutation.mutateAsync({
              id: data.user.id as string,
              name: data.user.name as string,
              email: data.user.email as string,
              url_icon: setUrl_icon,
              url_banner: setUrl_banner,
              description: setDescription,
            });

            const token = result.token;

                        if (result.token) {
              document.cookie = `auth_token=${token}; path=/`;
            }
          } catch (e) {
            console.log(e);
          }
        };

        resultFunc();

        localStorage.setItem("sessionID", data.user.id);
      }

      if (!sessionId && data.user.id) {
        localStorage.setItem("sessionID", data.user.id as string);
      }
    }
  }, [data]);

  const welcomeNotification: Notifications = {
    content:
      "Welcome to SoundSpace! Check our communities to get to know our space!",
    seen: false,
    img: `${LogoHD.src}`,
    created_at: new Date(),
  };

  useEffect(() => {
    const checkIfNotification = localStorage.getItem("userNotifications");

    if (checkIfNotification === null || checkIfNotification == "[]") {
      const notificationsSet = [welcomeNotification];
      localStorage.setItem(
        "userNotifications",
        JSON.stringify(notificationsSet),
      );
    }
  }, []);

  return (
    <>
      <main
        className={`${
          dark ? "bg-gray-900 text-white" : "bg-sp-greyish text-white"
        }`}
      >
        <div
          className={`lato-font ${
            dark ? "bg-gray-900 text-white" : "bg-sp-greyish text-white"
          }`}
        >
          <NavigationBar dark={dark}></NavigationBar>
          <NewsArea dark={dark}></NewsArea>
        </div>
      </main>
    </>
  );
}
