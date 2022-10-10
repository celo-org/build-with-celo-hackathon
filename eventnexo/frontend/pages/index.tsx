import type { NextPage } from "next";
import Image from "next/image";
import SecondaryButton from "../components/btn/SecondaryButton";
import AppLayout from "../components/layout/AppLayout";
import Meta from "../components/partials/Meta";


const Home: NextPage = () => {
  return (
    <AppLayout>
      <Meta title="Discover" />
      <section className="flex w-full bg-[#00D26D] border-b-2 border-b-black py-16 px-10">
        <div className="max-w-[1100px] mx-auto my-0">
          <div className="flex items-start bg-white border-black border-2 rounded-[20px] w-full relative z-[10] top-[7px] left-[7px] p-[12px] h-[500px]">
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
              <div className="relative overflow-hidden max-w-[650px] max-h-[458px]  rounded-[14px] ">
                <Image
                  src="https://i.imgur.com/Flfo4hJ.png"
                  layout="fill"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="flex min-h-screen flex-col items-center justify-center py-2"></main>
    </AppLayout>
  );
};

export default Home;
