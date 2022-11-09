import { Box, Center, HStack, Spacer } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead } from "wagmi";
import { contractConfig } from '../utils/constants';
import NftViewer from '../components/NftViewer';

const ContractTest = () => {

    const { address, isConnected } = useAccount();

    const { data: nameData } = useContractRead({
        ...contractConfig,
        functionName: "name",
        args: [],
    });

    const { data: symbolData } = useContractRead({
        ...contractConfig,
        functionName: "symbol", // should be "legacyAmount"
        args: [],
    });

    const { data: balanceData } = useContractRead({
        ...contractConfig,
        functionName: "balanceOf", // should be "legacyAmount"
        args: [address],
    });

    return (
        <Box w='100%' h='100%'>
            <HStack spacing={2} pr={14}>
                <Spacer />
                <ConnectButton />
            </HStack>
            {!isConnected ?
                <Center>Please Connect your wallet</Center>
                :
                <>
                    <Center>Connected! Your address is: &nbsp;<strong>{address}</strong></Center>
                    <Center>Called contract, contract name is: &nbsp;<strong>{nameData}</strong></Center>
                    <Center>Called contract, contract symbol is: &nbsp;<strong>{symbolData}</strong></Center>
                    <Center>Called contract, your balance is: &nbsp;<strong>{balanceData?.toNumber()}</strong></Center>
                    {balanceData &&
                        <Center><NftViewer /></Center>
                    }
                </>
            }
        </Box>
    )
}

export default ContractTest;