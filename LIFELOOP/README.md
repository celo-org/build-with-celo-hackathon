
# ♾️ LifeLoop ♾️

## Project Name
LifeLoop, Re-Fi for People

### Team name
LifeLoop

### Hackathon Track
SocialFi

### Region location
We are located all around Europe:
 - 🇦🇹 Austria x1
 - 🇧🇪 Belgium x1
 - 🇮🇹 Italy x3

### Team Members
- Mattia Molon, developer (Data Science)
- Riccardo Capraro, developer (DevOps/Cloud)
- Other three non-develpers are actively working on this project's business model
    - Leonardo della Fontana (Business)
    - Vincenzo Barella (Business and Finance)
    - Filippo Vergnanini (STEM)

### Summary
LifeLoop aims to become a decentralized crowdfunding platform to help re-value people in harsh economic and personal conditions, by providing them with psychological support and access to education and job opportunities. 

LifeLoop's vision is to create a crowdfunding platform that seeks to disrupt classical online donation systems. By committing to safe and traceable Blockchain transactions, we want to address the issue of donations transparency and show to donors how their contributions benefit the target person or initiative. As an innovation compared to classical donations we introduce the concept of project checkpoints (every project is an NFT associated with the given person or initiative; the contract manages the project's funds and defines a re-valuation journey). Checkpoints define all the steps in the person's re-valuation path, safeguard donors by partially refunding contributions if something goes wrong, and provide the stakeholders with a way to monitor and evaluate the progress of the beneficiary of the donation.

More details about the project vision and business model can be found in the [LifeLoop Introduction Paper](https://drive.google.com/file/d/1CQMc-bzPPEutZ7qFWDDHVEGrwb1QvpLV/view?usp=sharing); chapter 4 describes the project workflow we aim to implement in our project.

### Getting started
This repository contains a submodule named `lifeloop` that points to https://github.com/ricCap/projectz. The other repository contains automation, code scanning and a deployment on Github Pages that we wanted to keep during development. Hence changes will be committed to that repository.

You can initialize the submodule using `git submodule init` in the lifeloop folder. Then run `git submodule update --remote`. You can then follow the instructions in the submodule [README](lifeloop/README.md) to start using the app.

A preview of the project MVP can be found [here](https://riccap.github.io/projectz/). During development, we focused on making sure the contracts were well tested, and used the web prototype to test that we could execute the same transactions using wallets such as the Celo Chrome extension or Valora.

Please refer to the project [wiki](https://github.com/ricCap/projectz/wiki) for an additional stripped version of the project value proposition and business model.

### Current status
- [x] CI, contracts scanning, linting and other automation in place
- [x] automated deployment of the app on Github Pages
- [x] app mockup (using SolidJs and contractKit), deployed contracts on Alfajores
- [x] testing of the contracts
  - locally using hardhat
  - locally using ganache (to fork Alfajores); required for tests that need to interact with the cUSD contract
  - remotely against Alfajores
- [x] test contract with end-to-end workflow implemented: project created, donations, project started, partners approve checkpoints, project ends.

### Demo
Below a video showcasing some of the app functionalities.

The **contracts** structure is the following:
- a Manager contract that owns the other contracts of the application
- an AddressBook control that provides access control functionalities
- a contract named MasterZTemplate that contains the logic for an e2e example of a project
- other libraries and contracts that are either examples or contain shared functionalities

From the **application** we can (on Alfajores):
* list project templates and the projects created from those templates
* create a project
* display project details
* donate cUSD to a project

### How to test it locally
Follow the instruction in the guide on the main [repo](https://riccap.github.io/projectz/). You will need at least a wallet that contains some cUSD on Alfajores to test the application locally. Please add a comment in the PR if you need any help.

### Next Steps
The project is still in an early phase of development. Hence, many next steps can be identified before reaching a fully working prototype.
- [ ] Test refunding operations
- [ ] Extract funds handling abilities into a separate contract (to reduce contract size and security issues)
- [ ] Build fully-fledged Front-End Mock-up
- [ ] Re-write Front-End taking into consideration Mock-up
- [ ] Create first MVP containing a project with a real-life use case in mind

### URLs
Set of additional relevant URLs to the project:
- 🎙️ [Investors' Pitch](https://drive.google.com/file/d/1K4M5nS9k1M0Re_4zybH45jQxt3gg8vO9/view?usp=sharing)
- 📊 [Website Flowchart](https://drive.google.com/file/d/15u7l0IsHWaQd8tggTYZ3Xqqe2TKuSgur/view?usp=sharing)

#### License
[MIT](https://github.com/ricCap/projectz/blob/main/LICENSE.md)
