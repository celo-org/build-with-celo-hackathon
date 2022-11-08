import { Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { contractConfig } from '../../utils/constants';


const NftImage = (props) => {
    const { tokenId } = props;
    const { address, isConnected } = useAccount();

    const [decodedURIImage, setDecodedURIImage] = useState('');

    const { data } = useContractRead({
        ...contractConfig,
        functionName: "tokenURI",
        args: [tokenId],
    });

    useEffect(() => {
        if (!data) return;

        // console.log(data);
        // return;

        const json = JSON.parse(window.atob(data.substring(data.indexOf(',') + 1)));
        setDecodedURIImage(json.image);

    }, [data]);

    return (
        <>
            {(!isConnected || !data || !decodedURIImage) ?
                <>No Image</>
                :
                // <>Here goes the image</>
                <Image src={decodedURIImage} alt='NFT Image' />
            }
        </>
    );
}

export default NftImage;