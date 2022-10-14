import {
  Box,
  Stack,
  VStack,
  HStack,
  Text,
  Input,
  Pressable,
  Button,
  Spacer,
  Icon,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { utils } from 'ethers'
import celoHelper from '../../blockchain/helpers/celoHelper'

export default function FundSpaceScreen() {
  const [amount, setAmount] = useState('')

  const fundRound = async () => {
    const roscaAddr = '0x3C842105ea78699B90517Ffc2746019f1149FC28'
    const fundAmount = utils.parseEther(amount).toString()
    try {
      const txReceipt = await celoHelper.smartContractCall('Rosca', {
        contractAddress: roscaAddr,
        approvalContract: 'StableToken',
        method: 'fundRound',
        methodType: 'write',
        params: [fundAmount],
      })

      console.log(txReceipt)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3} width="95%">
        <Text mx={6} mt={8}>
          Set an amount to fund
        </Text>
        <VStack space={1}>
          <Box bg="white" roundedTop="xl" roundedBottom="md">
            <HStack m={3} justifyContent="space-between" alignItems="center">
              <HStack>
                <Text fontSize="lg" fontWeight="semibold" pl={1}>
                  cUSD
                </Text>
                <Icon as={Feather} name="chevron-down" size="md" mx="1" mt={1} />
              </HStack>
              <Input
                py={2}
                textAlign="right"
                minW="2/3"
                placeholder="0.00"
                size="lg"
                keyboardType="numeric"
                InputRightElement={
                  <Text fontSize="md" fontWeight="medium" pr={3}>
                    cUSD
                  </Text>
                }
                value={amount}
                onChangeText={(amount) => setAmount(amount)}
              />
            </HStack>
            <HStack px={5} justifyContent="space-between">
              <Text mt={1}>Balance: 1 cUSD</Text>
              <Pressable bg="primary.100" px={2} py={1} mb={2} rounded="lg">
                <Text color="primary.600">Max</Text>
              </Pressable>
            </HStack>
          </Box>
          <HStack
            bg="white"
            p={4}
            pt={3}
            justifyContent="space-between"
            roundedTop="md"
            roundedBottom="xl"
          >
            <Text fontSize="md">Amount Due: </Text>
            <Text fontSize="md">10 cUSD</Text>
          </HStack>
        </VStack>
        <Spacer />
        <Stack alignItems="center" mb={8}>
          <Button
            isLoading={false}
            isLoadingText="Submitting"
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              fundRound()
            }}
          >
            Fund
          </Button>
          <Button
            isLoading={false}
            isLoadingText="Submitting"
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              fundRound()
            }}
          >
            Get Allowance
          </Button>
        </Stack>
      </VStack>
    </Box>
  )
}
