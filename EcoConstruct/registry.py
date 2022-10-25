import json
from typing import List
from pkg_resources import resource_filename


class Registry:
    """
    It will get every contract address from the registry contract and return this address with the contract ABI.

    Attributes
        web3: web3.Web3
            web3 object
    """

    def __init__(self, web3="Web3 object"):
        self.web3 = web3

    def load_all_contracts(self) -> List[dict]:
        """
        Return addresses and ABIs of all the known contracts
        """
        try:
            with open(resource_filename('celo_sdk', 'registry_contracts.json')) as json_file:
                contracts_data = json.load(json_file)
                result = []
                for k, v in contracts_data.items():
                    if k != "Registry":
                        contract_address = self.registry.functions.getAddressForString(
                            k).call()
                        result.append(
                            {"contract_name": k, "address": contract_address, "abi": v["ABI"]})
                return result
        except KeyError:
            raise KeyError(
                "Key not found in registry_contracts.json config file")
        except FileNotFoundError:
            raise FileNotFoundError(
                "File with contracts ABIs registry_contracts.json not found")

    def load_contract_by_name(self, contract_name: str, contract_address: str = None) -> dict:
        """
        Get contract address from Registry contract by name

        Parameters:
            contract_name: str
        Returns:
            dictionary with contract address and ABI
        """
        try:
            account_contract_address = self.registry.functions.getAddressForString(
                contract_name).call() if contract_address == None else contract_address
            with open(resource_filename('celo_sdk', 'registry_contracts.json')) as json_file:
                contracts_data = json.load(json_file)
                return {"address": account_contract_address, "abi": contracts_data[contract_name]["ABI"]}
        except KeyError:
            raise KeyError(
                "Key not found in registry_contracts.json config file")
        except FileNotFoundError:
            raise FileNotFoundError(
                "File with contracts ABIs registry_contracts.json not found")

    def set_registry(self):
        """
        Set Registry contract object
        """
        try:
            with open(resource_filename('celo_sdk', 'registry_contracts.json')) as json_file:
                contracts_data = json.load(json_file)
                registry = self.web3.eth.contract(
                    contracts_data["Registry"]["Address"], abi=contracts_data["Registry"]["ABI"])
                self.registry = registry
        except KeyError:
            raise KeyError(
                "Key not found in registry_contracts.json config file")
        except FileNotFoundError:
            raise FileNotFoundError(
                "File with contracts ABIs registry_contracts.json not found")
