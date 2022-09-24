import { Box, Flex, Text } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';
import { useEffect, useState } from 'react';
import { toaster } from 'evergreen-ui';
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';
import imgBg from "../images/bg-img.png";

const LegacyDemo = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [getStartedLoading, setGetStartedLoading] = useState(false);
    useEffect(() => {
        setUser(getUser);
    }, [user]);
    
    const getUser = () => {
        return localStorage.getItem('legacy_user')
    }
    
    const handlegetstarted = () => {
        setGetStartedLoading(true);
        if (getUser()) {
            navigate('/get-started')
            setGetStartedLoading(false);
        }
        else {
            toaster.danger('Please connect wallet first!', {
                duration: 10
            });
            setGetStartedLoading(false);
        }
    }
    return (
        <>
        <Box padding={{ base: '10px 40px', lg: "30px 80px"}} backgroundImage={imgBg} backgroundRepeat="no-repeat" backgroundSize="cover" h={{ base: '', lg: "100vh"}}>
            <Navbar />

            <Flex mt={{ base: '50px', lg: "100px"}} alignItems="center" display={{ base: 'block', lg: 'flex' }}>
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

                    <CustomButton mt={{ base: '15px', lg: "30px"}} mb="20px" bg="brand.teal" color="brand.white" hoverColor="brand.yellow" isLoading={getStartedLoading} onClick={handlegetstarted}>Get Started</CustomButton>
                </Box>
            </Flex>
        </Box>
        </>
    )
};

export default LegacyDemo;