import LoginPage from "./pages/login/page";
import RootLayout from "./layout";

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});

export default function Home() {
  return (
    <RootLayout>
      <main className="bg-sp-greyish text-white">
        <div className={`${lato.className} bg-white font-['Lato']`}>
          <LoginPage></LoginPage>
        </div>
      </main>
    </RootLayout>
  );
}
