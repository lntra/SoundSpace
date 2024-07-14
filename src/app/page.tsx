import LoginPage from "./pages/login/page";
import RootLayout from "./layout";

export default function Home() {
  return (
    <RootLayout>
      <main className="bg-sp-greyish text-white">
            <div className=" bg-indigo-50 font-['Lato']">
                <LoginPage></LoginPage>
            </div>
      </main>
    </RootLayout>
  );
}