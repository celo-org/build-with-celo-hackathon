
export const info = [
  {
    id: 0,
    title: "Testnet Info",
    value: `
    This is a Beta version, token used does not have real value. 
    Do not use real network asset such as BNB. Be sure you're on 
    testnet before carrying out any transaction. You may experie
    nce inconsistencies. Your feedbacks matter to us.`

  },
  {
    id: 1,
    title: "What is a Digesu?",
    value: `
    A collection of communities that have come togethet to support
     one another by contributing certain amount, total of which is 
     given to the each member for use rotationally usually for a sh
     ort period of time. Such period cannot be greater than 255 day
     s. The beneficiairy makes use of the fund for the set period o
     f time and return it to the pool. This is system known mostly 
     with the Africans and we have redefined it to be accessible to 
     anyone anywhere around the world. Seen a method of raising fun
     ds among the Africans where two or more people come together t
     o support one another in raising fund for a particular endeavo
     r or project usually in a small or medium way.  Often, it is i
     n rotational order without charging any form of interest.  The
     re are couple of setbacks associated with this method such as 
     lack of trust, dubious action where one person refuses to pay 
     back and much more.  Using blockchain potentials and strategie
     s, we provide solutions while digitalizing this culture.  With
      Digesu, users have more than one option and designs.  Let's t
      ake a scenario where Bob, Alice and Kate decide to fund one a
      nother using Digesu with each depositing 3BNB. Firstly the tr
      ust aspect is removed when you make the choice to subscribe t
      o Digesu.  Bob, decide to launch a band on Digesu in a strict
       mode which only Alice and Kate can join thereafter. At this 
       point, we have a quorum of 3 and total BNB in the band accou
       nt will be 9.  Based on the algorithm we used, the first to 
       come is the first to be served. Bob will then proceed to get
       financed with an amount of 9BNB. He is required to have an e
       quivalent amount of QFTs in his wallet before the fund can b
       e released to him.  If Bob had set up the band with a multip
       lier of say 1.5 (that is, collateral index) then Bob will ha
       ve QFT amount of 9BNB x 1.5 in his wallet.  This pattern con
       tinues until a cycle is completed. It is largely user-contro
       lled and simply a collection of many bands.

       This is only a part of the plan. Digesu has different cate
       gories. On the second catgery, starting from Nigeria with ov
       er 200Million population, our target is a fraction of the to
       al population who make at least a penny daily but keep them 
       idle either in the bank or somewhere with the man who comes
       to take them everyday without yeilding interest.. 
       
       `
  },
  {
    id: 2,
    title: "Things you should know about Digesu",
    value: `
    You cannot create a new band with an existing amount unless the
    Quorum for the selected amount is reached. That is, if a band a
    lready has an amount of 1BNB and it is still active, no band wi
    th same amount can exist simultaneously unless the existing ban
    d is filled up. This is to achieve efficiency and moderation. T
    here is a limit to the number of bands you can join. You cannot
    create a band with duration (in days) above 255 days. Setting 
    APR below 100 will cause unexpected behavior. 100 mean no inter
    est should be charged in this band. 120 means to set interest ra
    te to 20% per annum. Same rule for APR applies to multiplier (i.
      e collateral factor.  `
  },
  {
    id: 3,
    title: "How is Digesu different from other loan platform",
    value: `
    (a). It is 100% controlled by user. (b). Quatrefinance does not 
    hold any fund in custody. (c). It if flexible: that is, (i): use
    r may create a band of many friends (i.e restricted band, with pa
    rticipants not greater than 255) and rotate pooled fund among par
    ticipants until the cycle is completed or join an existing band.
    (ii): Setting collateral (i.e multiplier) is optional. (c). Settin
    gs such as collateral factor, are determined by user. (d). It is h
    ighly decentralised. (e). Every participant in a band is a borrowe
    r and a lender at the same time. (f). Collateral is optional (g). 
    Users earn from the platform. No interest is charged`
  },
  {
    id: 4,
    title: "What is a 'Band'?",
    value: `
    A band is group of participants recognizable by an address. Each ban
    d is unique to another even if they have the same settings. It is g
    uaranteed that no band can have the same address identifier which is 
    the basis of security for each band hence no central point of failure. 
    A collections of many bands is 'Digesu'.`
  },
  {
    id: 5,
    title: "Steps in a band",
    value: `
    Launching a band requires a minimal amount of fee usually denominated
    in network currency e.g BNB. When a band is created, it is initializ
    ed with the value sent along by the creator. It then enters a waiting
    mode for the quorum to be achieved. Soon as the 'quorun is met, 'GET
    FINANCE is activated done in first-in-first-out basis. FIrst user to
    join the pool becomes the first to GF i.e GETFINANCE'. On or before 
    the duration period, the current Gfer (i.e beneficiary) is able to 
    return the given amount to the pool otherwise, they can be liquidated. 
    See next section on how liquidation works.`
  },
  {
    id: 6,
    title: "Quorum",
    value: `
    The required number of participants that should occupy a speicific band. 
    Example: If Alice creates a band with 'Quorum' as 3, on creation, Alice 
    is the first on the list. Two more people is needed to mark the group as 
    'Closed'. Note: It must always be greater than 1 and less than 256.`
  },
  {
    id: 7,
    title: "Amount",
    value: `
    Suppose Alice initializes a community 'X' with 1 ETH. At creation, 'X' has a total
     value of 1 ETH. Anyone who joins is required to deposit same amount at the
     point they wish to join `
  },
  {
    id: 8,
    title: "Duration",
    value: `
    Duration specifies the period of the fund. If band 'Y' with quorum: '3' was 
    set up with 7 days duration, each taker will have 7 days to use the given/bor
    rowed fund and return it to the pool. A cycle for this pool will be 21 days.`
  },
  {
    id: 9,
    title: "Multiplier",
    value: `
    A band with 1.5x multiplier requires the current GF'er to deposit collateral 
    in a function of 1.5 time the pooled amount i.e If multiplier is 1, then coll
    teral is not needed. Example: Assume Unit amount = 1 ETH, quorum = 3 and mult
    iplier = 1.5, collateral value will be 1ETH * 3 * 1.5 = 4.5ETH. Collateral are 
    denominated in QFT or stableCoin.`
  },
  {
    id: 10,
    title: "Liquidation",
    value: `
    Liquidation is possible after a participant failed to meet up with the deadlin
    e. Only a member of a band can initiate liquidation action. When that happens, 
    using atomic pattern, the defaulter's collateral balance is confiscated which 
    is immediately shared among the rest of the participants and the band is dissol
    ved. NOTE: Liquidation may forfeit earnings effect of which is spread on other 
    particiapnts of same bands especially in strict mode.`

  },
  {
    id: 11,
    title: "Public vs Private Bands",
    value: `
    A public band is one with no access restriction. It is open to anyone to who is 
    willing and can afford the unit contribution. It is permissionless and anyone 
    is able to launch a community of this type. Comparatively, private bands share 
    similaries in settings with the public type except that becoming a member requi
    res a preset identity. Often, people in same geographical location or are known
     to one another belong to this category.
    `

  },

  {
    id: 12,
    title: "What is a Cycle?",
    value: `
    This is the total period (in days) it takes for every partcicipants in the pool 
    to have GF i.e getFinance. If a band is set up with 3 days duration and the quor
    um is 3, then the cycle will be 9 days. This is because it will 9 days for the p
    ooled fund to have rotated and fully serve all participants.`

  },
  {
    id: 13,
    title: "What is Quatrefinance",
    value: `
    Quatrefinance is a platform for decentralized applications and services. As a pl
    atform, we are committed to continuously build decentralized products that put it
    s users in total control. We released our first product called Digesu.`

  },
  {
    id: 14,
    title: "How to getFinance",
    value: `
    Getting finance is treated in first-in-first-out (FIFO) basis ie if your position 
    is 1, you will be the first to getFinance and so on.To see your postion and other 
    information relation to each band, click on the ID of any oof the bands and the pr
    ofile will  be displayed.`

  },
  {
    id: 15,
    title: "How to payBack",
    value: `
    Payback button will only be active if you have an outstanding debt to reypay and 
    you must have getFinance. Ensure you have value sufficient for settling off the d
    ebt before calling designated function.`

  },
  {
    id: 16,
    title: "Claim Dues",
    value: `
    When all the particints have completed their turn and fully return expected value 
    to the pool, Any of the band members can the COMPLETETHEROUND function which dist
    ributes their funds accordingly. Thereafter, each member can claim their part.`
  },
  // {
  //   id: 18,
  //   title: "",
  //   value: "When all the particints have completed their turn and fully return expected value to the pool, Any of the band members can the COMPLETETHEROUND function which distributes their funds accordingly. Thereafter, each member can claim their part."
  // },

];