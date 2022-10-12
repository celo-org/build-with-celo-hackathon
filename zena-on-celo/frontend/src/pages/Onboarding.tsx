import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Final from "../components/Onboarding/Final";
import Step1 from "../components/Onboarding/Step1";
// import Step2 from "../components/Onboarding/Step2";
import Step3 from "../components/Onboarding/Step3";

export default function Onboarding() {
  let navigate = useNavigate();
  useEffect(() => {
    const session = localStorage.getItem("zena-session");
    if (session) {
      navigate("/dashboard");
    }
  }, [localStorage]);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
  });
  console.log(userData);

  return (
    <div className="grid h-screen place-items-center">
      {step === 1 && <Step1 setUserData={setUserData} userData={userData} />}
      {step === 2 && <Step3 setUserData={setUserData} userData={userData} />}
      {step === 3 && <Final userData={userData} />}
      {/* {step === 4 && <Final />} */}

      <button
        onClick={() =>
          step === 3 ? navigate("/dashboard") : setStep(step + 1)
        }
        className="bg-green hover:bg-green-medium text-white font-bold py-2 px-4 rounded-full"
      >
        Weiter
      </button>
    </div>
  );
}
