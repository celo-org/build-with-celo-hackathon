export const networkConfig = {

    "44787": [
        {
            contractProxyAddress: "0xdDd21F1357AD10D89e8AFa7FbDa248718c007a2d", //proxy deployment
            cUSDAddress: "0xE14F49b259863Bc9E3264d1909444EaF82528DcD",
            networkName: "alfajores"
        },
    ],
    "42220": [
        {
            contractProxyAddress: "", //proxy deployment
            cUSDAddress: "0x765de816845861e75a25fca122bb6898b8b1282a",
            networkName: "celo"
        },
    ],
    "62320": [
        {
            contractProxyAddress: "", //proxy deployment
            cUSDAddress: "",
            networkName: "baklava"
        },
    ],
}

export const getConfigByChain = (chain) => networkConfig[chain]