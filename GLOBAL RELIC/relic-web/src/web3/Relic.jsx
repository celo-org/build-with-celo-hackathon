import Web3 from "web3";
import { ethers } from "ethers";
import { newKitFromWeb3 } from "@celo/contractkit";

import address from "../abis/RelicCFaddress.json";
import abi from "../abis/contracts/RelicCF.sol/RelicCF.json";
import { ALFAJORES_PARAMS } from "../config.networks";
import { getGlobalState, setGlobalState } from "../store/index";

const { ethereum } = window;
const relicContractAddress = address.address;
const relicContractAbi = abi.abi;

const web3 = new Web3(ethereum);
const kit = newKitFromWeb3(web3);

const toWei = (value) => {
  const baseValue = ethers.utils.parseEther(value, "ether");
  return baseValue;
};

// check if the wallet is connected
const isWalletConnected = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })
    
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload()
        })

        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedWalletAddress', accounts[0])
          })

          if (accounts.length !== 0) {
            setGlobalState('connectedWalletAddress', accounts[0])
            await isWalletConnected()
            await loadRelicCFContract()
          } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
          }

    } catch (error) {
        console.log(error);
    }
}

// connect to a meta mask wallet
// TODO: Change to use react-celo
const connectWallet = async () => {
  try {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [ALFAJORES_PARAMS],
    });

    if (!ethereum) return alert("Please install Metamask");

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedWalletAddress", accounts[0]);
    console.log("Connected to", accounts[0]);
  } catch (error) {
    reportError(error);
  }
};

// load relicCF contract
const loadRelicCFContract = async () => {
  const connectedWalletAddress = getGlobalState("connectedWalletAddress");

  if (connectedWalletAddress) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const relicCFContract = new ethers.Contract(
      relicContractAddress,
      relicContractAbi,
      signer
    );

    console.log("RelicCF contract loaded 2", relicCFContract);

    // const kit = newKitFromWeb3(new Web3(ethereum))
    // new kit.web3.eth.Contract(relicContractAbi, relicContractAddress)

    return relicCFContract;
  } else {
    return getGlobalState('relicCFContract');
  }
};

// const disconnectWallet = async () => {
//     try {
//         const { disconnect } = useCelo();
//         await disconnect();
//         setGlobalState('Disconnected from address', '');
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getWalletAddress = async () => {
//     try {
//         const { address } = useCelo();
//         return address;
//     } catch (error) {
//         console.log(error);
//     }
// }

// getWalletBalance

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    // const connectedWalletAddress = getGlobalState("connectedWalletAddress");
    const relicCFContract = await loadRelicCFContract();
    console.log("relic contract loaded 1", relicCFContract);
    // cost = toWei(cost)
    // const cost = new BigNumber(baseValue).shiftedBy(ERC20_DECIMALS).toString()

    // const cost = kit.web3.utils.toWei('1000000000', 'ether')
    // const costInWei = new BigNumber(cost).shiftedBy(18).toString()
    // console.log("cost in wei",costInWei)
    // cost = kit.web3.utils.toWei(cost, 'ether')
    // const costInWei = '2'

    // kit.web3.utils.toWei(cost,'ether')

    // const costInWeiBN = new BigNumber(cost).multipliedBy(new BigNumber(10).pow(decimals)).toString()
    // cost = Web3.utils.asciiToHex(cost, 'ether')
    // console.log("cost is not okay", cost)

    // const amount = '10'
    // kit.web3.utils.toWei(weiCost, 'ether').toFixed()
    // const amount = BigNumber.from(cost)
    // cost = kit.web3.utils.toWei(cost, 'ether')
    cost = toWei(cost);
    // const cost = BigNumber.from(weiCost).mul(BigNumber.from(10).pow(decimals))
    console.log("to wei", cost);

    const txn = await relicCFContract.createProject(title, description, imageURL, cost, expiresAt);
    console.log("Campaign created", txn);

    await getProjects();
    // window.location.reload()
  } catch (error) {
    console.log("good error 1", error);
    // reportError(error)
  }
};

