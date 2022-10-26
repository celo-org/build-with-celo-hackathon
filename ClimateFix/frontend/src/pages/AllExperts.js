import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import { allExperts } from "../utils/data";

const AllExperts = () => {
  return (
    <Box>
      <AuthNav />

      <Box mt="40px" px="60px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>All Experts</Tab>
            <Tab>All Users</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={4} gap="24px">
                {allExperts.map((expert) => (
                    <Flex
                    mt="20px"
                    alignItems="center"
                    p="20px"
                    borderRadius="8px"
                    border="1px solid #F0F2F5"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                    key={expert.email}
                    >
                    <Image src={expert.image} w="40px" h="40px" alt="expert-img" />
                    <Box ml="20px">
                        <Text fontWeight="black">{expert.name}</Text>
                        <Text color="brand.gray" fontSize="14px">{expert.title}</Text>
                        <Text fontSize="12px" color="brand.gray">
                        {expert.email}
                        </Text>
                    </Box>
                    </Flex>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
            <SimpleGrid columns={4} gap="24px">
                {allExperts.map((expert) => (
                    <Flex
                    mt="20px"
                    alignItems="center"
                    p="20px"
                    borderRadius="8px"
                    border="1px solid #F0F2F5"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                    key={expert.email}
                    >
                    <Image src={expert.image} w="40px" h="40px" alt="expert-img" />
                    <Box ml="20px">
                        <Text fontWeight="black">{expert.name}</Text>
                        <Text color="brand.gray" fontSize="14px">{expert.title}</Text>
                        <Text fontSize="12px" color="brand.gray">
                        {expert.email}
                        </Text>
                        <Text fontSize="12px" color="brand.orange" mt="10px">Pending</Text>
                    </Box>
                    </Flex>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AllExperts;
