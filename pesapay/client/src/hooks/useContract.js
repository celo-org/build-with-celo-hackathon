import {ethers} from "ethers"
const createInstance = (address, abi,provider) => {

  const contract = new ethers.Contract(address, abi, provider)
  return contract
}

export default createInstance
