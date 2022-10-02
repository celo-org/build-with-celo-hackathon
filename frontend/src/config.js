export const networkConfig = {

    "44787": [
        {
            contractProxyAddress: "0xdDd21F1357AD10D89e8AFa7FbDa248718c007a2d", //proxy deployment
            networkName: "alfajores"
        },
    ],
    "42220": [
        {
            contractProxyAddress: "", //proxy deployment
            networkName: "celo"
        },
    ],
    "62320": [
        {
            contractProxyAddress: "", //proxy deployment
            networkName: "baklava"
        },
    ],
}

export const getConfigByChain = (chain) => networkConfig[chain]