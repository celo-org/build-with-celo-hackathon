import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useSession } from "../../utils/hooks";

export default function Stats() {
  const { user } = useSession();
  const { width, height } = useWindowSize();
  const finishedChapters = user?.stats ? Object.values(user?.stats) : [];
  const counter = finishedChapters?.filter((chapter) => chapter === "1").length;
  return (
    <div className="container mx-auto pt-6">
      {counter === 6 ? (
        <Confetti recycle={false} width={width} height={height} />
      ) : null}

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <div className="flex">
            Chapters finished: ({counter}/6){" "}
            <QuestionMarkCircleIcon width="15" />
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              style={{ width: `${(counter * 100) / 6}%` }}
              className="h-6 bg-[#c761c5] rounded-full dark:bg-blue-500"
            ></div>
          </div>
        </div>

        {/* <div className="col-span-3">
          <div className="flex">
            Punkte (18/60) <QuestionMarkCircleIcon width="15" />
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              style={{ width: "25%" }}
              className="h-6 bg-blue rounded-full dark:bg-green-dark"
            ></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
