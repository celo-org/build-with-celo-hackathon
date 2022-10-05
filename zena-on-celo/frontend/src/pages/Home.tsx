import Chapters from "../components/Dashboard/Chapters";
import Heading from "../components/Dashboard/Heading";
import Stats from "../components/Dashboard/Stats";

export default function Home() {
  return (
    <div className="container pb-12">
      <Heading />
      <Stats />
      <Chapters />
    </div>
  );
}
