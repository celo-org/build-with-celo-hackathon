import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import NavBar from "../components/Navbar/navbar";
import { coinIcon } from "../assets/svgs/svg";
import CustomButton from "../components/CustomButton/customButton";
import PlantTrees from "../assets/icons/plant-trees.svg";
import ExpertConnects from "../assets/icons/connect-with-experts.svg";
import EarnTokens from "../assets/icons/earn-some.svg";

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
                            <a href="/login">
                                <CustomButton border="1px solid #FAF9F7" bg="none" color="white" hoverBg="brand.secondary">Learn more</CustomButton>
                            </a>
                            <a href="/signup">
                                <CustomButton bg="brand.orange" color="white" hoverBg="brand.secondary" m="0 20px">Sign up</CustomButton>
                            </a>
                        </Flex>
                    <Flex fontSize="12px" justifyContent="space-around" w="100%" textAlign="center" bottom="0" pos="absolute" p="40px 0">
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

            <section>
                <Box bg="brand.lightGrey">
                    <Text p="40px 80px" fontSize="50px" fontWeight="extrabold" color="brand.dark" textAlign="center">How it Works</Text>
                    <SimpleGrid columns={3} spacing="40" textAlign="center" p="40px 80px">
                        <Box margin="0 auto" w="100%">
                            <Image src={PlantTrees} alt="plant-trees" m="0 auto" />
                            <Box mt="20px">
                                <Text fontWeight="900">Plant Trees</Text>
                                <Text fontSize="14px" mt="10px">
                                    Find a suitable location
                                    to grow trees and improve the
                                    ecosystem
                                </Text>
                            </Box>
                        </Box>
                        <Box margin="0 auto" w="100%">
                            <Image src={ExpertConnects} alt="connect-with-experts" m="0 auto" />
                            <Box mt="10px">
                                <Text fontWeight="900">Connect With an Expert</Text>
                                <Text fontSize="14px" mt="10px">
                                Get connected with an expert to help you improve the lives of the trees you planted
                                </Text>
                            </Box>
                        </Box>
                        <Box margin="0 auto" w="100%">
                            <Image src={EarnTokens} alt="connect-with-experts" m="0 auto" />
                            <Box mt="20px">
                                <Text fontWeight="900">Earn Some Tokens</Text>
                                <Text fontSize="14px" mt="10px">
                                Earn some dollars when you
                                plant trees at a suitable environment
                                where it can grow.
                                </Text>
                            </Box>
                        </Box>
                    </SimpleGrid>
                    <Flex w="100%">
                        <CustomButton m="30px auto" border="1px solid #212529" bg="none" color="brand.dark" hoverBg="brand.secondary">View more!</CustomButton>
                    </Flex>
                </Box>
            </section>
        </Box>
    );
};

export default LandingPage;
