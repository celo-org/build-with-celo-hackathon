flashmini
================
This repository contains a simple, mechanical system for discovering, evaluating, rating, and submitting arbitrage opportunities to the flashbots bundle endpoint. This script is very unlikely to be profitable, as many users have access to it, and it is targeting well-known Ethereum opportunities.

We hope you will use this repository as an example of how to integrate flashbots into your own Flashbot searcher (bot). For more information, see the [flashbots Searcher FAQ](https://docs.flashbots.net/flashbots-auction/searchers/faq)

Environment Variables
=====================
- **ETHEREUM_RPC_URL** - Ethereum RPC endpoint. Can not be the same as flashbots_RPC_URL
- **PRIVATE_KEY** - Private key for the Ethereum EOA that will be submitting flashbots Ethereum transactions
- **flashbots_RELAY_SIGNING_KEY** _[Optional, default: random]_ - flashbots submissions require an Ethereum private key to sign transaction payloads. This newly-created account does not need to hold any funds or correlate to any on-chain activity, it just needs to be used across multiple flashbots RPC requests to identify requests related to same searcher. Please see https://docs.flashbots.net/flashbots-auction/searchers/faq#do-i-need-authentication-to-access-the-flashbots-relay
- **HEALTHCHECK_URL** _[Optional]_ - Health check URL, hit only after successfully submitting a bundle.
- **MINER_REWARD_PERCENTAGE** _[Optional, default 80]_ - 0 -> 100, what percentage of overall profitability to send to miner.

Usage
======================
1. Generate a new bot wallet address and extract the private key into a raw 32-byte format.
2. Deploy the included BundleExecutor.sol to Ethereum, from a secured account, with the address of the newly created wallet as the constructor argument
3. Transfer WETH to the newly deployed BundleExecutor

_It is important to keep both the bot wallet private key and bundleExecutor owner private key secure. The bot wallet attempts to not lose WETH inside an arbitrage, but a malicious user would be able to drain the contract._

```
$ npm install
$ PRIVATE_KEY=__PRIVATE_KEY_FROM_ABOVE__ \
    BUNDLE_EXECUTOR_ADDRESS=__DEPLOYED_ADDRESS_FROM_ABOVE__ \
    flashbots_RELAY_SIGNING_KEY=__RANDOM_ETHEREUM_PRIVATE_KEY__ \
      npm run start
```
