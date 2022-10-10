from celo_sdk.kit import Kit

kit = Kit('https://alfajores-forno.celo-testnet.org')
currency_address = kit.base_wrapper.registry.load_contract_by_name('StableToken')['address']
kit.wallet_fee_currency = currency_address
print("checked")
