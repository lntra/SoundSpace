"use client";

import Link from "next/link";
import SymbolLogo from "../../_components/atoms/symbol";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TRPCError } from "@trpc/server";
import useDarkMode from "~/app/hooks/useDarkMode";

const LoginPage = () => {
  const mutation = api.user.login.useMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      console.log(darkMode);
    }
    console.log(darkMode);
  }, [darkMode]);

  console.log(darkMode);

  const background = {
    background: "linear-gradient(90deg, #53337B 0%, #96429A 121.92%)",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      console.log("Submitting login with email:", email);
      console.log("Submitting login with password:", password);
      try {
        const result = await mutation.mutateAsync({ email, password });

        console.log(result.token);
        const token = result.token;

        if (result.token) {
          document.cookie = `auth_token=${token}; path=/`;
        }

        if (result.id) {
          router.replace("/pages/home/");
        }
      } catch (error: any) {
        if (error instanceof TRPCError) {
          setError(error.message);
        } else if (error?.message) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      console.error("Uknown Error", error);
      setError("Uknown Error, try again");
    }

    console.log(error);
  };

  return (
    <div
      className={`grid h-[100vh] grid-cols-12 overflow-y-hidden font-['Lato'] ${
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="absolute left-[5%] top-[5%] hidden lg:flex">
        <p
          className={`text-[40px] font-black text-opacity-30 ${
            dark ? "text-white" : "text-pink-200"
          }`}
        >
          Soundspace
        </p>
      </div>
      <div
        style={background}
        className="grid-rows-auto col-span-7 hidden h-[100vh] grid-cols-5 content-center justify-items-center lg:grid"
      >
        <div className="col-start-2 col-end-5 row-start-2 row-end-5">
          <SymbolLogo />
        </div>
      </div>
      <div className="col-span-12 flex flex-col items-center lg:col-span-5">
        <div className="flex h-[100%] w-[75%] flex-col flex-wrap items-center justify-center py-[76px]">
          <div
            className="h-2.5 w-[60%] rounded-[20px]"
            style={{
              background: `linear-gradient(270deg, #53337B -107.14%, #96429A 100%)`,
            }}
          ></div>
          <div className="mt-2 w-[100%] text-center text-4xl font-bold">
            Welcome back!
          </div>
          <div className="mt-2 text-center text-3xl font-light">
            Log in to access amazing and personalized content just for you!
          </div>

          <form className="w-[100%]" onSubmit={handleSubmit}>
            <div
              className="mt-16 w-[100%] rounded-[20px] p-[1px]"
              style={{
                background: `linear-gradient(270deg, #53337B 0%, #96429A 100%)`,
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className={`h-20 w-[100%] rounded-[20px] px-5 text-2xl font-medium ${
                  dark ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              />
            </div>
            <div
              className="mt-8 w-[100%] rounded-[20px] p-[1px]"
              style={{
                background: `linear-gradient(270deg, #53337B 0%, #96429A 100%)`,
              }}
            >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className={`h-20 w-[100%] rounded-[20px] px-5 text-2xl font-medium ${
                  dark ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              />
            </div>
            {error && (
              <div className="mt-8 text-center text-xl font-bold text-red-500">
                {error}
              </div>
            )}
            <div
              className="mt-8 w-[100%] rounded-[20px] p-[1px]"
              style={{
                background: `linear-gradient(270deg, #53337B 0%, #96429A 100%)`,
              }}
            >
              <button
                type="submit"
                className={`h-20 w-[100%] rounded-[20px] text-2xl font-light ${
                  dark ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <p
                  className={`text-2xl font-bold ${
                    dark ? "text-gray-300" : "text-purple-900"
                  }`}
                >
                  Continue
                </p>
              </button>
            </div>
          </form>

          <div className="mt-16 text-center">
            <div className="text-2xl font-light">Don't have an account?</div>
            <Link
              prefetch={true}
              href="/pages/register"
              className={`text-2xl font-bold ${
                dark ? "text-gray-300" : "text-purple-900"
              }`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
