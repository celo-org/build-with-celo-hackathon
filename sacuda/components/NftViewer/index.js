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
            {data?.toNumber() == 0 || data?.toNumber() == undefined  ?
                <>No NFT yet</>
                :
                <>
                    <Center>
                        <NftImage tokenId={data.toNumber()} maxWidth='200' />
                    </Center>
                </>
            }
        </>
    );
}

export default NftViewer;