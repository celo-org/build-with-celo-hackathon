import { Link } from "react-router-dom";
import { ImLoop } from "react-icons/im";
import { FaHandshake } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import { AiOutlineSwap } from "react-icons/ai";
import { TiGroup } from "react-icons/ti";
import { RiTrophyLine } from "react-icons/ri";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import Mobiles from "../../img/home-mobile-banner.png";
import Brindrajsinh from "../../img/team/Brindrajsinh.jpeg";
import Diana from "../../img/team/Diana.jpeg";
import Felipe from "../../img/team/Felipe.jpeg";
import Gilberts from "../../img/team/Gilberts.jpeg";
import Aun from "../../img/team/Aun.jpg";
import "../../styles/Home.css";

function Home() {
  return (
    <div className="px-16">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row px-16 lg:px-32 my-12 mb-24">
        <div className="w-full lg:w-1/2 my-auto block lg:hidden p-12">
          <img src={Mobiles} alt="Mobiles" />
        </div>
        <div className="w-full lg:w-1/2 my-auto text-center lg:text-left">
          <div className="max-w-lg px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
            <h1 className="font-extrabold leading-10 tracking-tight lg:text-left text-white text-center sm:leading-none text-4xl md:text-6xl lg:text-7xl">
              <span className="block py-1 text-8xl">Helpi Finance</span>
              <span className="text-3xl md:text-5xl xl:text-6xl font-bold mt-2 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block">
                Serving unbanked population with
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">
                  {" "}
                  efficient and cheap fees
                </span>{" "}
              </span>
            </h1>
            <div className="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 text-center lg:text-lg lg:text-left">
              <Link to="/dashboard">
                <button className="border text-xl font-semibold text-white py-5 px-10 rounded-full hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-primary-dark">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 hidden lg:block">
          <img src={Mobiles} alt="Mobiles" />
        </div>
      </div>
      {/* Market Trades */}
      <div className="flex flex-col lg:flex-row px-12 2xl:px-32 my-16">
        <div className="w-full lg:w-6/12 flex flex-col lg:flex-row">
          <div className="w-full lg:w-7/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
            <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 lg:py-2 pr-3 rounded-r-xl">
              Optimized to bring you the best rates to trade your stablecoins and pegged assets. Support us as liquidity
              providers or stake our token HELPI for solid yields.
            </div>
          </div>
          <div className="w-full lg:w-5/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
            <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
              <div className="text-4xl font-semibold text-right">$38.2m/$126.4k</div>
              <p className="w-full text-right text-2xl text-secondary">Total/24hr Volume</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 flex flex-col lg:flex-row">
          {/* 2.1 */}
          <div className="w-full lg:w-3/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
            <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
              <h4 className="text-4xl font-semibold text-right">$89.5m</h4>
              <p className="w-full text-right text-2xl text-secondary">TVL</p>
            </div>
          </div>
          {/* 2.2 */}
          <div className="w-full lg:w-3/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
            <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
              <h4 className="text-4xl font-semibold text-right">$57.9m</h4>
              <p className="w-full text-right text-2xl text-secondary">Marketcap</p>
            </div>
          </div>
          {/* 2.3 */}
          <div className="w-full lg:w-3/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
            <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
              <h4 className="text-4xl font-semibold text-right">737.7m</h4>
              <h4 className="text-4xl font-semibold text-right">HLP</h4>
              <p className="w-full text-right text-2xl text-secondary">Circulating Supply</p>
            </div>
          </div>
          {/* 2.4 */}
          <div className="w-full lg:w-3/12  bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
            <div className="w-auto h-full bg-primary-dark mb-0.5 lg:m-0 py-8 px-3 lg:py-2 rounded-r-xl">
              <h4 className="text-4xl font-semibold text-right">40.6m</h4>
              <h4 className="text-4xl font-semibold text-right">xHLP</h4>
              <p className="w-full text-right text-2xl text-secondary">Locked in Vault</p>
            </div>
          </div>
        </div>
      </div>
      {/* Feature ---------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-6 px-12 xl:px-16 2xl:px-32 gap-8">
        {/* card 1 */}
        <div
          role="listitem"
          className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 p-3 flex relative z-30"
        >
          <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
          <div className="w-full p-8">
            <div className="md:flex items-center justify-between">
              <h2 className="flex items-center text-3xl font-semibold leading-6 text-gray-400">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-3">
                  <AiOutlineSwap className="text-primary-dark text-xl" />
                </div>
                Swap
              </h2>
              {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
            </div>
            <p className="text-2xl leading-12 font-medium mt-4 text-gray-500">
              Easily exchange one cryptocurrency for another without leaving their Blockchain Wallet.
            </p>
          </div>
        </div>
        {/* card 2 */}
        <div
          role="listitem"
          className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 p-3 flex relative z-30"
        >
          <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
          <div className="w-full p-8">
            <div className="md:flex items-center justify-between">
              <h2 className="flex items-center text-3xl font-semibold leading-6 text-gray-400">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-3">
                  <ImLoop className="text-primary-dark text-xl" />
                </div>
                Staking Pools
              </h2>
              {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
            </div>
            <p className=" text-2xl leading-12 font-medium mt-4 text-gray-500">
              Stake Celo and cUSD tokens to earn Helpi Tokens as Rewards at high APR rates.
            </p>
          </div>
        </div>
        {/* card 3 */}
        <div
          role="listitem"
          className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 p-3 flex relative z-30"
        >
          <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
          <div className="w-full p-8">
            <div className="md:flex items-center justify-between">
              <h2 className="flex items-center text-3xl font-semibold leading-6 text-gray-400">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-3">
                  <BiLockAlt className="text-primary-dark text-xl" />
                </div>
                Vesting
              </h2>
              {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
            </div>
            <p className=" text-2xl leading-12 font-medium mt-4 text-gray-500">
              Implemented to prevent Pumping and Dumping of Tokens by Whales to Protect your assets and earnings
            </p>
          </div>
        </div>
        {/* card 4 */}
        <div
          role="listitem"
          className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 p-3 flex relative z-30"
        >
          <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
          <div className="w-full p-8">
            <div className="md:flex items-center justify-between">
              <h2 className="flex items-center text-3xl font-semibold leading-6 text-gray-400">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-3">
                  <FaHandshake className="text-primary-dark text-xl" />
                </div>
                Contribute
              </h2>
              {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
            </div>
            <p className=" text-2xl leading-12 font-medium mt-4 text-gray-500">
              Helpi is a Contribution based DeFi Network where each member in the ecosystem contributes and helps others
              to earn interest
            </p>
          </div>
        </div>
      </div>
      {/* Our Mission ------------------- */}
      <div className="mt-40 md:flex xl:px-16 px-12 py-20 2xl:mx-auto 2xl:container relative z-40">
        <div className="relative lg:w-1/2 sm:w-96 xl:h-3/6 h-80">
          <img
            src="https://i.ibb.co/4g1D9cv/imgslider1.png"
            alt="profile"
            className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
          />
          <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-primary-dull text-secondary rounded-full">
            <TiGroup className="text-5xl" />
          </div>
        </div>
        <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-medium xl:leading-loose text-gray-300">Our Mission</h1>
            <p className="text-2xl font-normal leading-8 mt-4 text-gray-400">
              We are a Decentralized protocol that allows users an easy access to the DeFi space by allowing them to use
              fiat-based currencies for day-to-day exchanges and cross-border remittances. The protocol is equiped with
              vesting capabilities allowing users to withdraw their rewards in a periodic manner rather than a massive
              cash-out format.
              <br />
              <br />
              Our platform also allows users to send money to their families and friends in other countries directly in
              their native currency removing the double conversion process and conversion fees.
            </p>
          </div>
          <div className="md:mt-4 mt-8">
            <p className="text-2xl font-medium leading-10 text-secondary">Felipe Montoya</p>
            <p className="text-xl leading-4 mt-2 mb-4 text-gray-400">CEO and Business Developer</p>
          </div>
        </div>
      </div>
      {/* Our Achievements -------------- */}
      <div className="px-16 pb-40 mt-24">
        <h1
          id="roadmap"
          className="xl:text-5xl text-4xl text-center text-primary font-extrabold py-6 sm:w-4/6 w-5/6 mx-auto black-bruno"
        >
          {/* <span className="text-xl better-brush">Paste You Heading Here</span> */}
          Our Achievements
        </h1>
        <div className="flex flex-col md:grid grid-cols-9 mx-auto py-2 text-blue-50">
          {/* <!-- left --> */}
          <div className="flex flex-row-reverse md:contents">
            <div className="col-start-1 col-end-5 p-8 border border-primary-light bg-primary-dull rounded-xl my-4 ml-auto shadow-md w-11/12">
              <p className="leading-tight text-justify text-lg text-secondary mb-1 ">APRIL 2021</p>
              {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Bonds
              <span className="text-lg better-brush">:</span>
            </h3> */}
              <p className="leading-tight text-justify text-2xl">
                Third prize in Gitcoin Binance Smart Chain Hackathon
              </p>
            </div>
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-primary-light rounded-t-full pointer-events-none"></div>
              </div>
              <div className="w-16 h-16 absolute top-1/2 -mt-8 -ml-5 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
                <RiTrophyLine className="text-primary-dark text-2xl" />
              </div>
            </div>
          </div>
          {/* <!-- right --> */}
          <div className="flex md:contents">
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-primary-light pointer-events-none"></div>
              </div>
              <div className="w-16 h-16 absolute top-1/2 -mt-8 -ml-5 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
                <RiTrophyLine className="text-primary-dark text-2xl" />
              </div>
            </div>
            <div className="col-start-6 col-end-10 p-8 rounded-xl my-4 mr-auto shadow-md border  border-primary-light bg-primary-dull w-11/12">
              <p className="leading-tight text-justify text-lg text-secondary mb-1 ">MAY 2021</p>
              {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Staking Pools <span className="text-lg better-brush">:</span>
            </h3> */}
              <p className="leading-tight text-justify text-2xl">Best LatAm Team Gitcoin Celo Mobilize Hackathon</p>
            </div>
          </div>
          {/* <!-- left --> */}
          <div className="flex flex-row-reverse md:contents">
            <div className="col-start-1 col-end-5 p-8 rounded-xl my-4 ml-auto shadow-md border  border-primary-light bg-primary-dull w-11/12">
              <p className="leading-tight text-justify text-lg text-secondary mb-1 ">JUNE 2021</p>
              {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Vesting
              <span className="text-lg better-brush ">:</span>
            </h3> */}
              <p className="leading-tight text-justify  text-2xl">Runners-up Degen VC Gitcoin Hackathon</p>
            </div>
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-primary-light pointer-events-none"></div>
              </div>
              <div className="w-16 h-16 absolute top-1/2 -mt-8 -ml-5 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
                <RiTrophyLine className="text-primary-dark text-2xl" />
              </div>
            </div>
          </div>
          {/* <!-- right --> */}
          <div className="flex md:contents">
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-primary-light pointer-events-none rounded-b-full"></div>
              </div>
              <div className="w-16 h-16 absolute top-1/2 -mt-8 -ml-5 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center">
                <RiTrophyLine className="text-primary-dark text-2xl" />
              </div>
            </div>
            <div className="col-start-6 col-end-10 p-8 rounded-xl my-4 mr-auto shadow-md border border-primary-light bg-primary-dull w-11/12">
              <p className="leading-tight text-justify text-lg text-secondary mb-1 ">NOVEMBER 2021</p>
              {/* <h3 className="font-semibold text-xl mb-4 text-secondary black-bruno">
              Contribute <span className="text-lg better-brush">:</span>
            </h3> */}
              <p className="leading-tight text-justify text-2xl">Mission-alligned Team in Celo Startup Pathway</p>
            </div>
          </div>
        </div>
      </div>
      {/* Vesting ----------------------- */}
      <div className="md:flex xl:px-16 px-12 py-12 2xl:mx-auto 2xl:container relative z-40">
        <div className="md:w-1/2 xl:mr-32 md:mr-20 my-auto flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold xl:leading-loose text-gray-300">What is Vesting?</h1>
            <p className="text-2xl font-normal leading-9 my-4 text-gray-400">
              Vesting protocol allows user to claim their rewards in a periodic manner rather than allowing a massive
              cash-out in order to prevent big players (aka "Whales") from crashing the Native Helpi token through
              massive token dumps. This protects the value of the token and provide stability to the users.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-full xl:h-96 h-80">
          <img
            src="https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="profile"
            className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
          />
        </div>
      </div>
      {/* Team -------------------------- */}
      <div className="py-24 mt-24">
        <h1 className="xl:text-5xl text-4xl text-center text-primary font-extrabold pb-2 sm:w-4/6 w-5/6 mx-auto black-bruno">
          Our Amazing Team
        </h1>
        <p className="text-2xl text-center pb-12 pt-2">The team with a vision.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 px-16 md:px-32">
          {/* card 1 */}
          <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl ">
            <img
              src={Aun}
              alt="Sebs"
              className="w-52 h-52 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Aun Shahbaz</h2>
                <p className="px-5 text-lg text-secondary">BLOCKCHAIN DEVELOPER</p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsGithub />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsLinkedin />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* card 2 */}
          <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl">
            <img
              src={Brindrajsinh}
              alt="Brindrajsinh"
              className="w-52 h-52 mx-auto rounded-full bg-center bg-cover object-contain aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Brindrajsinh</h2>
                <p className="px-5 text-lg text-secondary">BLOCKCHAIN DEVELOPER</p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsGithub />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsLinkedin />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* card 3 */}
          <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl">
            <img
              src={Felipe}
              alt="Felipe"
              className="w-52 h-52 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Felipe Montoya</h2>
                <p className="px-5 text-lg text-secondary">CEO AND BUSINESS DEVELOPER</p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsGithub />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsLinkedin />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* card 4 */}
          <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl ">
            <img
              src={Gilberts}
              alt="Gilberts"
              className="w-52 h-52 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Gilberts</h2>
                <p className="px-5 text-lg text-secondary">BLOCKCHAIN ENGINEER</p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsGithub />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsLinkedin />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* card 5 */}
          <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-md rounded-xl">
            <img
              src={Diana}
              alt="Diana"
              className="w-52 h-52 mx-auto rounded-full dark:bg-gray-500 aspect-square hover:scale-110 transition-all duration-200 ease-in-out"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Diana Rincon</h2>
                <p className="px-5 text-lg text-secondary">BUSINESS DEVELOPER</p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsGithub />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsLinkedin />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md hover:text-primary-dark hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple"
                >
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer ------------------------ */}
      <footer className="relative bg-primary-dull border border-primary-light rounded-xl m-4 pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-4xl font-semibold text-gray-500">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Let's keep in touch!
              </h4>
              <h5 className="text-xl mt-2 mb-2 text-secondary">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  onClick={() => window.open("https://twitter.com/Helpi_io", "_blank")}
                  className="text-primary-dark bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple h-16 w-16 rounded-full outline-none focus:outline-none hover:scale-105 transition-all mr-6"
                  type="button"
                >
                  <BsTwitter className="m-auto" />
                </button>
                <button
                  className="text-primary-dark bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple h-16 w-16 rounded-full outline-none focus:outline-none hover:scale-105 transition-all mr-6"
                  type="button"
                >
                  <BsLinkedin className="m-auto" />
                </button>
                <button
                  onClick={() => window.open("https://github.com/helpicelo", "_blank")}
                  className="text-primary-dark bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple h-16 w-16 rounded-full outline-none focus:outline-none hover:scale-105 transition-all mr-6"
                  type="button"
                >
                  <BsGithub className="m-auto" />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-secondary text-md font-bold mb-2">Useful Links</span>
                  <ul className="list-unstyled -ml-8 mt-8">
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-secondary text-md font-bold mb-2">Other Resources</span>
                  <ul className="list-unstyled -ml-8 mt-8">
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-xl"
                        href="#"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className=" text-base text-blueGray-500 font-medium py-1">
                Made with ❤️ by
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  className="bg-clip-text text-transparent bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-gray-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Helpi Finance{" "}
                </a>
                <span>- All Rights Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
