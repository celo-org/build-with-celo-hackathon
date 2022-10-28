import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { mission, values, vision } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import imageBg from "../images/bg.jpeg";
import howItWorks from "../images/how-it-works.png";

const AboutUs = () => {
  return (
    <Box p={{ base: '10px 40px', lg: "30px 80px"}}>
        <Box display={{ base: 'block', lg: "flex"}} alignItems="center">
            <Box mt={{ base: '30px', lg: "100px"}} w={{ base: '100%', lg: '50%' }}>
                <Box fontSize={{ base: '30px', lg: '75px' }} fontWeight="700" color="brand.white" w="80%">
                    <h1>Who we are</h1>
                </Box>
                <Box fontSize="14px" w={{ base: '100%', lg: "80%"}}>
                    <Text color="brand.white">
                        <span style={{ color: "#15F4CB"}}>Legacy</span> is a decentralised asset security organization focused on
                        building an alternative for retrieving lost or possibly lost
                        decentralised assets in cases of asset owner&#39;s death, misplacement of assets passwords, or key phrases potentially resulting in permanent loss of these decentralised assets.
                    </Text>
                    <Text color="brand.white" mt="20px">
                    These decentralised assets, which include cryptocurrencies, NFTs e.t.c cannot be retrieved because there is NO singular (centralised) body in the care of these assets; because it is on the blockchain.
                    </Text>
                    <Text color="brand.teal">

                    </Text>
                </Box>    
            </Box>

            <Box mt={{ base: '30px', lg: "100px"}} w={{ base: '100%', lg: '50%' }}>
                <Image src={imageBg} alt="img" />
            </Box>
        </Box>

        <Box mt={{ base: '50px', lg: "100px"}} w="100%">
            <Box fontSize={{ base: '20px', lg: '55px' }} fontWeight="700" color="brand.white" textAlign="center">
                <h1>Mission, Vision and Values</h1>
            </Box>
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={14} mt="20px">
                <Box bg="brand.teal" borderRadius="8px" p="15px 20px" color="brand.primary">
                    <Flex alignItems="center">
                        <Box mr="20px">{mission}</Box>
                        <Text fontWeight="600" fontSize="20px">Mission</Text>
                    </Flex>
                    <Text mt="10px">
                        Reducing the annual volume of lost decentralised assets due to death or misplacement of asset wallet.
                    </Text>
                </Box>

                <Box bg="brand.teal" borderRadius="8px" p="15px 20px" color="brand.primary">
                    <Flex alignItems="center">
                        <Box mr="20px">{vision}</Box>
                        <Text fontWeight="600" fontSize="20px">Vision</Text>
                    </Flex>
                    <Text mt="10px">
                        Reducing the annual volume of lost decentralised assets due to death or misplacement of asset wallet.
                    </Text>
                </Box>

                <Box bg="brand.teal" borderRadius="8px" p="15px 20px" color="brand.primary">
                    <Flex alignItems="center">
                        <Box mr="20px">{values}</Box>
                        <Text fontWeight="600" fontSize="20px">Values</Text>
                    </Flex>
                    <Text mt="10px">
                        Integrity, Strive for Excellence, Innovation
                    </Text>
                </Box>
            </SimpleGrid>
        </Box>

        <Box display={{ base: 'block', md: "flex"}} alignItems="center">
            <Box mt={{ base: '50px', lg: "100px"}} w={{ base: '100%', lg: '50%' }}>
                <Box fontSize={{ base: '30px', lg: '75px' }} fontWeight="700" color="brand.white" w={{base: '100%', lg: "80%"}}>
                    <h1>How it Works</h1>
                </Box>
                <Box fontSize="14px" w={{base: '100%', lg: "80%"}}>
                    <Text color="brand.white">
                        With Legacy, decentralised finance (DeFi) adopters/users will be able to secure their assets in case of death/wallet misplacement by setting a duration of dormancy to when,if elapsed, Legacy will send all or a specific number of user-selected assets into another wallet; either a next of kin&#39;s if in case of death of asset owner or a secondary wallet in case of wallet misplacement.
                    </Text>
                    <CustomButton mt={{ base: '15px', lg: "30px"}} bg="none" color="brand.white" hoverColor="brand.teal"
            border="1px solid #15F4CB">Learn more</CustomButton>
                </Box>    
            </Box>

            <Box mt={{ base: '0px', lg: "100px"}} w={{ base: '100%', lg: '50%' }}>
                <Image src={howItWorks} alt="img" />
            </Box>
        </Box>
    </Box>
  );
};

export default AboutUs;
