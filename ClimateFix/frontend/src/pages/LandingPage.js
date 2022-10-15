import { Box, Flex, Image, Text } from "@chakra-ui/react";
import NavBar from "../components/Navbar/navbar";
import background from "..//assets/images/background-img.png";
import { coinIcon } from "../assets/svgs/svg";
import CustomButton from "../components/CustomButton/customButton";

const LandingPage = () => {
    return (
        <Box w="100%">
            <nav>
                <NavBar />
            </nav>
            <main>
                <Box className="main-bg" w="100%">
                        <h1 style={{ color: "white", fontWeight: "bolder", fontSize: "3rem" }}>Improve the <span style={{ color: "#FE9D1A" }}>Ecosystem</span> and <span style={{ color: "#FE9D1A" }}>Earn</span></h1>
                        <Box color="brand.white" textAlign="center" fontSize="20px">
                            <Text>It's easy to invest in a greener future.</Text>
                            <Flex>
                                {coinIcon}
                                <Text ml="10px">Your first investment may be guaranteed up to <span style={{ color: "#FE9D1A" }}>$100</span></Text>
                            </Flex>
                        </Box>

                        <Flex mt="40px">
                            <CustomButton border="1px solid #FAF9F7" bg="none" color="white" hoverBg="brand.secondary">Learn more</CustomButton>
                            <CustomButton bg="brand.orange" color="white" hoverBg="brand.secondary" m="0 20px">Sign up</CustomButton>
                        </Flex>
                    <Flex fontSize="12px" justifyContent="space-around" w="100%" textAlign="center" bottom="0" pos="absolute" p="20px 0">
                        <Box>
                            <Text color="brand.orange">10,000</Text>
                            <Text color="brand.white">Agricultural Experts</Text>
                        </Box>
                        <Box>
                            <Text color="brand.orange">50,000</Text>
                            <Text color="brand.white">Trees Planted</Text>
                        </Box>
                        <Box>
                            <Text color="brand.orange">70,000</Text>
                            <Text color="brand.white">Users</Text>
                        </Box>
                        <Box>
                            <Text color="brand.orange">6.5%</Text>
                            <Text color="brand.white">Annual Growth Rate</Text>
                        </Box>
                    </Flex>
                </Box>
            </main>
        </Box>
    );
};

export default LandingPage;
