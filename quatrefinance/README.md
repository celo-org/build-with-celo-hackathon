
# ⚡ Hackathon Project Template ⚡
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._

## Quatrefinance
### Quatrefinance
#### ReFi

##### Africa, Nigeria

##### Team Members
- Tserundede Godswill, *Project Administrator/engineer*.
- Isaac J, Coordinator, *Full stack Developer - Solidity, Web2/Web3 development, Frontend, other*
- Gbenga Olotu, *Frontend*
- Progress Ojemeh, *Frontend*

#### Project Description
At Quatrefinance, we are building `Digesu` (Our first MVP) to launch on **[CELO](https://celo.org)**. Digesu picks after a well-known African financial culture (often called Esusu or Ajo), where two or more people usually between 2 to 10 form a group to raise capital for different purposes, with a view to make all participants benefit same way. The process involves funding each participant with equitably contributed funds in a rotational order usually on first-come-first-serve basis with no interest element. Alternatively, they would also use it as a method of saving. As simple as it sounds, it has become a subject of debate, and many people are afraid of committing to it due to the drawbacks.

Irrespective of the odds, it has become the major source of raising fund for many Africans. This evidences how much people crave for financial freedom. If diligently examined, the system, at a good percent encourages financial inclusion, effect of which is reflected in economy healthiness. 

Unarguably, traditional systems such as MicroFinance and institutions who offer supposed solutions, often, reinvent the wheel. With rigid condition, they are mostly not suitable for the common.

### Problems:

  - The biggest challenge is trusting others with money.
  - Some participants join with the motive to abscond with contributed fund.
  - The rule `"Time is money"` is not well-respected.
  - Participants are limited to the people they know such as family, friends and/or neighbors. This hinders the ability to expand contribution base.
  <!-- - Many supposed solutions aren't the right tool for the job hence they reinvented the problems. -->

  Since `trust` is a major issue to deal with hence the questions:

  - Will the next paticipants fulfill their obligation?
  - Will they pay back in full?
  - How do we get our money if they default?
  - I do not know Bob hence I cant peer-fund with him.

  
#### How we solve it

Quater **Digesu** was conceived to uphold the social spirit while providing solutions to the aforementioned problems. Think of a system that: 
 - connects people with different financial goals from different part  of the world, 
 - harmonizes them into a community, 
 - accepts and coordinate deposits from each of the participants,
 - enforces a set of rules,
 - rotates contributed fund among participants until everyone of them is reached with near-zero interest,
 - ensures that current beneficiary fulfils their obligation,
 - treats all of them equally,
 - creates a trustless atmosphere and reward participants for doing what is right.

Unlike the tranditionl method, a participant does need not be aware of the existenece of other participants or trust that they will act in good faith. Digesu as a solution uses a high level of abstraction to simplify interactivity such as : participants do not worry whether current beneficiary will fulfill their obligation or not. Blockchain technology has helped us to achieve all of these with the introduction of smart contract system, And we are decentralizing but refining to accomodate even the less tech-savvy ones. Celo platform will give us the opportunity to leverage her SDKs to reach out to a wider audience who do not ordinarily subscribe to web3 technicalities. 

#### Summary And Functionality
People from the same community or anyone anywhere in the world can participate by launching a new community for themselves or join existing ones. When an user creates a closed community, they restrict participation to the preregistered participants. Put it, a closely related group of people could raise capital among themselves by approaching Digesu to create an agreement binding on all the participants with commitments, at the same time enforce the agreement.

Each of the participants is treated as the borrower and the lender which nullifies the `interest` element. **Public band** is ideal for borrowers and lenders looking to join an existing community. `Note` : Anyone can launch a public band. The differences and similarities are itemize below

Configuration | PUBLIC | PRIVATE
-------- | ------------ | -----------
Create | Anyone | Anyone from the group
No of expected participants (i.e Quorum) | Set by the creator at construction | Supplies list of participants' addresses at construction
Interest charge | - | -
Interval | Set at construction | Same as public
Collateral Index | Sets at construction | Same as public

Some basic functionalities:
  - CreateBand
  - JoinABand
  - GetFinance
  - Payback

#### URLs
  **[Figma UI and prototype - Desktop & Mobile designs](https://www.figma.com/file/eAK52TVb7n0HTwlNvtb4gv/Quatre?node-id=0%3A1)**

#### Presentation
  **[Pitch deck](https://docs.google.com/presentation/d/155FpsIsZHjkhzVh59GuxK7o6NcfY_5cl/edit#slide=id.p7)**

#### Next Steps
We are actively working to make this reality. Currently, we are building for production deployment.

#### License
Copyright [2022] [Quatrefinance]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License **[here](http://www.apache.org/licenses/LICENSE-2.0)**.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
