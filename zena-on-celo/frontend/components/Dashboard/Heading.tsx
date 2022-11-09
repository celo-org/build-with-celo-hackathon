import { useSession } from "../../utils/hooks";

export default function Heading() {
  const { user } = useSession();

  return (
    <div>
      <div style={{ height: 80, backgroundColor: "#2E9469" }}></div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              style={{ backgroundColor: "aliceblue" }}
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={user?.avatar}
              alt=""
            />
          </div>
          <div className="mt-12 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt 12 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="mb-4 mt-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Hello{" "}
                <span className="underline underline-offset-3 decoration-8 decoration-pink-400 dark:decoration-blue-600">
                  {user?.name}!
                </span>
                !
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-12 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hello{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              {user?.name}!
            </span>
            !
          </h1>
        </div>
      </div>
    </div>
  );
}
