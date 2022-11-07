import { Link } from "react-router-dom";
import {
  BiNetworkChart,
  BiKey,
  BiGroup,
  BiImage,
  BiCheckbox,
} from "react-icons/bi";
import { RiPlantLine } from "react-icons/ri";
import { useSession } from "../../utils/hooks";
const iconSize = "3em";

export default function Chapters({ forceUpdate }: any) {
  const { user } = useSession();
  const chapters = [
    {
      name: "Web3 Basics",
      path: "/1",
      id: "1",
      url: "/Kachel-1_Web3-basics.png",
      icon: <BiNetworkChart size={iconSize} />,
      enabled: false,
      done: user?.stats?.quiz1 === "1" ? true : false,
    },
    {
      name: "Blockchain and Tokens",
      path: "/2",
      id: "2",
      url: "/Kachel-2_Blockchain.png",
      icon: <BiCheckbox size={iconSize} />,
      enabled: false,
      done: user?.stats?.quiz2 === "1" ? true : false,
    },
    {
      name: "ReFi",
      path: "/4",
      id: "4",
      url: "/Kachel-3_REFI.png",
      icon: <RiPlantLine size={iconSize} />,
      enabled: false,
      done: user?.stats?.quiz4 === "1" ? true : false,
    },
    {
      name: "NFTs",
      path: "/3",
      id: "3",
      url: "/kachel-4_mint.png",
      icon: <BiImage size={iconSize} />,
      enabled: false, // not for celo hackathon
      done: user?.stats?.quiz3 === "1" ? true : false,
    },
    {
      name: "Wallets",
      path: "/5",
      id: "5",
      url: "/kachel-3_wallet.png",
      icon: <BiKey size={iconSize} />,
      enabled: false,
      done: user?.stats?.quiz5 === "1" ? true : false,
    },
    {
      name: "DAOs",
      path: "/6",
      id: "6",
      url: "/Kachel-5_Dao.png",
      icon: <BiGroup size={iconSize} />,
      enabled: false,
      done: user?.stats?.quiz6 === "1" ? true : false,
    },
  ];

  const finishChapter = (id: string) => {
    const quizKey = `quiz${id}`;
    const oldStats = Object.assign({}, user?.stats);
    localStorage.setItem(
      "zena-session",
      JSON.stringify({
        ...user,
        stats: {
          ...oldStats,
          [quizKey]: "1",
        },
      })
    );
    forceUpdate();
  };

  const resetChapter = (id: string) => {
    const quizKey = `quiz${id}`;
    const oldStats = Object.assign({}, user?.stats);
    localStorage.setItem(
      "zena-session",
      JSON.stringify({
        ...user,
        stats: {
          ...oldStats,
          [quizKey]: "0",
        },
      })
    );
    forceUpdate();
  };

  return (
    <div className="container mx-auto pb-12">
      <div className="pb-1">
        <h2 className="text-2xl text-center font-bold mb-2 mt-10 leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          Your learning modules
        </h2>

        <p className="text-lg font-medium text-center text-gray-600">
          Start your journey into Web3 now!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 pt-1">
        {chapters.map((chapter: any, i: number) => {
          return (
            <div className="col-span-4 md:col-span-2">
              <div className="p-6 border bg-white rounded-lg">
                <Link
                  to={`/chapters${chapter.path}`}
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-font dark:text-white">
                    Chapter #{i + 1}: {chapter.name}
                  </h5>
                </Link>
                <div className="grid bg-slate-50 mb-5 border border-green/20 h-32 place-items-center">
                  <img
                    className="object-cover object-center mx-auto rounded h-20 "
                    alt="hero"
                    src={chapter.url}
                  />
                </div>

                <Link
                  to={`/chapters${chapter.path}`}
                  className="mt-3 mr-3 text-blue-600 w-full"
                >
                  <button
                    disabled={!chapter.enabled}
                    className={`${
                      chapter.enabled ? "bg-green" : "bg-gray-300"
                    } rounded-lg ${
                      chapter.enabled ? "hover:bg-green-dark" : ""
                    } text-white font-bold py-2 px-4 rounded-full`}
                  >
                    Los!
                  </button>
                </Link>
                {!chapter.done ? (
                  <button
                    onClick={() => finishChapter(chapter.id)}
                    className={`bg-green rounded-lg ${
                      chapter.enabled ? "hover:bg-green-dark" : ""
                    } text-white font-bold py-2 px-4 rounded-full`}
                  >
                    Complete
                  </button>
                ) : (
                  <button
                    onClick={() => resetChapter(chapter.id)}
                    className={`bg-white rounded-lg ${
                      chapter.enabled ? "hover:bg-green-dark" : ""
                    } text-green font-bold py-2 px-4 rounded-full`}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
