import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Title from "../components/Chapter/Title";
import Layout from "../components/Layout";
import tree from "../images/tree.jpg"; // Tell webpack this JS file uses this image
import { mintState, walletOpenState } from "../utils/store";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const NFTStep1 = () => {
  return (
    <p className="p-5">
      Im Gegensatz zu fungiblen Token (z. B. Ether) ist ein NFT ein
      einzigartiger digitaler Vermögenswert und der Besitznachweis wird auf der
      Blockchain festgeschrieben.
    </p>
  );
};

const NFTStep2 = () => {
  return (
    <p className="p-5">
      Minten bedeutet so viel wie Prägung. Digitale Dateien werden in
      verschlüsselte Sammlerstücke umgewandelt. Sobald digitale Objekte auf der
      Blockchain gespeichert sind, ist eine Umwandlung oder Löschung nicht mehr
      möglich.
    </p>
  );
};

const NFTQuiz = ({ step, setStep }: any) => {
  return (
    <>
      <form>
        <fieldset className="mt-6">
          <legend className="text-base font-medium text-font">
            Teste dein Wissen über NFTs!
          </legend>
          {/* <p className="text-sm text-font-light">
          These are delivered via SMS to your mobile phone.
        </p> */}
          <div className="mt-4 space-y-4">
            <p className="text-left">Wofür steht fungibel?</p>
            <div className="flex items-center">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-everything" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  austauschbar
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-email" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  nicht austauschbar
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-nothing" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Fußpilz
                </span>
              </label>
            </div>
          </div>
        </fieldset>
      </form>
      <form>
        <fieldset>
          <div className="mt-4 space-y-4">
            <p className="text-left">
              Was wird beim Minten auf der Blockchain festgehalten?{" "}
            </p>
            <div className="flex items-center">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-everything" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Die NFT-Bilddatei
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-email" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  ein Eigentumsrecht
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-nothing" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Minze
                </span>
              </label>
            </div>
          </div>
        </fieldset>
      </form>
      <form>
        {" "}
        <fieldset>
          <div className="mt-4 space-y-4">
            <p className="text-left">Was kann man mit einem NFT machen?</p>
            <div className="flex items-center">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-everything" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Minten
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-email" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Essen
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-nothing" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Verkaufen
                </span>
              </label>
            </div>
          </div>
        </fieldset>
        <button
          onClick={() => {
            setStep(step + 1);
          }}
          className="bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
        >
          Absenden
        </button>
      </form>
    </>
  );
};

const NFTMint = ({ step, setStep }: any) => {
  const [shouldMint, setMint] = useRecoilState(mintState);
  const [open, setOpen] = useRecoilState(walletOpenState);

  return (
    <>
      <img style={{ display: "unset", width: 200 }} src={tree} alt="Baum" />
      <p className="p-5">
        Hier stellen wir dir ein NFT-Projekt vor: Mit dem Minten dieses Baum
        NFTs pflanzt die Community pro NFT einen Baum. Wenn du den NFT mintest,
        wird dein Eigentum auf der Blockchain festgeschrieben.
      </p>

      <button
        onClick={() => {
          setOpen(true);
          setMint(true);
          setStep(step + 1);
        }}
        className="bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
      >
        Jetzt minten
      </button>
    </>
  );
};

const NFTSuccess = () => {
  const { width, height } = useWindowSize();
  let navigate = useNavigate();

  return (
    <>
      <Confetti width={width} height={height} />
      <section className="bg-white dark:bg-gray-900 mt-24">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-font dark:text-white">
              Super! Du hast deinen ersten NFT gemintet und alle Frage richtig
              beantwortet!
            </h2>
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
            >
              Zurück zum Dashboard
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default function Chapter() {
  const [step, setStep] = useState(1);
  let params = useParams();
  const NFT = () => {
    return (
      <div className="container pt-12">
        <Title title={"Kapitel 3: NFTs"} />
        {step === 1 && <NFTStep1 />}
        {step === 2 && <NFTStep2 />}
        {step === 3 && <NFTMint step={step} setStep={setStep} />}
        {step === 4 && <NFTQuiz step={step} setStep={setStep} />}
        {step === 5 && <NFTSuccess />}
      </div>
    );
  };

  return (
    <Layout>
      <div className="mx-auto text-center">
        <div className="mx-auto max-w-3xl">
          {(params as any).chapterId === "3" && <NFT />}

          {(step === 1 || step === 2) && (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
            >
              Weiter
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