const getProjects = async () => {
  try {
    const relicCFContract = await loadRelicCFContract();

    const projects = await relicCFContract.getProjects();
    const stats = await relicCFContract.stats();

    setGlobalState('stats', relicCFStatistics(stats));
    setGlobalState('projects', relicCFProjects(projects));
    console.log("All Projects.. ", projects);
    console.log("All Statistics.. ", stats);
  } catch (error) {
    console.log("good error 2", error);
    // reportError(error)
  }
};

const getProject = async (id) => {
  try {
    const relicCFContract = await loadRelicCFContract();
    let project = await relicCFContract.getProject(id);
    project = relicCFProjects([project])[0]
    console.log("Project", project);

    setGlobalState('project', project);
  } catch (error) {
    reportError(error);
  }
};

const updateProject = async ({  id, title, description, imageURL, expiresAt }) => {
    try {
    if (!ethereum) return alert('Please install Metamask')

    const relicCFContract = await loadRelicCFContract();

    await relicCFContract.updateProject(id, title, description, imageURL, expiresAt)
    } catch (error) {
        console.log(error)
    } 

}

const deleteProject = async(id) => {
    try{
        if (!ethereum) return alert('Please install Metamask')
        const relicCFContract = await loadRelicCFContract();

        await relicCFContract.deleteProject(id)


    } catch (error) {
        console.log(error)
    } 
}

const contributeToProject = async (id, amount) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedWalletAddress = getGlobalState("connectedWalletAddress");
    const relicCFContract = await loadRelicCFContract();
    amount = toWei(amount);

    const txn = await relicCFContract.backProject(id, {
      from: connectedWalletAddress,
      value: amount._hex,
    });

    console.log("Contribution made", txn);
    // await getProjects();
    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const getContributers = async (id) => {
    try {
        const relicCFContract = await loadRelicCFContract();
        let backers = await relicCFContract.getBackers(id);

        console.log("Backers", backers);
        setGlobalState('backers', relicCFBackers(backers));
    } catch (error) {
        console.log(error);
    }

}

const requestRefundProject = async (id) => {
    try {
        if (!ethereum) return alert("Please install Metamask");
        const connectedWalletAddress = getGlobalState("connectedWalletAddress");
        const relicCFContract = await loadRelicCFContract();

        const txn = await relicCFContract.requestRefund(id, {
            from: connectedWalletAddress,
        });

        console.log("Refund made", txn);
        // await getProjects();
        // window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

const payoutProject = async(id) => {
    try {
        if (!ethereum) return alert("Please install Metamask");
        const connectedWalletAddress = getGlobalState("connectedWalletAddress");
        const relicCFContract = await loadRelicCFContract();

        const txn = await relicCFContract.payOutProject(id, {
            from: connectedWalletAddress,
        });

        console.log("Payout made", txn);
        // await getProjects();
        // window.location.reload();
    } catch (error) {
        console.log(error);
    }
}


const relicCFBackers = (backers) =>
 backers
  .map((backer) => ({
    owner: backer.owner,
    refunded: backer.refunded,
    timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
    contribution: parseInt(backer.contribution._hex) / 10 ** 18,
  }))
  .reverse()

const relicCFProjects = (projects) =>
  projects.map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner,
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      backers: project.backers.toNumber(),
      status: project.status,
    })).reverse();

const relicCFStatistics = (stats) => ({
  totalProjects: stats.totalProjects.toNumber(),
  totalContributions: stats.totalBacking.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
});

const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

// convert from wei
// const convertFromWei = async(value) => {
//     return kit.web3.utils.fromWei(value.toString(), 'ether')
// }

// const reportError = (error) => {
//     console.log(error.message)
//     throw new Error('No Celo object.')
//   }

export {
  isWalletConnected,
  loadRelicCFContract,
  connectWallet,
  createProject,
  contributeToProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getContributers,
  requestRefundProject,
  payoutProject,
};
