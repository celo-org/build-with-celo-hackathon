import  {Chain, ChainId, ChainName, chains} from 'eth-chains';


interface ZChainData extends Chain{
    
    isTestNet: boolean;
    creationFee: number;
    blockExplorerUrls?: string[];
}

const cList =  {
    // "eth": {
    //     chainId: 1,
    //     creationFee: 0.001
    // },
    // "bsc": {
    //     chainId: 56,
    //     creationFee: 0.001
    // },
    // "bsct": {
    //     chainId: 97,
    //     creationFee: 0.001
    // },
    // "hrdt": {
    //     chainId: 31337,
    //     creationFee: 0.001
    // }, 
    // "mtr": {
    //     chainId: 82,
    //     creationFee: 20
    // },

    // "mtrt": {
    //     chainId: 83,
    //     creationFee: 0.001
    // }, 

    // "aurt": {
    //     chainId: 1313161555,
    //     creationFee: 0.001
    // },
    // "bttc": {
    //     chainId: 199,
    //     creationFee: 1000
    // }, 
    // "bttct": {
    //     chainId: 1029,
    //     creationFee: 0.001
    // },
    "celo": {
        chainId: 42220,
        creationFee: 10
    }, 
    "celot": {
        chainId: 44787,
        creationFee: 0.001
    },
    // "fra": {
    //     chainId: 2152,
    //     creationFee: 10
    // }, 
    // "frat": {
    //     chainId: 2153,
    //     creationFee: 0.001
    // }
    
};

const supportedChains: ZChainData[] = [];

function getSupportedChains(){

    if(!supportedChains || supportedChains.length<1){
        for (const iterator in cList) {
            const chainId = +cList[iterator].chainId;
            try{                
                const chain: ZChainData = chains.getById(chainId) as ZChainData;
                if(chain.name.toLowerCase().indexOf("testnet")>-1 || chain.network == 'testnet'){
                    chain.isTestNet=true;
                    chain.chain = chain.chain.endsWith('T')? chain.chain : (chain.chain + "T");
                }
                chain.creationFee= cList[iterator].creationFee;
                chain.chain=iterator;
                supportedChains.push(chain);
            }catch(err){
                // console.log('cant find chain ',cList[iterator], ' - ', chainId)
            }
            
        }
        if(!supportedChains.find(f=>f.chainId == 31337)){
            supportedChains.push({
                name: 'Hardhat Testnet',
                chainId: 31337,
                shortName: "hrdt",
                chain: "HRDT",
                network: "Hardhat",
                networkId: 31337,
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                },
                rpc: ["http://localhost:8545"],
                faucets: [],
                infoURL: "",
                isTestNet: true,
                creationFee: 0.001
        
            });
        }
        
        // if(!supportedChains.find(f=>f.chainId == 83)){
        //     supportedChains.push({
        //         name: 'Meter Testnet',
        //         chainId: 83,
        //         shortName: "mtrt",
        //         chain: "MTRT",
        //         network: "Meter",
        //         networkId: 83,
        //         nativeCurrency: {
        //             name: "Meter",
        //             symbol: "MTR",
        //             decimals: 18,
        //         },
        //         rpc: ["https://rpctest.meter.io"],
        //         faucets: [],
        //         infoURL: "",
        //         isTestNet: true,
        //         creationFee: 0.001,
        //         blockExplorerUrls: ['https://testscan.meter.io/']
        
        //     });
        // }
        

        // if(!supportedChains.find(f=>f.chainId == 82)){
        //     supportedChains.push({
        //         name: 'Meter',
        //         chainId: 82,
        //         shortName: "mtr",
        //         chain: "MTR",
        //         network: "Meter",
        //         networkId: 82,
        //         nativeCurrency: {
        //             name: "Meter",
        //             symbol: "MTR",
        //             decimals: 18,
        //         },
        //         rpc: ["https://rpc.meter.io"],
        //         faucets: [],
        //         infoURL: "",
        //         isTestNet: false,
        //         creationFee: 5,
        //         blockExplorerUrls: ['https://scan.meter.io/']
        
        //     })
        // }


        // if(!supportedChains.find(f=>f.chainId == 1029)){
        //     supportedChains.push({
        //         name: 'Bitcoin Torrent Testnet',
        //         chainId: 1029,
        //         shortName: "bttct",
        //         chain: "BTTCT",
        //         network: "BTTC Testnet",
        //         networkId: 1029,
        //         nativeCurrency: {
        //             name: "BTT",
        //             symbol: "BTT",
        //             decimals: 18,
        //         },
        //         rpc: ["https://pre-rpc.bt.io"],
        //         faucets: [],
        //         infoURL: "",
        //         isTestNet: true,
        //         creationFee: 0.001,
        //         blockExplorerUrls: ['https://testscan.bt.io/']
        
        //     });
        // }

        // if(!supportedChains.find(f=>f.chainId == 199)){
        //     supportedChains.push({
        //         name: 'BTTC',
        //         chainId: 199,
        //         shortName: "bttc",
        //         chain: "BTTC",
        //         network: "BTTC",
        //         networkId: 199,
        //         nativeCurrency: {
        //             name: "BTT",
        //             symbol: "BTT",
        //             decimals: 18,
        //         },
        //         rpc: ["https://rpc.bt.io"],
        //         faucets: [],
        //         infoURL: "",
        //         isTestNet: false,
        //         creationFee: 0.001,
        //         blockExplorerUrls: ['https://scan.bt.io/']
        
        //     });
        // }

        if(!supportedChains.find(f=>f.chainId == 44787)){
            supportedChains.push({
                name: 'CELO Testnet(ALFAJORES)',
                chainId: 44787,
                shortName: "celot",
                chain: "CELOT",
                network: "CELO Testnet",
                networkId: 44787,
                nativeCurrency: {
                    name: "CELO",
                    symbol: "CELO",
                    decimals: 18,
                },
                rpc: ["https://alfajores-forno.celo-testnet.org"],
                faucets: [],
                infoURL: "",
                isTestNet: true,
                creationFee: 0.001,
                blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org/']
        
            });
        }
        else{
            //https://alfajores-forno.celo-testnet.org
            let r = supportedChains.find(f=>f.chainId==44787);
            
            if (r != undefined) {
                r.rpc=['https://celo-hackathon.lavanet.xyz/celo-alfajores/http'];
            }
            
        }

        if(!supportedChains.find(f=>f.chainId == 42220)){
            supportedChains.push({
                name: 'CELO',
                chainId: 42220,
                shortName: "celo",
                chain: "CELO",
                network: "CELO",
                networkId: 42220,
                nativeCurrency: {
                    name: "CELO",
                    symbol: "CELO",
                    decimals: 18,
                },
                rpc: ["https://forno.celo.org"],
                faucets: [],
                infoURL: "",
                isTestNet: false,
                creationFee: 0.001,
                blockExplorerUrls: [' https://explorer.celo.org']
        
            });
        }


        


    }
    // console.log('supportedChains ',supportedChains)

    
    return supportedChains;
}

export function getSupportedChainById(chainId: number): ZChainData|undefined{
    if(supportedChains && supportedChains.length>0){
        return supportedChains.filter(f=>f.chainId==chainId)[0];
    }    
    return undefined;
}

export function getSupportedChainByChain(chain: string): ZChainData|undefined{
    
    if(supportedChains && supportedChains.length>0){
        return supportedChains.filter(f=>f.chain.toLowerCase()==chain.toLowerCase())[0];
    }    
    return undefined;
}




export default getSupportedChains;