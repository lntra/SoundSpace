import { type UUID } from "crypto";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DropdownMinProps {
  link: string;
}

interface Notifications {
  content: string;
  user?: string;
  postId?: UUID;
  img?: string;
  seen?: boolean;
  created_at?: Date;
}

const getNotifications = (): Notifications[] => {
  const storedNotificaitons = localStorage.getItem("userNotifications");
  return storedNotificaitons ? JSON.parse(storedNotificaitons) : [];
};

const DropdownMin = ({ link }: DropdownMinProps) => {
  const [notifications, setNotifications] = useState<Notifications[]>(() =>
    getNotifications(),
  );

  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true);

  useEffect(() => {
    if (!notifications) {
      return;
    }
    setHasUnseenNotifications(
      notifications.some((notification) => notification.seen === false),
    );
  }, [notifications]);

  const handleClickNotification = () => {
    setNavNotification(!navNotification);

    const updatedNotifications = notifications.map((notification) =>
      notification.seen ? notification : { ...notification, seen: true },
    );

    setNotifications(updatedNotifications);

    localStorage.setItem(
      "userNotifications",
      JSON.stringify(updatedNotifications),
    );
  };

  const [navNotification, setNavNotification] = useState(false);
  const dropdownStateNotification = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={dropdownStateNotification}
        className={
          navNotification
            ? "fixed left-[25vw] top-[153px] z-[100] hidden h-[660px] w-[75%] overflow-hidden rounded-3xl border-x-[1px] border-y-[1px] border-l-[1px] border-sp-accent border-l-sp-accent bg-sp-purple p-3 px-3 duration-300 sm:left-[86px] sm:w-[300px] sm:rounded-l-none  sm:rounded-r-3xl sm:border-y-[1px] sm:border-r-[1px] sm:border-l-[#432d65] lg:block "
            : "fixed left-[-100%] top-[153px] z-[200] hidden h-[660px] w-[300px] bg-sp-purple duration-300 lg:block"
        }
      >
        <div className="h-full overflow-y-auto pr-2">
          {notifications &&
            notifications.map((notification, index) => (
              <>
                <Link
                  key={index}
                  href={`/pages/community/display`}
                  className="flex items-center justify-center gap-2 border-b-[1px] border-sp-accent p-5 hover:cursor-pointer hover:bg-[#432d65]"
                >
                  <img className="h-8 w-8" src={`${notification.img}`} alt="" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-white">
                      {notification.content}
                    </p>
                    <p className="text-xs font-bold text-gray-300">
                      {dayjs(notification.created_at).fromNow()}
                    </p>
                  </div>
                </Link>
              </>
            ))}
        </div>
      </div>
      <span className="grid-rows-12 hidden h-[100vh] lg:grid">
        <span className="row-start-1 row-end-2 border-r-[3px] border-solid border-sp-purpleBright2"></span>
        <span
          className="row-start-2 row-end-3 flex w-[100%] flex-wrap items-center justify-center 
                    border-r-[3px] border-solid border-sp-purpleBright2
                    hover:border-r-[3px] hover:border-sp-accent
                    "
        >
          <Link className="w-[100%]" href="/pages/community" prefetch={false}>
            <div className="flex flex-wrap justify-center ">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.3 12.7998C8.9 12.7998 8.4 12.5998 8.4 12.1998C8.4 11.7998 8.9 11.8998 9.3 11.1998C9.3 11.1998 11.1 6.2998 7.5 6.2998C3.9 6.2998 5.7 11.1998 5.7 11.1998C6.1 11.8998 6.6 11.7998 6.6 12.1998C6.6 12.5998 6.1 12.7998 5.7 12.7998C5.1 12.8998 4.6 12.7998 4 13.3998V19.0998H9C9.2 17.3998 9.7 13.8998 10.1 12.9998L10.2 12.8998C10 12.7998 9.7 12.7998 9.3 12.7998Z"
                  fill="white"
                />
                <path
                  d="M20 12.6C19.3 11.8 18.7 11.9 18 11.8C17.5 11.7 16.9 11.6 16.9 11.1C16.9 10.6 17.5 10.8 18 9.9C18 9.9 20.1 4 15.8 4C11.4 4.1 13.5 10 13.5 10C14 10.8 14.6 10.7 14.6 11.1C14.6 11.6 14 11.7 13.5 11.8C12.6 11.9 11.8 11.8 11 13.3C10.6 14.2 10 19.1 10 19.1H20V12.6Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
        </span>
        <span
          onClick={handleClickNotification}
          className="row-start-3 row-end-4 flex w-[100%] cursor-pointer flex-wrap items-center justify-center
                    border-r-[3px] border-solid border-sp-purpleBright2
                    hover:border-r-[3px] hover:border-sp-accent
                    "
        >
          <div className="flex w-[100%] flex-wrap justify-center ">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99978 18H13.9998C13.9998 18 14.0998 20 11.9998 20C9.89978 20 9.99978 18 9.99978 18Z"
                fill="white"
              />
              <path
                d="M16.7 15.4C16.2 15.2 16 14.7 16 14.2V9C16 9 15.8 6.6 13 6.1V5C13 5 13.1 4 12 4C10.9 4 11 5 11 5V6.1C8.2 6.6 8 9 8 9V14.2C8 14.7 7.7 15.2 7.3 15.4L6 16V17H18V16L16.7 15.4ZM10 8.8V16H8C8.8 16 9 15 9 15V9C9 9 9 8.2 9.7 7.6C10.4 6.9 11 7 11 7C11 7 10 7.7 10 8.8Z"
                fill="white"
              />
            </svg>
          </div>
        </span>
        <span
          className="
                    row-start-4 row-end-5 flex
                    w-[100%] flex-wrap
                    items-center justify-center border-r-[3px] border-solid border-sp-purpleBright2 hover:border-r-[3px] hover:border-sp-accent"
        >
          <Link className="w-[100%]" href="/pages/home" prefetch={false}>
            <div className="flex flex-wrap justify-center ">
              <svg
                width="36"
                height="36"
                viewBox="0 0 14 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8387 10.3306L6.91943 23.9997V10.3306H13.8387Z"
                  fill="white"
                />
                <path
                  d="M0.000161648 13.6689L6.91944 -0.000175476L6.91943 13.6689L0.000161648 13.6689Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
        </span>
        <span
          className="
                    row-start-5 row-end-6 flex
                    w-[100%] flex-wrap
                    items-center justify-center border-r-[3px] border-solid border-sp-purpleBright2 hover:border-r-[3px] hover:border-sp-accent"
        >
          <Link className="w-[100%]" href={`/pages/profile/${link}/`}>
            <div className="flex flex-wrap justify-center ">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9 4C6.3 4 9 11.3 9 11.3C9.6 12.3 10.4 12.1 10.4 12.8C10.4 13.4 9.7 13.6 9 13.7C7.9 13.7 6.9 13.5 5.9 15.3C5.3 16.4 5 20 5 20H18.7C18.7 20 18.4 16.4 17.9 15.3C16.9 13.4 15.9 13.7 14.8 13.6C14.1 13.5 13.4 13.3 13.4 12.7C13.4 12.1 14.2 12.3 14.8 11.2C14.8 11.3 17.5 4 11.9 4V4Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
        </span>
        <span className="row-end-12 row-start-6 border-r-[3px] border-solid border-sp-purpleBright2"></span>
        <span
          className="
                    flex w-[100%] flex-wrap
                    items-center justify-center border-r-[3px] border-solid border-sp-purpleBright2"
        >
          <Link
            className="w-[100%] self-end justify-self-end"
            href="/pages/login"
            prefetch={false}
          >
            <div className="flex flex-wrap items-center justify-center py-5">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 15H24.45C24.15 15 23.85 14.85 23.55 14.7L21.6 12.75C21.3 12.3 20.7 12 19.95 12H19.5C21.15 12 22.5 10.65 22.5 9C22.5 7.35 21.15 6 19.5 6C17.85 6 16.5 7.35 16.5 9C16.5 10.05 17.1 11.1 18 11.55L17.7 12H14.7C13.05 12 11.25 12.75 10.2 14.25L9.3 15.45C8.7 16.05 9 16.95 9.6 17.4C10.2 17.7 10.95 17.55 11.4 16.95L12.15 15.9C12.6 15.3 13.2 15 13.95 15H15.15L14.1 17.4C13.65 18.3 13.5 19.2 13.5 20.25V23.25C13.5 23.7 13.2 24 12.75 24H9C8.1 24 7.5 24.6 7.5 25.5C7.5 26.4 8.1 27 9 27H14.25C15.45 27 16.5 25.95 16.5 24.75V21L22.2 27.75C23.1 29.1 24.75 30 26.4 30H27.75L19.65 19.95C19.2 19.35 19.35 18.75 19.65 18L20.55 15.75L21.6 16.95C22.2 17.55 23.1 18 24 18H27C27.9 18 28.5 17.4 28.5 16.5C28.5 15.6 27.9 15 27 15Z"
                  fill="#FF6666"
                />
              </svg>
            </div>
          </Link>
        </span>
      </span>
    </>
  );
};

export default DropdownMin;
