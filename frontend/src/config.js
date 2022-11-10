export const networkConfig = {

    "44787": [
        {
            contractProxyAddress: "0x9f59e812dAE124049BFf53A131c66fe456baE1f1", //proxy deployment
            cUSDAddress: "0xE14F49b259863Bc9E3264d1909444EaF82528DcD", //my custom cUSD
            gacToken: "0xbaF3d8A42943b901fEFd22Ab3c671E827028236A", //my refi Token
            faucet: "0x261c5a1Af675539A2613AC3d1ea35D5c8eE59E60", //faucet address
            networkName: "alfajores"
        },
    ],
    "42220": [
        {
            contractProxyAddress: "", //proxy deployment
            cUSDAddress: "0x765de816845861e75a25fca122bb6898b8b1282a",
            gacToken: "", //my refi Token
            faucet: "",
            networkName: "celo"
        },
    ]
}

export const getConfigByChain = (chain) => networkConfig[chain]