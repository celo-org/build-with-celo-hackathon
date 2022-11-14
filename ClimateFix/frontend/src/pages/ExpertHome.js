import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import ImageBg from "../assets/images/trees-bg.jpeg";
import CustomButton from "../components/CustomButton/customButton";
import { myTrees, locations } from "../utils/data";
import { location } from "../assets/svgs/svg";

const Home = () => {
    return (
        <Box>
            <AuthNav />
            <Box p="20px">
                <Image src={ImageBg} borderRadius="8px" h="400px" w="100%" objectFit="cover" alt="bg" />

                {/* Locations */}
                <Box mt="40px" px="40px">
                    <Flex alignItems="center">
                        <Box mr="10px">{location}</Box>
                        <Text fontSize="25px" fontWeight="normal">Locations</Text>
                    </Flex>
                    <SimpleGrid columns={4} gap="38">
                        {locations.map((location) => (
                            <Box key={location.country} mt="10px" borderRadius="8px" style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }} minH="310px">
                                <Image src={location.image} borderTopRightRadius="8px" borderTopLeftRadius="8px" w="100%" objectFit="cover" h="400px" maxH="200px" alt={location.country} />
                                <Box p="20px">
                                    <Text color="brand.dark" fontWeight="bold">{location.country}</Text>
                                    <Text mt="8px" color="brand.lightGreen" fontSize="14px">{location.figure} trees planted</Text>
                                    <Box mt="20px">
                                        <a href={location.route}>
                                            <CustomButton border="1px solid #18541A" bg="none" color="brand.dark" hoverColor="brand.white" hoverBg="brand.lightGreen">
                                                <Text fontWeight="medium">Plant here</Text>
                                            </CustomButton>
                                        </a>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
                {/* Plants */}
                <Box mt="60px" px="40px">
                    <Flex alignItems="center">
                        <Box mr="10px">{location}</Box>
                        <Text fontSize="25px" fontWeight="normal">My Trees</Text>
                    </Flex>
                    <SimpleGrid columns={4} gap="38">
                        {myTrees.map((myTree) => (
                            <Box key={myTree.type} mt="10px" borderRadius="8px" style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }} minH="310px">
                                <Image src={myTree.image} borderTopRightRadius="8px" borderTopLeftRadius="8px" w="100%" objectFit="cover" h="400px" maxH="200px" alt={myTree.country} />
                                <Box p="20px">
                                    <Text color="brand.dark" fontWeight="bold">{myTree.country}</Text>
                                    <Text mt="8px" color="brand.lightGreen" fontSize="14px">{myTree.figure}</Text>
                                    <Text mt="8px" color="brand.lightGreen" fontSize="14px">{myTree.type}</Text>
                                    <Box mt="20px">
                                        <CustomButton border="1px solid #18541A" bg="none" color="brand.dark" hoverColor="brand.white" hoverBg="brand.lightGreen">
                                                <Text fontWeight="medium">View</Text>
                                        </CustomButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
    )
};

export default Home;