import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";

const Balance = ({ token }: any) => {
  const [loading, setLoading] = useState(false);
  const [balance, setData] = useState<any>();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/1/balance/${token}`
      );
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {balance} {token}
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "CELO", href: "#" },
  { name: "BCT", href: "#" },
  //   { name: "NFTs", href: "#" },
];

const Content = () => {
  const [activeTab, setTab] = useState("CELO");
  return (
    <div>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            onChange={(e) => setTab(e.target.value)}
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs[0].name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                onClick={(e) => setTab(tab.name)}
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.name === activeTab
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-500 hover:text-gray-700",
                  "px-3 py-2 font-medium text-sm rounded-md"
                )}
                aria-current={tab.name === activeTab ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="p-6">
        <div
          className="tab-pane fade show active"
          id="tabs-home"
          role="tabpanel"
          aria-labelledby="tabs-home-tab"
        >
          <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-green-medium p-3">
                <CurrencyDollarIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <p className="pl-14 text-sm font-medium text-font-light">
                Kontostand
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-font">
                <Balance token={activeTab} />
              </p>
            </dd>
            {/* NFT stuff not on the showcase
       <Minting />
  <div className="border-b border-gray-200 pb-5">
    <h3 className="text-lg font-medium leading-6 text-font">
      {session.name}'s NFTs
    </h3>
    <p className="mt-2 text-sm text-font-light">
      Hier sind alle deine geminteten oder gekauften
      NFTs zu sehen.
    </p>
    <p className="p-6">
      <div className="grid grid-cols-2 gap-2">
        {Array.from(Array(user.nft)).map((x, i) => {
          return (
            <div className="border border-b border-indigo-300 border-opacity-25">
              <img
                style={{
                  display: "unset",
                  width: 200,
                }}
                src={tree}
                alt="Baum"
              />
            </div>
          );
        })}
      </div>
    </p>
  </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Content;
