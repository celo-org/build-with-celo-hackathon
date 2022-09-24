import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';
import imgBg from "../images/bg-img.png";
import AboutUs from './about-us';
import sectionBg from "../images/sections-bg.png";
import metamask from "../assets/icons/meta-mask.webp";
import eth from "../assets/icons/eth.svg";
import pera from "../assets/icons/pera-logo-black.png";
import trust from "../assets/icons/trust-w.png";
import bitcoin from "../assets/icons/bitcoin.webp";

const Home = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(getUser);
    }, [user]);
    
    const getUser = () => {
        return localStorage.getItem('legacy_user')
    }
    
    return (
        <>
        <Box padding={{ base: '10px 40px', lg: "30px 80px"}} backgroundImage={imgBg} backgroundRepeat="no-repeat" backgroundSize="cover" h={{ base: '', lg: ""}}>
            <Navbar />

            <Flex mt={{ base: '50px', lg: "100px"}} alignItems="center" display={{ base: 'block', lg: 'flex' }} mb="120px">
                <Box width={{ base: '100%', lg: "60%"}}>
                    <Box fontSize={{ base: '30px', lg: '75px' }} fontWeight="700">
                        <Text color="brand.white">What happens to</Text>
                        <Flex>
                            <Text color="brand.white" mr={{ base: '5px', lg: "15px"}}>your</Text>
                            <Text  mr={{ base: '5px', lg: "15px"}} color="brand.teal">Digital Assets</Text>
                        </Flex>
                        <Text color="brand.white">if you DIE today?</Text>
                    </Box>
                    <Text color="brand.grey" mt={{ base: '15px', lg: "20px"}} fontSize="1rem" w={{ base: '100%', lg: '80%' }}>
                    An alternative means of retrieving lost or possibly lost decentralised assets in cases of asset owner&#39;s death, misplacement of assets passwords, or key phrases potentially resulting in permanent loss of these decentralised assets.
                        {/* Ensure your crypto assets is secured with a trusted member of your family (automatically your next kin) */}
                    </Text>

                    <CustomButton mt={{ base: '15px', lg: "30px"}} mb="20px" bg="brand.teal" color="brand.white" hoverColor="brand.yellow" onClick={() => navigate('/demo')}>View Demo</CustomButton>
                </Box>
            </Flex>
        </Box>
        <main>
            <Box bgColor="brand.white">
                <SimpleGrid columns={5} spacing={10} w="80%" d="flex" alignItems="center" m="15px auto">
                    <Image src={metamask} alt="meta-mask-logo" />
                    <Image src={bitcoin} alt="bitcoin-logo" />
                    <Image src={trust} alt="trust-logo" />
                    <Image src={pera} alt="pera-logo" />
                    <Image src={eth} alt="eth-logo" />
                </SimpleGrid>
            </Box>
            <Box backgroundImage={sectionBg} backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center">
                <AboutUs />
            </Box>
        </main>
        </>
    )
};

export default Home;