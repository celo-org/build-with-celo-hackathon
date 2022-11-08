import { Center } from '@chakra-ui/react';
import { useAccount, useContractRead } from 'wagmi';
import { contractConfig } from '../../utils/constants';
import NftImage from '../NftImage';


const NftViewer = () => {
    const { address, isConnected } = useAccount();

    const { data } = useContractRead({
        ...contractConfig,
        functionName: "nftId",
        args: [address],
    });

    return (
        <>
            {!data ?
                <>No NFT yet {JSON.stringify(data)}</>
                :
                <>
                    <Center>
                        <NftImage tokenId={data.toNumber()} />
                    </Center>
                </>
            }
        </>
    );
}

export default NftViewer;