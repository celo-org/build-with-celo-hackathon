import Sponsor from "../../../public/SponsorExample.png";
import Hexagon from "../../../public/Hexagon-only.png";
import Image from "next/image";
import { IBM_Plex_Mono } from "@next/font/google";
import { useRouter } from "next/router";

const IBM = IBM_Plex_Mono({
  weight : ["400", "500", "600", "700"],
  subsets : [
      "latin"
  ]
});

const ibm = {
  fontFamily: `${IBM.style.fontFamily}`
}

const bgImg = {
  backgroundImage: `url(${Hexagon.src})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
};

// const bgWhite = {
//   background-color: white;
// }

// const bgBlack = {
//   color: "#000"
// }

export default function Detail() {
  const { query } = useRouter();

  return(
    <div id="page-app" className="grid justify-center content-center sm:my-10">
 
      <div className="w-1/2 sm:w-[30rem] sm:shadow-lg bg-black">
        <div className="container bg-black">
          <div className="container flex flex-row">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <h1 className="text-white text-center text-xl" style={ibm}>AMADAO.VERIFICATION</h1>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-zinc-300">
          <div className="container flex flex-row py-4">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <Image src={Sponsor} alt="CLABS"/>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-white" style={bgImg}>
          <div className="container flex flex-row py-5">
            <div className="basis-1/3"></div>
            <div className="basis-1/3">
              <span className="text-black text-center text-sm font-bold" style={ibm}>
                cLabs has offset 2,365 tons of carbon dioxide through sponsoring green work.
              </span>
            </div>
            <div className="basis-1/3"></div>
          </div>
        </div>
        <div className="container bg-green-500">
          <div className="container flex flex-row py-2">
            <div className="basis-1/4"></div>
            <div className="basis-1/2 text-center">
              <a href={`https://alfajores.celoscan.io/address/${query.address}`} target="_blank" rel="noreferrer" className="text-white text-xl underline" style={ibm}>46k transactions</a>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-white">
          <div className="container flex flex-row py-4">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <h1 className="text-black text-center text-xl font-semibold" style={ibm}>Join our Mission:</h1>
              <h1 className="text-black text-center text-2xl font-black" style={ibm}>PLANT 1M TREES</h1>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-white">
          <div className="container flex flex-row">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>
                Together we will offset 24k Tons of CO2 per year.
              </h1>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-white">
          <div className="container flex flex-row py-4">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>Use the AMA Timer App</h1>
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>daily to offset energy</h1>
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>used by your devices.</h1>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-white">
          <div className="container flex flex-row py-2">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <div className="container flex flex-row bg-green-500 py-2 rounded">
                <div className="basis-1/3"></div>
                <div className="basis-1/3">
                  <h1 className="text-white text-center text-xl font-semibold" style={ibm}>Download</h1>
                </div>
                <div className="basis-1/3"></div>
              </div>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
        <div className="container bg-white">
          <div className="container flex flex-row py-4">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>
                Apply <a href="#" className="underline">here</a> to sponsor
              </h1>
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>
                your team or other to
              </h1>
              <h1 className="text-black text-center text-lg font-semibold" style={ibm}>
                work green.
              </h1>
            </div>
            <div className="basis-1/4"></div>
          </div>
        </div>
      </div>

    </div>
  )
}
