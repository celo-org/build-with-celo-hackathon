import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

const SelectedTokens = ({tokens}) => {

    return (
        <Box bg="#F9F9F9" w="100%" m="23px auto" p="20px 30px" borderRadius="10px">
        {tokens.length ? (
          <SimpleGrid columns="2" spacing="5">
            {tokens.map((token, index) => (
              <Box
                w="230px"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                borderRadius="10px"
              >
                <Flex
                  color="brand.dark"
                  bg="brand.white"
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
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="brand.primary">You do not have any token</Text>
        )}
      </Box>
    )
};

export default SelectedTokens;