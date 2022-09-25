/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import {ethers} from "ethers";

const getUserInterval = (getUser, setLegatee, setLastSeen, setInterval) => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const legacyAddress = "0x3113ee4eD0637F2f0EE49Eeb0cFF8D7cAf2D79A8";
          const legacyAbi = ["function legacies(uint256) view returns (address, address, uint256, uint256, bool)",
            "function legacyIndexes(address owner) view returns(uint256)"
          ];
          const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
          console.log(legacy);
          //TODO
          //Display loader

          legacy.legacyIndexes(getUser()).then((index) => {
            legacy.legacies(Number(index)).then((res) => {
              setLegatee(res[1]);
              //Convert lastSeen to minutes (just for the sake of demo)
              let ls = Math.floor( ((Number(new Date()) / 1000) - Number(res[2])) / (3600 * 24) );
              setLastSeen(ls === 0 ? "Today" : `${ls} days ago`);
              //Convert checkInterval to seconds (just for the sake of demo)
              const secs = Number(res[3]);
              const intervalMins = Math.floor(secs / (3600 * 24));
              setInterval(`Every ${intervalMins} days`);
            })
          })
        } catch (error) {
          // toaster.danger('An error occured!')
          return;
        }
};

export default getUserInterval;