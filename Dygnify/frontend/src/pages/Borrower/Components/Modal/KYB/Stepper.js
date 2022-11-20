import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1 ? "w-full items-center" : "items-center"
        }
        style={{ display: "flex" }}
      >
        <div
          style={{ display: "flex" }}
          className="relative flex-col items-center text-white"
        >
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 items-center justify-center py-3  ${
              step.selected
                ? "bg-[#6047FF] text-white font-bold border border-[#6047FF]"
                : ""
            }`}
            style={{ display: "flex" }}
          >
            {index + 1}
          </div>
          <div
            className={`absolute top-0 w-32 text-center mt-16 text-xs font-medium  ${
              step.highlighted ? "text-white" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
            step.completed ? "border-[#6047FF]" : "border-gray-300 "
          }  `}
        ></div>
      </div>
    );
  });

  return (
    <div
      style={{ display: "flex" }}
      className="w-1/2 mx-auto justify-between items-center"
    >
      {stepsDisplay}
    </div>
  );
};
export default Stepper;
