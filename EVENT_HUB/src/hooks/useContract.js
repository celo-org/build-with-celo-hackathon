
import { useState } from 'react'
import { useCelo } from '@celo/react-celo'
import EventHub from '../artifacts/contracts/EventHub.sol/EventHub.json'
const eventHubContractAddress = '0x3D093B7C47334D00aCA5bD8dBC1443c67f6Eb2f0'

export const useContract = async () => {
  const { kit } = useCelo()
  const [contract, setContract] = useState('')
  setContract(new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress))
  return [contract]
}
