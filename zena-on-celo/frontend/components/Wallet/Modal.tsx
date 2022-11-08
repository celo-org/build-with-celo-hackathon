import { mintState, walletOpenState } from "../../utils/store";
import { useRecoilState } from "recoil";
// import tree from "../../images/tree.jpg";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Content from "./Content";
import { useSession } from "../../utils/hooks";

const { REACT_APP_USER_ADDRESS } = process.env;

export default function Modal() {
  const { user } = useSession();

  const [open, setOpen] = useRecoilState(walletOpenState);
  const [_, setMint] = useRecoilState(mintState);

  if (!open) return null;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div>
                  <div id="medium-modal" tabIndex={-1}>
                    <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between p-5 rounded-t border-b dark:border-gray-600">
                          <div className="ml-4 mt-4">
                            <h2 className="text-2xl font-bold leading-7 text-font sm:truncate sm:text-3xl sm:tracking-tight">
                              {user?.name}&apos;s Wallet
                            </h2>

                            <p className="mt-1 text-sm text-font-light">
                              Öffentliche Adresse: {REACT_APP_USER_ADDRESS}
                            </p>
                          </div>
                          <h3 className="text-xl font-medium text-font dark:text-white"></h3>
                          <button
                            onClick={() => {
                              setMint(false);
                              setOpen(false);
                            }}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-font rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="medium-modal"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>
                        <Content />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
