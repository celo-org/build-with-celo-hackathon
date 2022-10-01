import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Final() {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} />
      <section className="bg-white dark:bg-gray-900 mt-24">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-font dark:text-white">
              Super! Lass uns starten!
            </h2>
            {/* <p className="mb-6 font-light text-font-light dark:text-gray-400 md:text-lg">
      Wir brauchen nur einen Vornamen oder Spitznamen.
    </p> */}
          </div>
        </div>
      </section>
    </>
  );
}
