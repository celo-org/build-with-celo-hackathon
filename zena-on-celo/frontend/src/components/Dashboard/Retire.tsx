import { useSession } from "../../utils/hooks";
import { FaEnvira } from "react-icons/fa";

export default function Retire() {
  const { user } = useSession();
  const finishedChapters = user?.stats ? Object.values(user?.stats) : [];
  const counter = finishedChapters?.filter((chapter) => chapter === "1").length;
  if (counter !== 6) return null;
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
    </div>
  );
}
