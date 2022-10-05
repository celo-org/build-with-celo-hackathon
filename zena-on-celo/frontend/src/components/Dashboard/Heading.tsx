import { useRecoilState } from "recoil";
import { userState } from "../../utils/store";

export default function Heading() {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <div style={{ height: 80, backgroundColor: "#2E9469" }}></div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              style={{ backgroundColor: "aliceblue" }}
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={user.imageUrl}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-font">
                Hallo {user.name}!
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-font">
            Hallo {user.name}!
          </h1>
        </div>
      </div>
    </div>
  );
}
