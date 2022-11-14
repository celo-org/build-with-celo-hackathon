import { ethers } from "ethers";
// import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// import * as digesu from "../../backend/frontend/src/hardhat/deployments/testnet/Digesu.json";

function displayErrorMessage(error, setmessage) {
  let msg = "";
  if (error?.data?.message === "Cannot read properties of undefined (reading 'match')") {
    msg = "Internet unstable.";
  } else if (error?.data?.message === "Internal JSON-RPC error.") {
    msg = "Transaction will likely fail";
  } else if (error?.data?.code === 3) {
    msg = "Not enough fund in wallet or band is filled";
  } else if (error?.data?.message === "execution reverted: : User exist. Innermost error is at 0x22a7…0d0a: Vm reverted. User exist.") {
    msg = "Transaction failed: User is the creator.";
  } else if (error?.data?.message === "execution reverted: : User exist. Innermost error is at 0x0267…53c0: Vm reverted. User exist.") {
    msg = "Transaction failed: User already in band.";
  } else {
    console.log("ERRor", error);
    msg = error?.data?.message || error?.message;
    if (msg.length > 150) msg = "Could not complete task";
  }
  return setmessage(msg);
}

function sendtransaction() {
  // const { Moralis } = useMoralis()
  return {
    sendTransaction: async function(options) {
      let success;
      let isRunning = true;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider || provider === "undefined") {
        return setmessage("Please select network");
      }
      try {
        const isUnlocked = await window.ethereum._metamask.isUnlocked();
        if (!isUnlocked) {
          return setmessage("Please unlock wallet");
        }
        setmessage("Transaction processing...");
        setInProgress(10);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(options.contractAddress, options.abi, provider);
        const signer = provider.getSigner();
        const connectedSigner = contractInstance.connect(signer);
        while (isRunning) {
          setmessage("Transaction sent");
          setInProgress(60);
          switch (options?.functionName?.toLowerCase()) {
            case 'launchabandnonstrictmode':
            console.log("public",options)
            console.log("id hevf9dnifodfodiofifvinjpfofjkpofkdpofk")
              await connectedSigner.launchABandNonStrictMode(options.params?.quorum, options.params?.amount, options.params?.durationInDays, options.params?.colFactor, { value: options.value })
                .then((r) => r? success = true : success = false);
              break;
            
            case 'launchabandstrictmode':
              await connectedSigner.launchABandStrictMode(options.params?.participants, options.params?.amount, options.params?.durationInDays, options.params?.colFactor, { value: options.value })
              .then((r) => r? success = true : success = false);
              break;

            case 'status':
              switch (options.statusName.toLowerCase()) {
                case 'completesignup':
                  await connectedSigner.completeSignUp({ value: options?.value })
                  .then((r) => r? success = true : success = false);
                  break;
              
                default:
                  await connectedSigner.joinABand(options.params?.poolid, { value: options?.value })
                  .then((r) => r? success = true : success = false);
                  break;
              }
              break;

            case 'getfinance':
              await connectedSigner.getFinance().then((r) => r? success = true : success = false);
              break;
            
            case 'payback':
              await connectedSigner.payBack({ value: options?.msgValue }).then((r) => r? success = true : success = false);
              break;

            case 'claim':
              await connectedSigner.claim().then((r) => r? success = true : success = false);
              break;

            case 'liquidate':
              await connectedSigner.liquidate().then((r) => r? success = true : success = false);
              break;

            case 'absorb':
              await connectedSigner.absorb({ value: funcValue }).then((r) => r? success = true : success = false);
              break;
            
            default:
              await connectedSigner.completeTheRound().then((r) => r? success = true : success = false);
              break;
          }

          if (success) {
            setInProgress(100);
            setmessage("Transaction finalized");
            isRunning = false;
            break;
          }
        }
      } catch (error) {
        success = false;
        return displayErrorMessage(error, setmessage);
      }
      return success;
    },

    read: async function (options) {
      let result = null;
      if (!options.contractAddress) return result;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider) {
        return setmessage("Connection not ready ...");
      }
      const contractInstance = new ethers.Contract(options.contractAddress, options.abi, provider);
      switch (options?.functionName) {
        case 'getPools':
          console.log(options)
          // console.log("asaaasid hevf9dnifodfodiofifvinjpfofjkpofkdpofk")
          // result = await Moralis.executeFunction(options);
          result = await contractInstance.getPools(options?.params.target);
          break;
        
        case 'getAllInfo':
          result = contractInstance.getAllInfo(options?.account);
          break;

        default:
          result = contractInstance.balanceOf(options?.account);
          break;
      }
      return result;
    },
   
  };
}

export default sendtransaction;



















// import { ethers } from "ethers";
// // import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// // import * as digesu from "../../backend/frontend/src/hardhat/deployments/testnet/Digesu.json";
// interface Data{
//   message: string;
//   code: number;
// }

