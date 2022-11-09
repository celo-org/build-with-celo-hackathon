import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon, WalletIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { walletOpenState } from "../utils/store";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

const navigation = [
  { name: "For educators", href: "#" },
  { name: "For sponsors", href: "/funders" },
  { name: "For teachers and parents", href: "/" },
];

const Nav = ({ isDashboard }: any) => {
  const [isWalletOpen, setWalletOpen] = useRecoilState(walletOpenState);
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-white border-b">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-24 justify-between">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-shrink-0 items-center">
                <a href="/">
                  <img className="h-20 w-20" src="/logo.png" alt="" />
                </a>
              </div>
              {!isDashboard && (
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="inline-flex items-center px-6 py-2 text-sm  text-[#385738] transition-all duration-500 ease-in-out transform bg-green bg-opacity-30 rounded-md hover:text-white md:mb-2 lg:mb-0  hover:bg-green hover:bg-opacity-50  focus:ring-2 ring-offset-current ring-offset-2"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
              {isDashboard && (
                <div className="flex items-center">
                  <button
                    onClick={() => setWalletOpen(!isWalletOpen)}
                    type="button"
                    className="mr-4 inline-flex items-center px-6 py-2 text-sm  text-[#385738] transition-all duration-500 ease-in-out transform bg-green bg-opacity-30 rounded-md hover:text-white lg:mb-0  hover:bg-green hover:bg-opacity-50  focus:ring-2 ring-offset-current ring-offset-2"
                  >
                    <WalletIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Open Wallet</span>
                  </button>
                  <button
                    onClick={() => {
                      window.localStorage.removeItem("zena-session");
                      process.browser && router.push("/");
                    }}
                    type="button"
                    className="relative inline-flex items-center rounded-md border border-transparent bg-green-dark px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <AiOutlineLogout
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </button>
                </div>

                // <button
                //   onClick={() => setWalletOpen(!isWalletOpen)}
                //   type="button"
                //   className="flex-shrink-0 rounded-full p-1 text-green-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                // >
                //   <span className="sr-only">View wallet</span>
                //   <WalletIcon className="h-12 w-12" aria-hidden="true" />
                // </button>
              )}
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="inline-flex items-center px-6 py-2 text-sm  text-[#385738] transition-all duration-500 ease-in-out transform bg-green bg-opacity-30 rounded-md hover:text-white md:mb-2 lg:mb-0  hover:bg-green hover:bg-opacity-50  focus:ring-2 ring-offset-current ring-offset-2"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
