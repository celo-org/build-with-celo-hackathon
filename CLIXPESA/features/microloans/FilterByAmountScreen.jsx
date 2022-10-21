import {
  Box,
  Text,
  VStack,
  HStack,
  Stack,
  Input,
  FlatList,
  Button,
  Spacer,
  ScrollView,
} from 'native-base'
import { useState } from 'react'

import { LoanItem } from 'clixpesa/components'

export default function FilterByAmountScreen({ navigation }) {
  const [amount, setAmount] = useState('')
  const [filteredOffers, setFilteredOffers] = useState([])
  const [isDone, setIsDone] = useState(false)

  const offers = [
    {
      id: 0x01,
      lender: 'Akimbo Keya',
      lenderType: 'individual',
      principal: 300,
      interest: 5,
      duration: {
        min: 14,
        max: 21,
      },
      limit: {
        min: 50,
        max: 300,
      },
    },
    {
      id: 0x02,
      lender: 'Wrong Rende',
      lenderType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      limit: {
        min: 50,
        max: 250,
      },
    },
    {
      id: 0x03,
      lender: 'Wrong Rende',
      lenderType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      limit: {
        min: 50,
        max: 250,
      },
    },
    {
      id: 0x04,
      lender: 'Wrong Rende',
      lenderType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      limit: {
        min: 50,
        max: 250,
      },
    },
    {
      id: 0x05,
      lender: 'Wrong Rende',
      lenderType: 'chamaa',
      principal: 1000,
      interest: 8,
      duration: {
        min: 14,
        max: 36,
      },
      limit: {
        min: 50,
        max: 250,
      },
    },
  ]

  const handleFilterOffers = () => {
    const thisOffers = offers.filter(function (el) {
      return amount >= el.limit.min && amount <= el.limit.max
    })
    setFilteredOffers(thisOffers)
  }

  return (
    <Box flex={1} bg="#F5F5F5" alignItems="center">
      <VStack space={3} width="95%">
        <Stack mx={6} mt={8}>
          <Text>Set an amount you would like to borrow</Text>
        </Stack>
        <Stack space={1}>
          <Box bg="white" roundedTop="xl" roundedBottom="md">
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
                onEndEditing={() => {
                  handleFilterOffers()
                  setIsDone(true)
                }}
              />
            </HStack>
            <Text px={5} mb={3}>
              Max Borrowable: 300 cUSD
            </Text>
          </Box>
        </Stack>
      </VStack>
      {amount && isDone ? (
        <FlatList
          data={filteredOffers}
          width="95%"
          ListHeaderComponent={
            filteredOffers.length == 0 ? (
              <Box bg="white" roundedTop="md" roundedBottom="2xl" mt={1}>
                <Text px={5} py={3} alignSelf="center">
                  There is no loan with that range!
                </Text>
                <Stack alignItems="center" space={3} m={3}>
                  <Button
                    variant="subtle"
                    rounded="3xl"
                    w="60%"
                    _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
                    onPress={() => {}}
                  >
                    Create a Request
                  </Button>
                </Stack>
              </Box>
            ) : null
          }
          renderItem={({ item, index }) => (
            <Box
              bg="white"
              opacity={85}
              mt={1}
              mb={index == filteredOffers.length - 1 ? '8' : '0'}
              roundedTop="md"
              roundedBottom={index == filteredOffers.length - 1 ? '2xl' : 'md'}
            >
              <LoanItem
                isOffer={true}
                itemTitle={item.lender}
                type={item.lenderType}
                principal={item.principal}
                interest={item.interest}
                duration={item.duration}
                limit={item.limit}
                screen="applyLoan"
                scrnParams={{ setPrincipal: amount }}
              />
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Box bg="white" roundedTop="md" roundedBottom="2xl" mt={1} width="95%">
          <VStack>
            <Text px={5} py={3} alignSelf="center">
              Enter an amount to see offers in that range.
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
