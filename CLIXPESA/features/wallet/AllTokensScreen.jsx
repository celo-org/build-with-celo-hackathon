import { Box, HStack, Stack, Text, VStack } from 'native-base'
import { TokenIcon } from 'clixpesa/components/TokenIcon'
import { NativeTokensByAddress } from './tokens'
import { useSelector } from 'react-redux'

export default function AllTokensScreen({ route }) {
  const tokenAddr = Object.keys(NativeTokensByAddress)
  const balances = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  return (
    <Box flex={1} bg="muted.100">
      <HStack mx="4%" justifyContent="space-between" my={4}>
        <VStack bg="white" width="48%" space="12" p={4} borderRadius="2xl">
          <TokenIcon size={42} token={tokenAddr[1]} />
          <Stack>
            <Text fontSize="md" fontWeight="medium">
              cUSD
            </Text>
            <Text color="muted.500">Celo Dollar</Text>
            <Text fontWeight="medium">
              {balances ? balances[tokenAddr[1]] : route.params.tempBal[tokenAddr[1]]}
            </Text>
          </Stack>
        </VStack>
        <VStack bg="white" width="48%" space="12" p={4} borderRadius="2xl">
          <TokenIcon size={42} token={tokenAddr[2]} />
          <Stack>
            <Text fontSize="md" fontWeight="medium">
              cEUR
            </Text>
            <Text color="muted.500">Celo Euro</Text>
            <Text fontWeight="medium">
              {balances ? balances[tokenAddr[2]] : route.params.tempBal[tokenAddr[2]]}
            </Text>
          </Stack>
        </VStack>
      </HStack>
      <HStack mx="4%" justifyContent="space-between" mb={4}>
        <VStack bg="white" width="48%" space="12" p={4} borderRadius="2xl">
          <TokenIcon size={42} token={tokenAddr[3]} />
          <Stack>
            <Text fontSize="md" fontWeight="medium">
              cREAL
            </Text>
            <Text color="muted.500">Celo Brazilian Real</Text>
            <Text fontWeight="medium">
              {balances ? balances[tokenAddr[3]] : route.params.tempBal[tokenAddr[3]]}
            </Text>
          </Stack>
        </VStack>
        <VStack bg="white" width="48%" space="12" p={4} borderRadius="2xl">
          <TokenIcon size={42} token={tokenAddr[0]} />
          <Stack>
            <Text fontSize="md" fontWeight="medium">
              CELO
            </Text>
            <Text color="muted.500">Celo Native</Text>
            <Text fontWeight="medium">
              {balances ? balances[tokenAddr[0]] : route.params.tempBal[tokenAddr[0]]}
            </Text>
          </Stack>
        </VStack>
      </HStack>
    </Box>
  )
}
