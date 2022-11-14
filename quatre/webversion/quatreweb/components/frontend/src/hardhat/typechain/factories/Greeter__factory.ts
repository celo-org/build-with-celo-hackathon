/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Greeter } from "../Greeter";

export class Greeter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(_greet: string, overrides?: Overrides): Promise<Greeter> {
    return super.deploy(_greet, overrides || {}) as Promise<Greeter>;
  }
  getDeployTransaction(
    _greet: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_greet, overrides || {});
  }
  attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greet",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "greeting",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "newGreeting",
    type: "event",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000906380380620009068339810160408190526200003491620001e2565b62000064604051806060016040528060228152602001620008e460229139826200008160201b6200022f1760201c565b805162000079906000906020840190620000f3565b505062000337565b620000ce82826040516024016200009a929190620002c8565b60408051601f198184030181529190526020810180516001600160e01b03908116634b5c427760e01b17909152620000d216565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546200010190620002fa565b90600052602060002090601f01602090048101928262000125576000855562000170565b82601f106200014057805160ff191683800117855562000170565b8280016001018555821562000170579182015b828111156200017057825182559160200191906001019062000153565b506200017e92915062000182565b5090565b5b808211156200017e576000815560010162000183565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620001cc578181015183820152602001620001b2565b83811115620001dc576000848401525b50505050565b600060208284031215620001f557600080fd5b81516001600160401b03808211156200020d57600080fd5b818401915084601f8301126200022257600080fd5b81518181111562000237576200023762000199565b604051601f8201601f19908116603f0116810190838211818310171562000262576200026262000199565b816040528281528760208487010111156200027c57600080fd5b6200028f836020830160208801620001af565b979650505050505050565b60008151808452620002b4816020860160208601620001af565b601f01601f19169290920160200192915050565b604081526000620002dd60408301856200029a565b8281036020840152620002f181856200029a565b95945050505050565b600181811c908216806200030f57607f821691505b602082108114156200033157634e487b7160e01b600052602260045260246000fd5b50919050565b61059d80620003476000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610050575b600080fd5b61004e61004936600461037e565b61006e565b005b61005861019d565b604051610065919061043d565b60405180910390f35b610151604051806060016040528060238152602001610545602391396000805461009790610457565b80601f01602080910402602001604051908101604052809291908181526020018280546100c390610457565b80156101105780601f106100e557610100808354040283529160200191610110565b820191906000526020600020905b8154815290600101906020018083116100f357829003601f168201915b505050505084848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061027892505050565b61015d600083836102e5565b507f0b015bbae892f882530638e35656b992f6d80ba21f981e783510a13dbe53d43d82823360405161019193929190610492565b60405180910390a15050565b6060600080546101ac90610457565b80601f01602080910402602001604051908101604052809291908181526020018280546101d890610457565b80156102255780601f106101fa57610100808354040283529160200191610225565b820191906000526020600020905b81548152906001019060200180831161020857829003601f168201915b5050505050905090565b61027482826040516024016102459291906104d3565b60408051601f198184030181529190526020810180516001600160e01b0316634b5c427760e01b1790526102c4565b5050565b6102bf83838360405160240161029093929190610501565b60408051601f198184030181529190526020810180516001600160e01b0316632ced7cef60e01b1790526102c4565b505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546102f190610457565b90600052602060002090601f0160209004810192826103135760008555610359565b82601f1061032c5782800160ff19823516178555610359565b82800160010185558215610359579182015b8281111561035957823582559160200191906001019061033e565b50610365929150610369565b5090565b5b80821115610365576000815560010161036a565b6000806020838503121561039157600080fd5b823567ffffffffffffffff808211156103a957600080fd5b818501915085601f8301126103bd57600080fd5b8135818111156103cc57600080fd5b8660208285010111156103de57600080fd5b60209290920196919550909350505050565b6000815180845260005b81811015610416576020818501810151868301820152016103fa565b81811115610428576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061045060208301846103f0565b9392505050565b600181811c9082168061046b57607f821691505b6020821081141561048c57634e487b7160e01b600052602260045260246000fd5b50919050565b6040815282604082015282846060830137600060608483018101919091526001600160a01b03929092166020820152601f909201601f191690910101919050565b6040815260006104e660408301856103f0565b82810360208401526104f881856103f0565b95945050505050565b60608152600061051460608301866103f0565b828103602084015261052681866103f0565b9050828103604084015261053a81856103f0565b969550505050505056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a2646970667358221220074e1048ae76fa8d59857a3a9e010cbb93c5b4e1fc85f61aa765ba2c3c11776f64736f6c634300080900334465706c6f79696e67206120477265657465722077697468206772656574696e673a";