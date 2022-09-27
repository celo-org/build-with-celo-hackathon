import React from "react";
import { FiAlertCircle } from "react-icons/fi";

function Contribute() {
  return (
    <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-xl mt-4">
      <div className="relative bg-primary-dull border border-primary-light p-4 m-1 py-10 rounded-xl h-auto">
        <h3 className="text-xl text-center font-medium text-secondary">
          <FiAlertCircle className="inline mr-2 mb-1" />
          Contribute to the network every 24 hours or less to help others earn
          rewards on their Staking while earning rewards yourself.
        </h3>
        <h3 className="text-xl text-center font-bold text-secondary my-3">
          "When you help others, others help you because together we can grow
          more."
        </h3>
        <h3 className="text-xl text-center font-medium text-secondary">
          <span className="font-bold">Note: </span>
          If you do not contribute to the system within 24 hours of your last
          contribution, you would not be rewarded when others contribute to the
          system. Your reward cycle will start again when you contribute again
          to the network.
        </h3>
        <button className="w-full text-primary-dark font-semibold bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-full mt-4 py-3 px-6">
          CONTRIBUTE
        </button>
      </div>
    </div>
  );
}

export default Contribute;
