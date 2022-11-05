
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
We outline here an idea that would allow decentralized donations and crowdfunding of projects that aim to re-value people in harsh economic and personal conditions by providing them with psychological support and access to education and job opportunities. 

LifeLoop vision is to create a crowdfunding platform that seeks to disrupt classical online donation systems. By committing to safe and traceable Blockchanin transactions, we want to address the issue of donation transparency and show to donors how their contributions benefit the person or cause subject of the donation. As an innovation compared to classical donations, we introduce the concept of project checkpoints (every project is an NFT associated with the given person/cause; the contract manages the project's funds and defines a re-valuation journey). Checkpoints define all the steps in the person's re-valuation path, safeguard donors by partially refunding contributions if something goes wrong, and provide the stakeholders with a way to monitor and evaluate the progress of the beneficiary of the donation.

More details about the project vision and business model can be found in [LifeLoop Introduction Paper](https://drive.google.com/file/d/1CQMc-bzPPEutZ7qFWDDHVEGrwb1QvpLV/view?usp=sharing).
 - For an in-depth description on how a project workflow would be defined once the solution has been fully developed, please refer to chapter 4.

### Getting started
This repository contains a submodule named `lifeloop` that points to https://github.com/ricCap/projectz. The other repository contains automation, code scanning and a deployment on Github Pages that we wanted to keep during development. Hence changes will be committed to that repository.

You can initialize the submodule using `git submodule init` in the lifeloop folder. Then run `git submodule update --remote`. You can then follow the instructions in the submodule [README](lifeloop/README.md) to start using the app.

A preview of the project MVP can be found [here](https://riccap.github.io/projectz/).

Please refer to the project [wiki](https://github.com/ricCap/projectz/wiki) for an additional stripped version of the project value proposition and business model.

### Next Steps
The project is still in an early phase of development. Hence, many next steps can be identified before reaching a fully working prototype. Some are (Note that the deepest the list goes, the further in the future these goals are set): 
[ ] Test refunding operations
[ ] Extract funds handling abilities into a separate contract (to reduce contract size and security issues)
[ ] Build Front-End Mock-up
[ ] Re-write Front-End taking into consideration Mock-up and best development practices
[ ] Create first MVP containing a small functioning test project

### URLs
Set of additional relevant URLs to the project:
- 🎙️ [Investors' Pitch](https://drive.google.com/file/d/1K4M5nS9k1M0Re_4zybH45jQxt3gg8vO9/view?usp=sharing)
- 📊 [Website Flowchart](https://drive.google.com/file/d/15u7l0IsHWaQd8tggTYZ3Xqqe2TKuSgur/view?usp=sharing)

#### License
[MIT](https://github.com/ricCap/projectz/blob/main/LICENSE.md)

<!-- #### Project Description
Provide a clear statement of the challenges/issues/problems/gaps your project engages as well as a brief, high-level description of how your project engages the areas you've identified. What is the value of your approach? Who are the intended users?

#### Summary
Describe the basic functionality of your project. What are the features you were able to implement? What features would you like to implement?

#### Presentation
List any links to your presentation or any related visuals you want to share.

#### License
This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/). -->
