import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AppLogo from "./AppLogo";
import PrimaryButton from "../btn/PrimaryButton";
import SecondaryButton from "../btn/SecondaryButton";
import { useCelo } from "@celo/react-celo";
import { shortenAddress } from "../../utils/address";
import { Identicon } from "../Identicon";

export default function NewHeader() {
  const [animateHeader, setAnimateHeader] = useState(false);
  const router = useRouter();
  const { connect, address } = useCelo();

  const splitLocation = router.pathname.split("/");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const listener = () => {
        if (window.scrollY > 90) {
          setAnimateHeader(true);
        } else setAnimateHeader(false);
      };
      window.addEventListener("scroll", listener);
      return () => {
        window.removeEventListener("scroll", listener);
      };
    }
  }, []);
  return (
    <Popover
      className={
        "z-50 border-b-2 border-black " +
        (animateHeader
          ? "!bg-white !bg-opacity-70 backdrop-blur-lg sticky top-0 transition duration-200 drop-shadow-sm"
          : "bg-transparent")
      }
      as="header"
    >
      <div className="xl:px-20 md:px-6 !px-8 lg:!px-10 max-w-full mx-auto md:max-w-screen-7xl lg:max-w-screen-2xl 2xl:max-w-screen-3xl">
        <div className="flex justify-between items-center py-6 lg:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex">
            <Link href="/" passHref>
              <a>
                <span className="sr-only">App logo</span>
                <div className="logo">
                  <AppLogo />
                </div>
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 lg:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-black">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Popover.Button>
          </div>
          <div className="hidden lg:flex items-start justify-end md:flex-1 lg:w-0 space-x-10">
            <Link href="/discover" passHref>
              <a
                className={
                  (splitLocation[1] == "disover"
                    ? " border-b-2 border-b-black"
                    : "hover:border-b-2 hover:border-b-black") +
                  "  text-black text-lg font-bold"
                }
              >
                Discover
              </a>
            </Link>
            <Link href="/communities" passHref>
              <a
                className={
                  (splitLocation[1] == "communities"
                    ? " border-b-2 border-b-black"
                    : "hover:border-b-2 hover:border-b-black") +
                  "  text-black text-lg font-bold"
                }
              >
                Communities
              </a>
            </Link>
          </div>

          {/* <Popover.Group
            as="nav"
            className="hidden lg:flex items-center justify-center"
          >
            <Link href="/" passHref>
              <a>
                <span className="sr-only">App logo</span>
                <div className="logo">
                  <AppLogo />
                </div>
              </a>
            </Link>
          </Popover.Group> */}
          <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0 space-x-6">
            <SecondaryButton
              title="Create event"
              onPressed={function () {
                if (address) {
                  router.push("/account");
                } else {
                  connect();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </SecondaryButton>
            {address ? (
              <PrimaryButton
                background="bg-primary"
                title={shortenAddress(address, true, true)}
                onPressed={connect}
              >
                <Identicon address={address} size={24} />
              </PrimaryButton>
            ) : (
              <PrimaryButton
                background="bg-secondary"
                title="Connect Wallet"
                onPressed={connect}
              />
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-50 lg:hidden"
        >
          <div className="rounded-lg shadow-lg ring-0 ring-opacity-5 bg-white">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/" passHref>
                    <a>
                      <AppLogo />
                    </a>
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-black">
                    <span className="sr-only">Close menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              {/* <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link href="/auction" passHref>
                  <a
                    className={
                      (splitLocation[1] == "auction"
                        ? "text-yell border-b border-b-yell hover:text-secondary hover:border-b-secondary"
                        : "text-tertiary hover:text-secondary") +
                      "  text-sm font-medium"
                    }
                  >
                    Auctions
                  </a>
                </Link>
                <Link href="/collections" passHref>
                  <a
                    className={
                      (splitLocation[1] == "collections"
                        ? "text-yell border-b border-b-yell hover:text-secondary hover:border-b-secondary"
                        : "text-tertiary hover:text-secondary") +
                      "  text-sm font-medium"
                    }
                  >
                    Collections
                  </a>
                </Link>
                <Link href="/about" passHref>
                  <a
                    className={
                      (splitLocation[1] == "about"
                        ? "text-yell border-b border-b-yell hover:text-secondary hover:border-b-secondary"
                        : "text-tertiary hover:text-secondary") +
                      "  text-sm font-medium"
                    }
                  >
                    About
                  </a>
                </Link>
              </div>
              <div className="w-full flex flex-col space-y-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    className="border px-3 py-2 focus:outline-0 focus:ring-0 text-sm font-medium w-full"
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-2 top-3 text-black text-opacity-40"
                  />
                </div>
                <button className="bg-black whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent shadow-sm text-sm text-white">
                  Connect wallet
                </button>
              </div> */}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
