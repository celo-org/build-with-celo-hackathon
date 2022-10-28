import { Box, Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import { loading } from "../utils/svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import {
  checkConnection,
  isDisconnected,
  addTokens,
  getLegacyTokens,
} from "../utils/helpers.js";
import { legacyAddress } from "../utils/contract";
import AlreadySelectedTokens from "../templates/prevSelectedTokens";
import TokenModal from "../modal/modal";

const SelectTokens = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [alreadyAddedTokens, setAlreadyAddedTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getTokensLoading, setGetTokensLoading] = useState(false);
  const [prevTokens, setPrevTokens] = useState(false);
  const [active, setActive] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setGetTokensLoading(true);
    getTokens();
  }, []);

  const getTokens = async () => {
    if (isDisconnected()) {
      return;
    }
    const user = await checkConnection();
    try {
      const allTokens = [
        {
          symbol: "USDC",
          token_address: "0x6bb92A5E17e28E9D3f7Eb2B58E9DA4E5278Da0bC"
        },
        {
          symbol: "ONES",
          token_address: "0x6db1736656Ed09cAC5957d7B14e703e6268D1337"
        },
        {
          symbol: "DAI",
          token_address: "0xbf0A736F6107D10fCE53d056C95fD73d266283Bb"
        },
        {
          symbol: "USDT",
          token_address: "0xFC4F6E92143621D1ff144C1ff5b7f14ec53535A1"
        }
      ]

      const legacyTokens = await getLegacyTokens(user);
      let alreadyAdded = [];
      let toBeAdded = [];
      console.log(legacyTokens);
      console.log(allTokens);
      allTokens.map((t) => {
        if (legacyTokens.includes(t.token_address)) {
          alreadyAdded.push(t);
        } else {
          toBeAdded.push(t);
        }
      })
      setTokens(toBeAdded);
      setAlreadyAddedTokens(alreadyAdded);
      setGetTokensLoading(false);
    } catch (err) {
      console.log(err);
      setGetTokensLoading(false);
    }
  };

  const approve = async (erc20token) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const erc20Abi = ["function approve(address spender, uint256 amount)"];
    const tokenContract = new ethers.Contract(erc20token.token_address, erc20Abi, signer);
    const tx = await tokenContract.approve(legacyAddress, ethers.constants.MaxUint256);
    await tx.wait();
    toaster.success(`${erc20token.symbol} successfully selected`);
  };

  const handleProceed = async () => {
    let tokenAddresses = selectedTokens.map((tkn) => tkn.token_address);
    const res = await addTokens(tokenAddresses);
    setIsLoading(false);
    if (res) {
      navigate("/profile");
      onClose();
    }
  }

  const selectToken = async (erc20token, index) => {
    try {
      await approve(erc20token);
      setActive(() => {
        if (index === active) {
          index = null;
        };
        return index;
      })
    } catch (error) {
      console.log(error);
    }
    console.log(index);
    setSelectedTokens([...selectedTokens, erc20token]);
  };

  const selectAll = () => {
    setSelectedTokens(tokens);
    tokens.map((erc20token) => approve(erc20token));
  };

  return (
    <Box
      padding={{ base: "10px 40px", lg: "30px 80px" }}
      bg="#02044A"
      minH="100vh"
    >
      <Navbar />
      <Box p={{base: "15px 10px", lg:"15px 50px"}} margin="50px 0">
        <Box mb="20px">
          <Text
            color="white"
            fontSize={{ base: "20px", lg: "50px" }}
            fontWeight="black"
          >
            Select Tokens
          </Text>
          {/* <Text color="brand.teal" fontSize={{ base: "12px", lg: "14px" }}>
            Kindly select all your tokens you would like to transfer it's asset to
            your next of kin.
          </Text> */}
          <Text color="brand.white" m="20px 0" float="left" cursor="pointer" _hover={{ color: "brand.teal" }} w="fit-content" fontSize="14px" onClick={() => setPrevTokens(!prevTokens)}>View already added tokens</Text>
          {prevTokens &&
            <Text color="brand.white" m="20px 0" float="right" cursor="pointer" _hover={{ color: "brand.teal" }} w="fit-content" fontSize="14px" onClick={() => setPrevTokens(!prevTokens)}>Close</Text>
          }
        </Box>
        <Box m="20px 0">
          <Box h="1px" bgColor="brand.grey"></Box>
          {prevTokens &&
            <AlreadySelectedTokens tokens={alreadyAddedTokens} />
          }
        </Box>
        <Box h="1px" bgColor="brand.grey"></Box>
        <Text color="brand.white" m="20px 0" float="right" w="fit-content" fontSize="14px">Add new tokens</Text>
        <Box
          bg="#F9F9F9"
          w="100%"
          m="40px auto"
          p="20px 30px"
          borderRadius="10px"
        >
          {getTokensLoading ? (
            loading
          ) : (
            <>
              <Text
                mt="-10px"
                mb="20px"
                cursor="pointer"
                _hover={{ color: "brand.primary" }}
                onClick={selectAll}
              >
                {tokens.length ? 'Select All' : ''}
              </Text>
                {tokens.length ? (
              <SimpleGrid columns="4" spacing="10">
                  {tokens.map((token, index) => (
                    <Box
                      key={index}
                      w="230px"
                      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                      borderRadius="10px"
                    >
                      <Flex
                        color="brand.dark"
                        bg={active === index ? "brand.teal" : "brand.white"}
                        p="15px"
                        h="95px"
                        borderRadius="10px"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text>{token.symbol}</Text>
                      </Flex>
                      <Flex
                        color="brand.dark"
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ color: "brand.primary" }}
                        fontSize="14px"
                        justifyContent="space-between"
                        p="10px 20px"
                      >
                        <Text fontSize="10px" color="brand.primary">
                          Token {token.symbol}
                        </Text>
                        <Text
                          as="button"
                          cursor="pointer"
                          onClick={() => selectToken(token, index)}
                        >
                          Select
                        </Text>
                      </Flex>
                    </Box>
                  ))}
              </SimpleGrid>
                ) : (
                  <Text color="brand.primary">
                    You have added all tokens
                  </Text>
                )}
            </>
          )}
        </Box>
        <CustomButton
          w={{ base: "100%", lg: "170px" }}
          onClick={() => navigate("/profile")}
          ml={{ base: "0", lg: "20px" }}
          color="brand.white"
          bg="brand.teal"
          hover="none"
          hoverColor="brand.white"
          border="1px solid #15F4CB"
        >
          Later
        </CustomButton>
        <CustomButton
          isLoading={isLoading}
          onClick={() => onOpen()}
          ml={{ base: "0", lg: "20px" }}
          mt={{ base: "20px", md: "0" }}
          bg="none"
          w={{ base: "100%", lg: "170px" }}
          hover="brand.teal"
          border="1px solid #15F4CB"
          hoverColor="brand.white"
          color="brand.white"
        >
          Proceed
        </CustomButton>
      </Box>

      <TokenModal
        isOpen={isOpen}
        onClose={onClose}
        header="Confirm Selected Tokens"
        handleProceed={handleProceed}
      />
    </Box>
  );
};

export default SelectTokens;
