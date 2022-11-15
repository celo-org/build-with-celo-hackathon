export default function StepperControl({ handleClick, currentStep, steps }) {
    return (
        <div style={{ display: 'flex' }} className="mt-2 justify-around">
            <button
                onClick={() => handleClick()}
                className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
                    }`}
            >
                {currentStep === 1 ? "Cancel" : "Back"}
            </button>

            <button
                onClick={() => handleClick("next")}
                className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
            >
                {currentStep === steps.length ? "Confirm" : "Next"}
            </button>
        </div>
    );
}