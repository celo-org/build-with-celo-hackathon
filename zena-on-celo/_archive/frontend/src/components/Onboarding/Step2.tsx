export default function Step2() {
  return (
    <section className="bg-white dark:bg-gray-900 mt-24">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-font dark:text-white">
            Wie ist deine E-Mailadresse?
          </h2>
          {/* <p className="mb-6 font-light text-font-light dark:text-gray-400 md:text-lg">
            Wir brauchen nur einen Vornamen oder Spitznamen.
          </p> */}
        </div>
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
          <label
            htmlFor="email"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-font"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full border-0 p-0 text-font placeholder-gray-500 focus:ring-0 text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
