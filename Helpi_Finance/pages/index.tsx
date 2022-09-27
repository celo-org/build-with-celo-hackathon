import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import MarketTrades from "../components/landing/MarketTrades";
import Features from "../components/landing/Features";
import OurMission from "../components/landing/OurMission";
import OurAchievements from "../components/landing/OurAchievements";
import Vesting from "../components/landing/Vesting";
import Team from "../components/landing/Team";
import Footer from "../components/landing/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Helpi Finance</title>
        <meta name="description" content="Next Level Financial Dapp" />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>

      <main>
        <Navbar />
        <Hero />
        <MarketTrades />
        <Features />
        <OurMission />
        <OurAchievements />
        <Vesting />
        <Team />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
