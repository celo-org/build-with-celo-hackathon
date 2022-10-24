import { Box, Text, VStack, Stack, HStack, Input, Spacer, Button } from 'native-base'
import { useState } from 'react'

export default function RepayLoanScreen({ naviagtion, route }) {
  const loanParams = route.params.loanParams
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3} width="95%">
        <Stack mx={6} mt={8}>
          <Text>Set an amount you wish to pay</Text>
          <Text fontSize="md">Pay a max of: {loanParams.balance} cUSD</Text>
        </Stack>
        <Stack bg="white" rounded="2xl">
          <HStack m={3} space="xl">
            <Text fontSize="lg" py={3} pl={4} fontWeight="semibold">
              cUSD
            </Text>
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
          <Text px={5} mb={3}>
            Account Balance: 300 cUSD
          </Text>
        </Stack>
      </VStack>
      <Spacer />
      <Stack alignItems="center" mb={8} width="95%">
        <Button
          isLoading={isLoading}
          isLoadingText="Submitting"
          rounded="3xl"
          w="60%"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => {}}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  )
}