// interface Error {
//   data : Data;
//   message: string;
// }
// function displayErrorMessage(error: Error, setmessage: Function) {
//   let msg = "";
//   if (error.data.message === "Cannot read properties of undefined (reading 'match')") {
//     msg = "Internet unstable.";
//   } else if (error.data.message === "Internal JSON-RPC error.") {
//     msg = "Transaction will likely fail";
//   } else if (error.data.code === 3) {
//     msg = "Not enough fund in wallet or band is filled";
//   } else if (error.data.message === "execution reverted: : User exist. Innermost error is at 0x22a7…0d0a: Vm reverted. User exist.") {
//     msg = "Transaction failed: User is the creator.";
//   } else if (error.data.message === "execution reverted: : User exist. Innermost error is at 0x0267…53c0: Vm reverted. User exist.") {
//     msg = "Transaction failed: User already in band.";
//   } else {
//     console.log("ERRor", error);
//     msg = error.data.message || error.message;
//     if (msg.length > 150) msg = "Could not complete task";
//   }
//   return setmessage(msg);
// }

// function sendtransaction(setmessage:Function) {
//   // const { Moralis } = useMoralis()
//   return {
//     sendTransaction: async function(options: any, setInProgress: Function) {
//       let success: boolean;
//       let isRunning = true;
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       if (!provider) {
//         return setmessage("Please select network");
//       }
//       try {
//         const isUnlocked = await window.ethereum._metamask.isUnlocked();
//         if (!isUnlocked) {
//           return setmessage("Please unlock wallet");
//         }
//         setmessage("Transaction processing...");
//         setInProgress(10);
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contractInstance = new ethers.Contract(options.contractAddress, options.abi, provider);
//         const signer = provider.getSigner();
//         const connectedSigner = contractInstance.connect(signer);
//         while (isRunning) {
//           setmessage("Transaction sent");
//           setInProgress(60);
//           switch (options?.functionName?.toLowerCase()) {
//             case 'launchabandnonstrictmode':
//             console.log("public",options)
//             console.log("id hevf9dnifodfodiofifvinjpfofjkpofkdpofk")
//               await connectedSigner.launchABandNonStrictMode(options.params?.quorum, options.params?.amount, options.params?.durationInDays, options.params?.colFactor, { value: options.value })
//                 .then((r: any) => r? success = true : success = false);
//               break;
            
//             case 'launchabandstrictmode':
//               await connectedSigner.launchABandStrictMode(options.params?.participants, options.params?.amount, options.params?.durationInDays, options.params?.colFactor, { value: options.value })
//               .then((r: any) => r? success = true : success = false);
//               break;

//             case 'status':
//               switch (options.statusName.toLowerCase()) {
//                 case 'completesignup':
//                   await connectedSigner.completeSignUp({ value: options?.value })
//                   .then((r: any) => r? success = true : success = false);
//                   break;
              
//                 default:
//                   await connectedSigner.joinABand(options.params?.poolid, { value: options?.value })
//                   .then((r: any) => r? success = true : success = false);
//                   break;
//               }
//               break;

//             case 'getfinance':
//               await connectedSigner.getFinance().then((r: any) => r? success = true : success = false);
//               break;
            
//             case 'payback':
//               await connectedSigner.payBack({ value: options?.msgValue }).then((r: any) => r? success = true : success = false);
//               break;

//             case 'claim':
//               await connectedSigner.claim().then((r: any) => r? success = true : success = false);
//               break;

//             case 'liquidate':
//               await connectedSigner.liquidate().then((r: any) => r? success = true : success = false);
//               break;

//             case 'absorb':
//               await connectedSigner.absorb().then((r: any) => r? success = true : success = false);
//               break;
            
//             default:
//               await connectedSigner.completeTheRound().then((r: any) => r? success = true : success = false);
//               break;
//           }

//           if (success) {
//             setInProgress(100);
//             setmessage("Transaction finalized");
//             isRunning = false;
//             break;
//           }
//         }
//       } catch (error) {
//         success = false;
//         return displayErrorMessage(error, setmessage);
//       }
//       return success;
//     },

//     read: async function (options: any) {
//       let result = null;
//       if (!options.contractAddress) return result;
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       if (!provider) {
//         return setmessage("Connection not ready ...");
//       }
//       const contractInstance = new ethers.Contract(options.contractAddress, options.abi, provider);
//       switch (options?.functionName) {
//         case 'getPools':
//           console.log(options)
//           console.log("asaaasid hevf9dnifodfodiofifvinjpfofjkpofkdpofk")
//           // result = await Moralis.executeFunction(options);
//           result = await contractInstance.getPools(options?.params.target);
//           break;
        
//         case 'getAllInfo':
//           result = contractInstance.getAllInfo(options?.account);
//           break;

//         default:
//           result = contractInstance.balanceOf(options?.account);
//           break;
//       }
//       return result;
//     },
   
//   };
// }

// export default sendtransaction;