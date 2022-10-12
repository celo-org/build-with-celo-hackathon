import type { NextPage } from "next";
import EventCard from "../components/cards/EventCard";
import Hero from "../components/Hero";
import AppLayout from "../components/layout/AppLayout";
import Meta from "../components/partials/Meta";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Meta title="Discover" />
      <Hero />
      <main className="w-full overflow-auto">
        <div
          className="max-w-7xl w-full py-0 px-[26px]"
          style={{
            margin: "60px auto 0",
          }}
        >
          <div className="mb-6 flex flex-row justify-between items-center font-black w-full px-2">
            <h3 className="text-lg">Event Near You</h3>
            <a href="#" className="text-md">
              See more
            </a>
          </div>
          <div className="flex flex-wrap w-full">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Home;
