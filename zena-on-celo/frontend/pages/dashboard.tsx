import { useCallback, useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "../utils/hooks";
import Chapters from "../components/Dashboard/Chapters";
import Heading from "../components/Dashboard/Heading";
import Sequester from "../components/Dashboard/Sequester";
import Stats from "../components/Dashboard/Stats";
import { useRouter } from "next/router";
import WalletModal from "../components/Wallet/Modal";
import Nav from "../components/Nav";

export default function Dashboard() {
  const router = useRouter();

  const { isLoggedIn } = useSession();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as any), []);
  if (!isLoggedIn && process.browser) router.push("/onboarding");

  return (
    <Layout>
      <WalletModal />

      <div className="container pb-12">
        <Heading />
        <Stats />
        <Sequester />

        <Chapters forceUpdate={forceUpdate} />
      </div>
    </Layout>
  );
}
