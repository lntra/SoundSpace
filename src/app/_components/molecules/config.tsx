import { type UUID } from "crypto";
import Link from "next/link";

interface ConfigButtonProps {
  user: UUID;
}

const ConfigButton = ({ user }: ConfigButtonProps) => {
  return (
    <>
      <Link
        className="flex w-full justify-center"
        href={`/pages/profile/${user}/settings`}
      >
        <button className="flex min-w-[50%] items-center justify-center rounded-[25px] border-[3px] border-solid border-sp-purpleBright2 px-5 py-2.5 text-center hover:border-sp-accent hover:bg-sp-accent hover:outline-offset-8 hover:transition">
          <svg
            width="25"
            className="min-h-[24px] min-w-[25px]"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.7 10L18.6 9.8C18.5 9.6 18.5 9.4 18.4 9.2L19 8.3L19.5 7.6L16.9 5L16.2 5.5L15.3 6.1C15.1 6 14.9 6 14.7 5.9L14.5 4.8L14.3 4H10.7L10.5 4.8L10.3 5.9C10.1 6 9.9 6 9.7 6.1L8.8 5.5L8.1 5.1L5.6 7.6L6.1 8.3L6.7 9.2C6.5 9.4 6.5 9.6 6.4 9.8L5.3 10L4.5 10.2V13.8L5.3 14L6.4 14.2C6.5 14.4 6.5 14.6 6.6 14.8L6 15.7L5.5 16.4L8.1 19L8.8 18.5L9.7 17.9C9.9 18 10.1 18 10.3 18.1L10.5 19.2L10.7 20H14.3L14.5 19.2L14.7 18.1C14.9 18 15.1 18 15.3 17.9L16.2 18.5L16.9 19L19.5 16.4L19 15.7L18.4 14.8C18.5 14.6 18.6 14.4 18.6 14.2L19.7 14L20.5 13.8V10.2L19.7 10ZM19.5 13L17.8 13.3C17.7 13.8 17.5 14.3 17.2 14.8L18.1 16.2L16.7 17.6L15.3 16.7C14.8 17 14.3 17.2 13.8 17.3L13.5 19H11.5L11.2 17.3C10.7 17.2 10.2 17 9.7 16.7L8.3 17.6L6.9 16.2L7.8 14.8C7.5 14.3 7.3 13.8 7.2 13.3L5.5 13V11L7.2 10.7C7.3 10.2 7.5 9.7 7.8 9.2L6.8 7.8L8.2 6.4L9.6 7.3C10.1 7 10.6 6.8 11.1 6.7L11.5 5H13.5L13.8 6.7C14.3 6.8 14.8 7 15.3 7.3L16.7 6.4L18.1 7.8L17.2 9.2C17.5 9.7 17.7 10.2 17.8 10.7L19.5 11V13Z"
              fill="white"
            />
            <path
              d="M12.5 8.5C10.6 8.5 9 10.1 9 12C9 13.9 10.6 15.5 12.5 15.5C14.4 15.5 16 13.9 16 12C16 10.1 14.4 8.5 12.5 8.5ZM12.5 14.5C11.1 14.5 10 13.4 10 12C10 10.6 11.1 9.5 12.5 9.5C13.9 9.5 15 10.6 15 12C15 13.4 13.9 14.5 12.5 14.5Z"
              fill="white"
            />
          </svg>
          <p className="hidden text-base font-bold md:flex">Settings</p>
        </button>
      </Link>
    </>
  );
};

export default ConfigButton;
