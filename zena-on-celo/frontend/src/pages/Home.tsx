import Chapters from "../components/Dashboard/Chapters";
import Heading from "../components/Dashboard/Heading";
import Retire from "../components/Dashboard/Retire";
import Stats from "../components/Dashboard/Stats";

export default function Home({ forceUpdate }: any) {
  return (
    <div className="container pb-12">
      <Heading />
      <Stats />
      <Retire />

      <Chapters forceUpdate={forceUpdate} />
    </div>
  );
}
