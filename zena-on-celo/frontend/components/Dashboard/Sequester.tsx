import { useSession } from "../../utils/hooks";
import { FaEnvira } from "react-icons/fa";
import axios from "axios";

export default function Sequester() {
  const { user } = useSession() as any;
  const finishedChapters = user?.stats ? Object.values(user?.stats) : [];
  const counter = finishedChapters?.filter((chapter) => chapter === "1").length;

  const mintNFT = async () => {
    const result = await axios(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/1/mintNFT`
    );
    console.log(result);
  };
  console.log(counter);

  if (counter === 0) {
    return (
      <div className="container mx-auto pt-6 pb-6 text-center">
        <div className="mt-8 md:mt-0 md:order-1">
          <div className="inline-flex items-center">
            Finish some chapters, and watch a tree grow!
          </div>
        </div>
      </div>
    );
  }

  if (counter < 7 && counter > 0) {
    return (
      <div className="container mx-auto pt-6 pb-6 text-center">
        <div className="mt-8 md:mt-0 md:order-1">
          <div className="inline-flex items-center">
            <img
              className="h-200 w-200"
              src={`/tree_${counter.toString()}.png`}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-6 pb-6 text-center">
      <p className="text-xl text-center mb-6">
        Awesome! You finished all chapters! <br />
        Get ready to catch some carbon!!
      </p>
      <img className="h-200 w-200  inline-block" src={`/tree_6.png`} alt="" />
      <button
        className={`bg-green m-5 rounded-lg hover:bg-green-dark text-white font-bold py-2 px-4 rounded-full`}
        // disabled={isLoading}
        onClick={() => mintNFT()}
      >
        Mint your NFT!
      </button>
    </div>
  );
}
