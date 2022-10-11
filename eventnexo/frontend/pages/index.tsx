import type { NextPage } from "next";
import Image from "next/image";
import SecondaryButton from "../components/btn/SecondaryButton";
import EventCard from "../components/cards/EventCard";
import AppLayout from "../components/layout/AppLayout";
import Meta from "../components/partials/Meta";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Meta title="Discover" />
      <section className="flex w-full bg-[#00D26D] border-b-2 border-b-black py-16 px-10">
        <div className="max-w-6xl mx-auto my-0 relative">
          <div className="flex items-start bg-white border-black border-2 rounded-[10px] w-full relative z-[10] top-[20px] left-[30px] p-[12px] h-[500px]">
            <div className="w-[40%] min-h-[142px] px-16 py-10">
              <h3 className="text-3xl font-black overflow-hidden text-ellipsis max-w-full">
                Explore celo blockcain
              </h3>
              <p className="mt-6 text-md font-bold overflow-hidden text-ellipsis">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
              <div className="mt-10 bottom-[40px] flex">
                <SecondaryButton
                  title="Book now"
                  onPressed={() => console.log(0)}
                />
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden relative">
              <div className="relative overflow-hidden max-w-[709px] max-h-[458px] rounded-[14px]">
                <div className="flex items-center justify-center">
                  <Image
                    width={700}
                    height={500}
                    src="https://i.imgur.com/Flfo4hJ.png"
                    layout="intrinsic"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <span className="w-full h-full absolute left-0 top-0 rounded-[12px] border-2 border-black bg-white transition-opacity"></span>
        </div>
      </section>
      <main className="flex flex-col items-center justify-center max-w-7xl mx-auto my-0 overflow-auto">
        <div className="max-w-6xl mt-10 px-10">
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
