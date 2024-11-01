import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SoundSpace",
  description: "Project Intra - Nextjs trpc",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieHeader = cookies().get('auth_token')?.value || '';

  return (
      <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <TRPCReactProvider cookies={cookieHeader}>
              {children}
            </TRPCReactProvider>
          </body>
      </html>
  );
}
