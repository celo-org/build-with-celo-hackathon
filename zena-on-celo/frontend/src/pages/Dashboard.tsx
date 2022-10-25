import { useCallback, useState } from "react";
import Layout from "../components/Layout";
import Home from "./Home";
import { Navigate } from "react-router-dom";
import { useSession } from "../utils/hooks";

export default function Dashboard() {
  const { isLoggedIn } = useSession();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as any), []);
  if (!isLoggedIn) {
    return <Navigate to="/onboarding" replace={true} />;
  }
  return (
    <Layout>
      <Home forceUpdate={forceUpdate} />
    </Layout>
  );
}
