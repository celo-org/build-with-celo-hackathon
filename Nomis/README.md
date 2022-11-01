## Nomis <> Celo

### Team Name: The Nomis Team

#### Hackathon Track: DeFi

##### Region location: Czechia

##### Team Members

Every team member has a successful track record in developing and commercializing of IT- and blockchain-related products. Our competitive advantage is a solid technical capability to build a best-in-class credit score solution: 15-years experience and 8 patents in neural networks R&D, >40 scientific papers on AI.

- **Fedor Cherepanov**, *CTO*
- **Nickolay Chebotov**, *Core developer*
- **Alex Barabash**, *CEO*
- **Vitalii Agapov**, *Project manager*

---

#### Project Description

##### Problem

The most significant barriers to entry and adoption of the whole DeFi lending industry are over-collateralization and lack of reputation-based terms. Mainstream borrowers are either not using DeFi lending due to its unattractiveness as a financial product comparing to TradFi lending, or taking over-collateralized loans with unfair collaterals, APR, and liquidation terms. In other words, today's DeFi lending sucks: - 125%+ collateral factor scares away mainstream borrowers; - Collateral liquidation terms are often unclear and make it even more unattractive; - There are no personalized terms even if a user has 'good' on-chain history.

##### How Nomis Solves this Problem

**Nomis is an open-source credit score protocol that helps DeFi developers both to build healthier on-chain solutions and use cases, and to balance already existing high-TVL protocols**. Every lending/borrowing platform will be able to create extremely customized loan terms for borrowers by using Nomis API.

Moreover, Nomis is designed to be a multi/cross-chain solution and offer the most robust financial snapshot of a potential borrower by hiring hierarchy analysis as a scoring method.

- **From the borrowers' perspective**, Nomis will crush the entry- and adoption- barriers to DeFi lending by making it as attractive as today's TradFi lending BUT for everyone.
- **From the developers’ perspective**, Nomis will help them to build better DeFi products by enabling to customize their initial lending/borrowing terms on a case-by-case basis. DeFi developers will have more power over their business models and differentiation points.
- **From the protocols’ perspective**, Nomis will help them to grow their TVL, MAU (acquisition of mainstream borrowers), MAD (monthly active developers), and # of on-chain use cases (new DeFi solutions built on-top of the Nomis open-source protocol).

##### How we built it

1. We hired CeloScan API to get wallet, transaction and NFT-movement data.
2. We constructed variables, based on the data extracted, which can be received via Nomis API.
3. Finally, we hired our mathematical model to develop Nomis (credit) Score based on the constructed variabled.

Our solution is based on the .NET 6 platform and the ASP Net Core framework. We used the Docker toolset to build and deploy the solution. To build, run the command below: `docker build -f src/Nomis.Web.Server.Common/Dockerfile -t nomis-celo . docker -dp 80:80 nomis-celo`

---

#### Summary

What we plan to build during the Hack:

1. **Off-chain credit score + UI for Celo wallets** based on their transaction and wallet data, and our mathematical model behind that (reference: MVP for ETH wallets).
2. **API, documentation + UI for Celo developers**: every Every lending/borrowing platform will be able to create extremely customized loan terms for end-borrowers by using wallet credit scores via Nomis API. At this stage of the development, Nomis will become a turnkey (UI + API) cost-cutting (by setting customers free from the credit score-related R&D costs) solution for Celo lending/borrowing protocols.
3. **DST: Decentralized Score Token**, non-transferable dynamic NFT which contains wallet’s current credit score. By the end of the Hack, every Celo user will be able to mint her own DST and use her on-chain reputation as a part of collateral.

#### URLs

- Reference: [MVP for Ethereum wallets](https://nomis.cc/)
- [Whitepaper](https://www.notion.so/e859b9e3bae6412fb99d6119a8d2e5a4)
- [Github](https://github.com/Nomis-cc)

#### Presentation

- [Pitchdeck](https://www.figma.com/proto/a1okJbaUfCObPpNJlxTFCt/Nomis-Slides-Sep'22?node-id=2%3A2&scaling=contain&page-id=0%3A1)


#### Next Steps

We aspire to become a turnkey cost-cutting (by setting protocols free from the credit score-related R&D costs) solution for every lending/borrowing protocol which helps it to grow revenue by enabling one to offer extremely customized initial terms (today) and under-collateralized loans (tomorrow). We plan to hire one of the B2B- or Web3-related business models (e.g., API subscription or utility tokens) further.

#### License

Nomis is licensed under the [Apache License 2.0](https://github.com/Nomis-cc/build-with-celo-hackathon/blob/nomis/LICENSE).
