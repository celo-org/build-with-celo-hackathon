import { useEffect, useState } from "react";
import { User } from "../../utils/hooks";

type Props = {
  setUserData: Function;
  userData?: User;
};

export default function Step3({ setUserData, userData }: Props) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setUserData({
      ...userData,
      avatar: `https://avatars.dicebear.com/api/avataaars/${avatar}`,
    });
  }, [avatar]);

  return (
    <section className="bg-white dark:bg-gray-900 mt-24">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-font dark:text-white">
            Please choose an Avatar!
          </h2>
        </div>
        <div>
          <div className="flex lg:flex-nowrap flex-wrap justify-center">
            <div
              className="w-4/12 md:w-6/12 px-4"
              onClick={() => setAvatar("teste.svg")}
            >
              <img
                src="https://avatars.dicebear.com/api/avataaars/teste.svg"
                alt="avatar"
                className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${
                  avatar === "test.svge" ? "p-1 ring-2 ring-green-dark" : ""
                }`}
              />
            </div>
            <div
              className="w-4/12 md:w-6/12 px-4"
              onClick={() => setAvatar("rik.svg")}
            >
              <img
                src="https://avatars.dicebear.com/api/avataaars/rik.svg"
                alt="avatar"
                className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${
                  avatar === "rik.svg" ? "p-1 ring-2 ring-green-dark" : ""
                }`}
              />
            </div>
            <div
              className="w-4/12 md:w-6/12 px-4"
              onClick={() => setAvatar("alf.svg")}
            >
              <img
                src="https://avatars.dicebear.com/api/avataaars/alf.svg"
                alt="avatar"
                className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${
                  avatar === "alf.svg" ? "p-1 ring-2 ring-green-dark" : ""
                }`}
              />
            </div>
            <div
              className="w-4/12 md:w-6/12 px-4"
              onClick={() => setAvatar("kar.svg")}
            >
              <img
                src="https://avatars.dicebear.com/api/avataaars/kar.svg"
                alt="avatar"
                className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${
                  avatar === "kar.svg" ? "p-1 ring-2 ring-green-dark" : ""
                }`}
              />
            </div>
            <div
              className="w-4/12 md:w-6/12 px-4"
              onClick={() => setAvatar("kars.svg")}
            >
              <img
                src="https://avatars.dicebear.com/api/avataaars/kars.svg"
                alt="avatar"
                className={`shadow rounded-full max-w-full h-auto align-middle border-none cursor-pointer ${
                  avatar === "kars.svg" ? "p-1 ring-2 ring-green-dark" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
