import { useState } from "react";
import Final from "../components/Onboarding/Final";
import Step1 from "../components/Onboarding/Step1";
// import Step2 from "../components/Onboarding/Step2";
import Step3 from "../components/Onboarding/Step3";
import { User, useSession } from "../utils/hooks";
import { useRouter } from "next/router";

export default function Onboarding() {
  const router = useRouter();
  const { isLoggedIn } = useSession();
  const [step, setStep] = useState(1);
  console.log(isLoggedIn);

  const [userData, setUserData] = useState<User>();
  if (isLoggedIn && process.browser) router.push("/dashboard");

  return (
    <div className="grid h-screen place-items-center">
      {step === 1 && <Step1 setUserData={setUserData} userData={userData} />}
      {step === 2 && <Step3 setUserData={setUserData} userData={userData} />}
      {step === 3 && <Final userData={userData} />}
      {/* {step === 4 && <Final />} */}

      <button
        onClick={() =>
          step === 3 && process.browser
            ? router.push("/dashboard")
            : setStep(step + 1)
        }
        className="bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
      >
        Weiter
      </button>
    </div>
  );
}
