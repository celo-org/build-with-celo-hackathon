## Project Name

Koral Protocol

### Team

- Koral Earth

### Hackathon Track

- ReFi (SocialFi)

### Region location

- Europe

### Team Members

- Caleb Lucas, Engineering
- Nadia Sergejuk, Product

### Project Description

As of today, there is a lot of desire among businesses and individuals to calculate their carbon footprints. However, the conversion rate for offsetting these footprints is still relatively low. We can see this in airlines that try to compel their users to offset their footprints - users calculate their footprints but don't offset them. The same can be said about other carbon footprint offsetting apps (e.g. Wren, Climony, etc.).

Studies about human psychology show that incentives can be used to drive action. We also believe that, if leveraged correctly, incentives can be used to usher in a new phase in carbon offsetting. Many carbon-offsetting-enabled apps and products already provide some form of reward. However, the array of options is very limited. Providing more array of options is important. Building the infrastructure required to provide those array of options is even more important.

At Koral Earth, we're building a sustainable rewards protocol that is designed to foster an ecosystem where carbon offsetting is transparently rewardable.

The protocol:

- enables businesses and their users to engage with and invest in carbon-offsetting projects

- enables businesses to create a web3 native ecosystem of perks and rewards for their users

- helps with the distribution of funds to the Global South where carbon-offsetting projects and environmental technologies are winning ground

### Summary

At the protocol's core, businesses should be enabled to create their own unique ecosystem of carbon-offsetting projects and define reward definition, acquisition, redemption, ownership and reputation control for users/partners interacting with these ecosystems.

Partners and users should also be able to integrate seamlessly with this ecosystem using the toolings we will build.

For the hackathon, we've implemented a PoC for one of the components of this ecosystem: a basic liquidity pool + reward definition & redemption smart contract. The ecosystem comprises of a list of carbon-offsetting projects from the Toucan Protocol and allows users to financially contribute to and get rewards from the ecosystem. We've also implemented a frontend application to demonstrate how end-users may interact with the ecosystem.

Since this is a PoC, it is only deployed on the Alfajores testnet. However, we'd like to improve the ecosystem implementation and move to mainnet. We'd also like to improve the test coverage for the contracts and dapp.

### URLs

- [Frontend App](https://build-with-celo-hackathon.koral.earth/)

- [Liquidity Pool + Reward Definition & Redemption Smart Contract](https://alfajores.celoscan.io/address/0xf8637613926ccb0a59af7df0fe295b1e8677ea3b)

### Presentation

TBD

### Next Steps

Build tools to enable:

- creation and deployment of reward ecosystems

- routing of funds in the liquidity pool directly to projects

- partner integration with the reward ecosystems

### Project Usage

To use this project you need to do the following:

#### Intall dependendencies:

To install dependencies, run:

```bash
npm i && cd app && npm i
```

#### Prepare env variables

- First run:

```bash
cp .env.example .env && cd app && cp .env.example .env.local
```

- Next, fill in the env variables in the root `.env` and the app's `.env.local` files

#### Testing

From the project root, run:

```bash
npm test
```

#### Running Dapp

- From project root, run:

```bash
npm run start:dapp
```

**NB:** The app will run based on whatever value you specified for `NEXT_PUBLIC_BLOCKCHAIN_NETWORK` in the `app/.env.local` file.
If you specify `ganache`, then you'd need to deploy the smart contracts to the ganache network

#### Deploy smart contracts locally

First, you need to ensure that you have ganache running locally. You also need to ensure that all variables in the root `.env`
are filled in correctly. Importantly, you need to ensure that you specify `ganache` as the value for `DEPLOYMENT_NETWORK`.

Then run:

```bash
npm run deploy:contracts
```

### License

This software is licensed under the [GPL v3 License](./LICENSE)
