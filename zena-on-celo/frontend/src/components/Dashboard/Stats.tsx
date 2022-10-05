import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Stats() {
  return (
    <div className="container mx-auto pt-6">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <div className="flex">
            Kapitel (2/6) <QuestionMarkCircleIcon width="15" />
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              style={{ width: "30%" }}
              className="h-6 bg-green rounded-full dark:bg-blue-500"
            ></div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex">
            Punkte (18/60) <QuestionMarkCircleIcon width="15" />
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              style={{ width: "25%" }}
              className="h-6 bg-blue rounded-full dark:bg-green-dark"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
