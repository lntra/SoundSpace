import "~/styles/globals.css";

import { Lato } from '@next/font/google';
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
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
  const cookieHeader = cookies().get("auth_token")?.value ?? "";

  return (
    <html lang="en">
      <body className={`font-[Lato] lato-font ${lato.className}`}>
        <TRPCReactProvider cookies={cookieHeader}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
