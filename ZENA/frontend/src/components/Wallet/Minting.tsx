import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mintState, userState } from "../../utils/store";

export default function Minting() {
  const [shouldMint, setMint] = useRecoilState(mintState);
  const [isProcessing, setProcessing] = useState(false);
  const [isDone, setDone] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (isProcessing) {
      setTimeout(() => {
        setDone(true);
        setProcessing(false);
        setUser((u) => {
          return { ...u, nft: u.nft + 1 };
        });
      }, 3000);
    }
  }, [isProcessing]);

  if (!shouldMint) return null;

  if (isDone) {
    return (
      <div className="rounded-md bg-green-50 p-4 mt-1 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Juhu! Dein NFT wurde erfolgreich gemintet!
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md bg-yellow-50 p-4 mb-12">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Du bist gerade dabei, einen NFT zu minten.
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p className="mb-8">
                Diese Aktion würde 0.001 GoerliETH Gebühren kosten. Bitte gib
                die Transaktion frei.
              </p>
              <p>
                <button
                  onClick={() => setProcessing(true)}
                  className="animate-bounce bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
                >
                  {isProcessing ? "Bitte warten ..." : "Freigeben"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
