import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthNav from "../components/Navbar/AuthNav";
import { Spinner, toaster } from "evergreen-ui";
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import CustomButton from "../components/CustomButton/customButton";
import Countdown from "react-countdown";
import moment from "moment";

const ViewPlants = () => {
  const { id } = useParams();
  const [activeBtn, setActiveBtn] = useState(false);

  const [data, l_, e_] = useDocumentData(doc(db, `plantTrees/${id}`));

  const liveCountdownRender = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        setActiveBtn(true);
      } else {
        return <span>{hours}:{minutes}:{seconds}</span>;
      }
  };

  return (
    <Box bg="brand.lightGrey" h="100vh">
      <AuthNav />

      <Box p="20px 40px" w="100%">
        <Box mt="20px" bg="brand.lightGreen" p="20px" borderRadius="8px">
          <Text fontSize="20px" color="brand.white" fontWeight="semibold">
            Plant Progress
          </Text>
        </Box>

        <Box mt="30px">
          <SimpleGrid columns={2} gap="30px">
            <Box>
              <Text fontSize="24px">Stage 1</Text>
              {l_ ? (
                <Spinner />
              ) : (
                <Box
                  mt="20px"
                  borderRadius="8px"
                  style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                  w="80%"
                  bg="brand.white"
                  p="20px"
                >
                  <Image
                    src={data.imageUrl}
                    borderTopRightRadius="8px"
                    borderTopLeftRadius="8px"
                    w="80px"
                    objectFit="cover"
                    h="80px"
                    borderRadius="full"
                    style={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                    ml="20px"
                    mt="20px"
                  />
                  <Box p="20px">
                    <Text ml="20px" color="brand.primary" fontWeight="semibold">
                      Tree Details
                    </Text>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      px="20px"
                      fontSize="14px"
                      mt="20px"
                    >
                      <Text color="brand.lightGray">Country</Text>
                      <Text color="brand.gray">Nigeria</Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      px="20px"
                      fontSize="14px"
                      mt="20px"
                    >
                      <Text color="brand.lightGray">Region:</Text>
                      <Text color="brand.gray">{data.region}</Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      px="20px"
                      fontSize="14px"
                      mt="20px"
                    >
                      <Text color="brand.lightGray">Name of tree:</Text>
                      <Text color="brand.gray">{data.tree}</Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      px="20px"
                      fontSize="14px"
                      mt="20px"
                    >
                      <Text color="brand.lightGray">Assigned Expert Name:</Text>
                      <Text color="brand.gray">{data.assignedExpertName}</Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      px="20px"
                      fontSize="14px"
                      mt="20px"
                    >
                      <Text color="brand.lightGray">
                        Assigned Expert Email:
                      </Text>
                      <Text color="brand.gray">{data.assignedExpertEmail}</Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      px="20px"
                      fontSize="14px"
                      mt="20px"
                    >
                      <Text color="brand.lightGray">
                        Wallet address:
                      </Text>
                      <Text color="brand.gray">{data.wallet_addr}</Text>
                    </Flex>

                    <Flex mt="40px" ml="20px" justifyContent="space-between">
                      <a
                        href={`${data.videoUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CustomButton
                          border="1px solid #18541A"
                          bg="none"
                          color="brand.dark"
                          hoverColor="brand.white"
                          hoverBg="brand.lightGreen"
                        >
                          <Text fontWeight="medium">Watch Video</Text>
                        </CustomButton>
                      </a>
                      <CustomButton
                        // border="1px solid #18541A"
                        bg="orange"
                        color="brand.white"
                        hoverColor="brand.white"
                        hoverBg="brand.lightGreen"
                        onClick={() => toaster.success("Coming soon")}
                      >
                        <Text fontWeight="medium">Mint tree</Text>
                      </CustomButton>
                    </Flex>
                  </Box>
                </Box>
              )}
            </Box>

            <Box>
              <Text fontSize="24px">Stage 2</Text>
              <Box
                mt="20px"
                borderRadius="8px"
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                w="80%"
                bg="brand.white"
                p="20px"
              >
                <Text>Proceed to stage 2 after three months of planting</Text>
                <Box>
                  <Box mt="20px">
                  <Countdown 
                    date={moment(1667029671).format('L')}
                    renderer={liveCountdownRender}
                  />
                    <CustomButton
                      border="1px solid #18541A"
                      bg="none"
                      color="brand.dark"
                      hoverColor="brand.white"
                      disabled={activeBtn}
                      hoverBg="brand.lightGreen"
                    >
                      <Text fontWeight="medium">Proceed to Stage 2</Text>
                    </CustomButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPlants;
