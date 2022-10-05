import { RecoilRoot } from "recoil";
import { useState } from "react";
import Onboarding from "./pages/Onboarding";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chapter from "./pages/Chapter";
import WalletModal from "./components/Wallet/Modal";
// import IpfsRouter from "ipfs-react-router";

export default function App() {
  const [isLoggedIn] = useState(false);

  const Start = () => {
    return (
      <div className="relative overflow-hidden bg-white h-screen">
        <div className="mx-auto max-w-7xl">
          <div className="z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-font sm:text-5xl md:text-6xl">
                  <span className="block text-green xl:inline">ZENA</span>{" "}
                  <span className="block xl:inline">Dein Start ins Web3 </span>
                </h1>
                <p className="mt-3 mb-3 text-base text-font-light sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Web3, Blockchain, Kryptographie, Token, NFT und vieles mehr
                </p>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                  <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
                    src="/Onboarding-1.jpeg"
                    alt=""
                  />
                </div>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to={isLoggedIn ? "/home" : "/onboarding"}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-green px-8 py-3 text-base font-medium text-white hover:bg-green-medium md:py-4 md:px-10 md:text-lg"
                    >
                      {isLoggedIn ? "Weiter geht's" : "Los geht's"}
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-green bg-opacity-30 px-8 py-3 text-base font-medium text-green-medium hover:bg-green hover:bg-opacity-50 md:py-4 md:px-10 md:text-lg"
                    >
                      Elternhinweis
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <RecoilRoot>
      <BrowserRouter>
        <WalletModal />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path={`/chapters/:chapterId`} element={<Chapter />} />
          <Route path="*" element={<>Not found.</>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
