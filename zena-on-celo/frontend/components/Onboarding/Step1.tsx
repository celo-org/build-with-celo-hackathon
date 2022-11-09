import { User } from "../../utils/hooks";

type Props = {
  setUserData: Function;
  userData?: User;
};

export default function Step1({ setUserData, userData }: Props) {
  return (
    <section className="bg-white dark:bg-gray-900 mt-24">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-font dark:text-white">
            What's your name?{" "}
          </h2>
        </div>
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-font"
          >
            Name
          </label>
          <input
            onChange={(e) =>
              setUserData({
                ...userData,
                name: e.target.value,
              })
            }
            type="text"
            name="name"
            id="name"
            className="block w-full border-0 p-0 text-font placeholder-gray-500 focus:ring-0 text-lg"
          />
        </div>
      </div>
    </section>
  );
}
