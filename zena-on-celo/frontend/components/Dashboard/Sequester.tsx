import { useSession } from "../../utils/hooks";
import { FaEnvira } from "react-icons/fa";
import axios from "axios";

export default function Sequester() {
  const { user } = useSession() as any;
  const finishedChapters = user?.stats ? Object.values(user?.stats) : [];
  const counter = finishedChapters?.filter((chapter) => chapter === "1").length;
  if (counter !== 6) return null;

  const mintNFT = async () => {
    const result = await axios(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/1/mintNFT`
    );
    console.log(result);
  };

  return (
    <div className="container mx-auto pt-6 pb-6 text-center">
      <p className="text-xl">
        Awesome! You finished all chapters! <br />
        Get ready to catch some carbon!!
      </p>
      <p className="flex items-center justify-center">
        <FaEnvira color="green" size="30" />
        <FaEnvira color="green" size="20" />
        <FaEnvira color="green" size="10" />
      </p>
      <button
        className={`bg-green m-5 rounded-lg hover:bg-green-dark text-white font-bold py-2 px-4 rounded-full`}
        // disabled={isLoading}
        onClick={() => mintNFT()}
      >
        Mint
      </button>
    </div>
  );
}
