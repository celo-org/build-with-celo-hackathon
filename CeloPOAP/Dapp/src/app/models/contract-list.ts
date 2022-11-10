
export interface ContractListArray {
    [index: number]: {
        chainId: number,
        campaignList: string,
        
        routers: {name: string,address: string}[],
        tokenFactory?: string,
        tokenMintingFees?: {
            type: number,
            fee: string,
            tokenPercent: number
        }[]
    };
}

const contractList: ContractListArray =  {
    1: {
        chainId: 1,
        campaignList: '0x',
        
        routers:[
            {
                name: 'Swap',
                address: '0xb2869F895FC24790e81EF05a3AeF0F23897eC33b'
            }
        ]

    },
    97: {
        chainId: 97,
        campaignList: '0xb2869F895FC24790e81EF05a3AeF0F23897eC33b',
        
        routers:[
            {
                name: 'Swap',
                address: '0xb2869F895FC24790e81EF05a3AeF0F23897eC33b'
            }
        ]
    },
    31337: {// Hardhat test
        chainId: 31337,
        campaignList: '0x998abeb3E57409262aE5b751f60747921B33613E',        
        routers:[
            {
                name: 'ZSwap',
                address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' //'0xb2869F895FC24790e81EF05a3AeF0F23897eC33b'
            }
        ],
        tokenFactory: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
        tokenMintingFees: [
            {
                type: 0,
                fee: '0.001',
                tokenPercent: 2
            }
        ]
    }, 
    82: {// Meter
        chainId: 83,
        campaignList: '0xc4cc045f934f8bD03A333fCEd331fBf8D26d9931',        
        routers:[
            {
                name: 'Volt Swap',
                address: '0xC6E88363ea74F31f514b56E979413B3Ee8d76f39'
            }
        ]
    },

    83: {// Meter test
        chainId: 83,
        campaignList: '0x279bF6D045186B6e25280d31Cb71492DfeeFEECD',       
        routers:[
            {
                name: 'ZSwap',
                address: '0x0Be73fE84d0220f80A480Bc33eF976a9124826c1'
            }
        ],
        tokenFactory: '0xd03419861703761ef082BfA62B60a5DB2788211E',
        tokenMintingFees: [
            {
                type: 0,
                fee: '2',
                tokenPercent: 2
            },
            {
                type: 1,
                fee: '2',
                tokenPercent: 2
            },
            {
                type: 2,
                fee: '4',
                tokenPercent: 2
            }
        ]
    },



    199: {// BTTC 
        chainId: 199,
        campaignList: '0xc4cc045f934f8bD03A333fCEd331fBf8D26d9931',        
        routers:[
            {
                name: 'BTTSwap',
                address: '0xb2869F895FC24790e81EF05a3AeF0F23897eC33b'
            }
        ]
    },

    1029: {// BTTC test
        chainId: 1029,
        campaignList: '0x40f4a06683794360cA1B7CEf4799FE2A4EcBF3D8',       
        routers:[
            {
                name: 'BTTSwap',
                address: '0x932102Bc1916f9d74E271dB6685aba0276f112F2'
            }
        ],
        tokenFactory: '0x6dAC4ecECEDf1Fbc7FE28a7875d2f0542A16b2f5',
        tokenMintingFees: [
            {
                type: 0,
                fee: '0.001',
                tokenPercent: 2
            },
            {
                type: 1,
                fee: '0.1',
                tokenPercent: 2
            },
            {
                type: 2,
                fee: '0.2',
                tokenPercent: 2
            }
        ]
    },


    42220: {// CELO
        chainId: 42220,
        campaignList: '0x40f4a06683794360cA1B7CEf4799FE2A4EcBF3D8',       
        routers:[
            {
                name: 'UbeSwap',
                address: '0xe3d8bd6aed4f159bc8000a9cd47cffdb95f96121'
            }
        ],
        tokenFactory: '0x6dAC4ecECEDf1Fbc7FE28a7875d2f0542A16b2f5',
        tokenMintingFees: [
            {
                type: 0,
                fee: '1',
                tokenPercent: 2
            },
            {
                type: 1,
                fee: '5',
                tokenPercent: 2
            },
            {
                type: 2,
                fee: '5',
                tokenPercent: 2
            }
        ]
    },
    
    44787: {// CELO test
        chainId: 44787,
        campaignList: '0x245835214BBBB7caD494eDE7903394c09F3b2f90',       
        routers:[
            {
                name: 'UbeSwap',
                address: '0xe3d8bd6aed4f159bc8000a9cd47cffdb95f96121'
            }
        ],
        tokenFactory: '0xb2869F895FC24790e81EF05a3AeF0F23897eC33b',
        tokenMintingFees: [
            {
                type: 0,
                fee: '0.001',
                tokenPercent: 2
            },
            {
                type: 1,
                fee: '0.1',
                tokenPercent: 2
            },
            {
                type: 2,
                fee: '0.2',
                tokenPercent: 2
            }
        ]
    },

    2152: {// Findora 
        chainId: 2152,
        campaignList: '0x2B5005DB8A3fb281eb1B78bc09DFE575B3a94A0A',       
        routers:[
            {
                name: 'ZSwap',
                address: '0x0Be73fE84d0220f80A480Bc33eF976a9124826c1'
            }
        ],
        tokenFactory: '0xd03419861703761ef082BfA62B60a5DB2788211E',
        tokenMintingFees: [
            {
                type: 0,
                fee: '1000',
                tokenPercent: 2
            },
            {
                type: 1,
                fee: '3000',
                tokenPercent: 2
            },
            {
                type: 2,
                fee: '3000',
                tokenPercent: 2
            }
        ]
    },

    2153: {// Findora test
        chainId: 2153,
        campaignList: '0xF48aD3edDB835E6EbD86C22BA9e1ED3a0aD910e7',       
        routers:[
            {
                name: 'ZSwap',
                address: '0x6D096DA092FDF203c2886d88aD773A237822fD82'
            }
        ],
        tokenFactory: '0xE3cB58467250bd4178d737A87B87dc7AE00Dad62',
        tokenMintingFees: [
            {
                type: 0,
                fee: '1000',
                tokenPercent: 2
            },
            {
                type: 1,
                fee: '3000',
                tokenPercent: 2
            },
            {
                type: 2,
                fee: '3000',
                tokenPercent: 2
            }
        ]
    },

    1313161555: { //Aurora testnet
        chainId: 1313161555,
        campaignList: '0x742489F22807ebB4C36ca6cD95c3e1C044B7B6c8',        
        routers:[
            {
                name: 'Swap',
                address: '0xb2869F895FC24790e81EF05a3AeF0F23897eC33b'
            }
        ]
    }
    
};

export default contractList;