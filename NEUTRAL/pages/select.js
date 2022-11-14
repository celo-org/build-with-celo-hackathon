import { useRouter } from "next/router";
export default function Select() {
  const Router = useRouter();
  const toPayment = () => {
    Router.push("/payment");
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={toPayment}
            className="w-24 h-24 text-sm bg-black text-white flex justify-center items-center"
          >
            Project 1
          </button>
          <button
            onClick={toPayment}
            className="w-24 h-24 text-sm bg-black text-white flex justify-center items-center"
          >
            Project 2
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={toPayment}
            className="w-24 h-24 text-sm bg-black text-white flex justify-center items-center"
          >
            Project 3
          </button>
          <button
            onClick={toPayment}
            className="w-24 h-24 text-sm bg-black text-white flex justify-center items-center"
          >
            Project 4
          </button>
        </div>
      </div>
    </main>
  );
}
