import Chapters from "../components/Dashboard/Chapters";
import Heading from "../components/Dashboard/Heading";
import Sequester from "../components/Dashboard/Sequester";
import Stats from "../components/Dashboard/Stats";

export default function Home({ forceUpdate }: any) {
  return (
    <div className="container pb-12">
      <Heading />
      <Stats />
      <Sequester />

      <Chapters forceUpdate={forceUpdate} />
    </div>
  );
}
