import sys

from web3 import Web3
from web3.auto import w3

from celo_sdk.contracts.base_wrapper import BaseWrapper
from celo_sdk.registry import Registry
from celo_sdk.wallet import Wallet


class Kit:
    """
    Main class through which all the functionality is accessible.
    With this class you can configure Wallet parameters, set new keys for the wallet, get totall address balance and network configs.

    Attributes:
        provider_url: str
            url address of Celo node
        wallet: Wallet (optional)
    """
    def __init__(self, provider_url: str, wallet: Wallet = None):
        if provider_url.find(".ipc") == len(provider_url) - 4:
            provider = Web3.IPCProvider(provider_url)
        elif provider_url.startswith("ws://"):
            provider = Web3.WebsocketProvider(provider_url)
        else:
            provider = Web3.HTTPProvider(provider_url)
        self.w3 = Web3(provider)
        registry = Registry(self.w3)
        registry.set_registry()
        gas_price_contract = BaseWrapper.get_gas_price_contract(self.w3, registry)
        self.__wallet = self.create_wallet(gas_price_contract)
        self.base_wrapper = BaseWrapper(self.w3, registry, self.__wallet)
        self.__wallet.fee_currency = self.base_wrapper.registry.load_contract_by_name("StableToken")['address']

    @property
    def wallet(self):
        return self.__wallet

    @wallet.setter
    def wallet(self, wallet: Wallet):
        if type(wallet) == Wallet:
            self.__wallet = wallet
        else:
            raise Exception("Only Wallet object can be set to the Kit")

    @wallet.setter
    def wallet_fee_currency(self, fee_currency: str):
        self.__wallet.fee_currency = fee_currency

    @wallet.setter
    def wallet_gateway_fee_recipient(self, gateway_fee_recipient: str):
        self.__wallet.gateway_fee_recipient = gateway_fee_recipient

    @wallet.setter
    def wallet_gateway_fee(self, gateway_fee: int):
        self.__wallet.gateway_fee = gateway_fee

    @wallet.setter
    def wallet_gas_price(self, gas_price: int):
        self.__wallet.gas_price = gas_price

    @wallet.setter
    def wallet_gas(self, gas: int):
        self.__wallet.gas = gas

    @wallet.setter
    def wallet_add_new_key(self, priv_key: bytes):
        self.__wallet.add_new_key(priv_key)

    @wallet.setter
    def wallet_change_account(self, account_address: str):
        self.__wallet.change_account(account_address)

    def create_wallet(self, registry: Registry, priv_key: bytes = None):
        if not priv_key:
            priv_key = self.generate_new_key()
        wallet = Wallet(self.w3, priv_key, registry)
        return wallet

    def generate_new_key(self):
        acct = w3.eth.account.create()
        return acct.privateKey

    def get_total_balance(self, address: str) -> dict:
        celo_token = self.base_wrapper.create_and_get_contract_by_name('GoldToken')
        stable_token = self.base_wrapper.create_and_get_contract_by_name('StableToken')
        locked_celo = self.base_wrapper.create_and_get_contract_by_name('LockedGold')

        gold_balance = celo_token.balance_of(address)
        locked_balance = locked_celo.get_account_total_locked_gold(address)
        dollar_balance = stable_token.balance_of(address)
        pending = 0
        try:
            pending = locked_celo.get_pending_withdrawals_total_value(address)
        except:
            pass # Just means that it's not an account
        return {
            'CELO': gold_balance,
            'locked_CELO': locked_balance,
            'cUSD': dollar_balance,
            'pending': pending
        }

    def get_network_config(self):
        token1 = self.base_wrapper.registry.registry.functions.getAddressForString('GoldToken')
        token2 = self.base_wrapper.registry.registry.functions.getAddressForString('StableToken')

        exchange_contract = self.base_wrapper.create_and_get_contract_by_name('Exchange')
        election_contract = self.base_wrapper.create_and_get_contract_by_name('Election')
        attestation_contract = self.base_wrapper.create_and_get_contract_by_name('Attestation')
        governance_contract = self.base_wrapper.create_and_get_contract_by_name('Governance')
        locked_gold_contract = self.base_wrapper.create_and_get_contract_by_name('LockedGold')
        sorted_oracles_contract = self.base_wrapper.create_and_get_contract_by_name('SortedOracles')
        gas_price_minimum_contract = self.base_wrapper.create_and_get_contract_by_name('GasPriceMinimum')
        reserve_contract = self.base_wrapper.create_and_get_contract_by_name('Reserve')
        stable_token_contract = self.base_wrapper.create_and_get_contract_by_name('StableToken')
        validators_contract = self.base_wrapper.create_and_get_contract_by_name('Validators')
        downtime_slasher_contract = self.base_wrapper.create_and_get_contract_by_name('DowntimeSlasher')

        return {
            'exchange': exchange_contract.get_config(),
            'election': election_contract.get_config(),
            'attestation': attestation_contract.get_config([token1, token2]),
            'governance': governance_contract.get_config(),
            'locked_gold': locked_gold_contract.get_config(),
            'sorted_oracles': sorted_oracles_contract.get_config(),
            'gas_price_minimum': gas_price_minimum_contract.get_config(),
            'reserve': reserve_contract.get_config(),
            'stable_token': stable_token_contract.get_config(),
            'validators': validators_contract.get_config(),
            'downtime_slasher': downtime_slasher_contract.get_config()
        }

    def deploy_contract(self, contract_abi: list = None, bytecode: str = None) -> str:

        prepared_tx = self.w3.eth.contract(abi=contract_abi, bytecode=bytecode).constructor()

        return self.__wallet.send_transaction(prepared_tx)
