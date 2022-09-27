import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoMdArrowDropdown } from "react-icons/io";

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple text-primary-light font-semibold rounded-xl py-2 px-4"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 text-primary-light font-semibold rounded-xl py-2 px-4"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    className="bg-[#1A1B1F] text-white font-semibold rounded-lg py-2 px-4"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    <div className="hidden md:block">{chain.name}</div>
                    <IoMdArrowDropdown className="ml-1 text-2xl" />
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex bg-[#1A1B1F] text-white font-semibold rounded-lg"
                  >
                    <div className="font-semibold m-auto px-2 md:px-4">
                      {account.displayBalance ? account.displayBalance : ""}
                    </div>

                    <div className="flex items-center bg-[#3A3B3E] rounded-lg py-2 px-2 md:px-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-grad-green via-grad-blue to-grad-purple">
                        {account.displayName}
                      </span>
                      <IoMdArrowDropdown className="ml-1 text-md md:text-2xl" />
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
