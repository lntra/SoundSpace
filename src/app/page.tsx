import LoginPage from "./pages/login/page";
import RootLayout from "./layout";
import HomePage from "./pages/home/page";

export default function Home() {
  return (
    <RootLayout>
      <main className="bg-sp-greyish text-white">
            <div className=" bg-white font-['Lato']">
                <LoginPage></LoginPage>
            </div>
      </main>
    </RootLayout>
  );
}