export const networkConfig = {

    "44787": [
        {
            contractProxyAddress: "0x0021926f723cbf8f13158Db2bFfB89c82a49F78F", //proxy deployment
            cUSDAddress: "0xE14F49b259863Bc9E3264d1909444EaF82528DcD", //my custom cUSD
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