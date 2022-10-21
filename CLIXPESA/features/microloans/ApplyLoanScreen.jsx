import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Pressable,
  Stack,
  Button,
  Actionsheet,
  Spacer,
  useDisclose,
  Icon,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { getDaysBetween } from 'clixpesa/utils/time'

export default function ApplyLoanScreen({ navigation, route }) {
  const loanParams = route.params ? route.params.loanParams : null

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [deadline, setDeadline] = useState(new Date(Date.now()))
  const [isOkDeadline, setOkDeadline] = useState(true)
  const [isOkValue, setOkValue] = useState(true)
  const date = deadline.toLocaleString('en-US').split(' ')

  console.log(loanParams)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDeadline(currentDate)
  }

  const handleDatePicker = () => {
    DateTimePickerAndroid.open({
      value: deadline,
      onChange,
      mode: 'date',
      is24Hour: true,
    })
  }

  const handleLoanData = () => {
    const loanData = {
      lender: 'Akimbo Keya',
      borrower: 'Dekan Kachi',
      principal: amount,
      interest: 5,
      repayment: (amount * 1 * (100 + 5)) / 100,
      deadline: deadline,
    }
    if (validate(loanData)) {
      console.log(loanData)
    } else {
      console.log('There is problem')
    }
  }

  const validate = (loanData) => {
    const minDays = 14
    const maxDays = 21
    const days = getDaysBetween(Date.now(), loanData.deadline)
    if (days < minDays || days > maxDays) {
      setOkDeadline(false)
    } else {
      setOkDeadline(true)
    }
    if (amount < 50 || amount > 300) {
      setOkValue(false)
      console.log('is Less')
    } else {
      setOkValue(true)
    }
    return days >= minDays && days <= maxDays && amount >= 50 && amount <= 300
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3} width="95%">
        <Stack mx={6} mt={8}>
          <Text>Set an amount and deadline for your loan</Text>
          {loanParams ? (
            <Text fontSize="md">Duration: 2 - 3 weeks</Text>
          ) : (
            <Text fontSize="md">Limit: 50 - 300 cUSD</Text>
          )}
        </Stack>

        <Stack space={1}>
          {loanParams ? null : (
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
                />
              </HStack>
              <Text px={5} mb={3}>
                Max Borrowable: 300 cUSD
              </Text>
            </Box>
          )}
          <HStack
            bg="white"
            py={3}
            px={4}
            justifyContent="space-between"
            roundedTop={loanParams ? '2xl' : 'md'}
            roundedBottom="2xl"
          >
            <Text fontSize="md">Deadline:</Text>
            <Pressable onPress={() => handleDatePicker()}>
              <HStack space={2}>
                <Text color="primary.600" fontSize="md">
                  {date[2]
                    ? date[0] + ', ' + date[2] + ' ' + date[1] + ' ' + date[4]
                    : date[0] + ', ' + date[3] + ' ' + date[1] + ' ' + date[5]}
                </Text>
                <Icon as={Feather} name="calendar" color="primary.600" size="lg" />
              </HStack>
            </Pressable>
          </HStack>
        </Stack>
        <Stack>
          <Text mx={6} mb={2}>
            Loan Details
          </Text>
          <VStack space={1}>
            <VStack bg="white" roundedTop="xl" roundedBottom="md" space={1}>
              <HStack justifyContent="space-between" pt={3} px={4}>
                <Text fontWeight="medium">Lender:</Text>
                <Text>Akimbo Keya</Text>
              </HStack>
              <HStack justifyContent="space-between" px={4}>
                <Text fontWeight="medium">Interest:</Text>
                <Text>5% (45% APR)</Text>
              </HStack>
              <HStack justifyContent="space-between" px={4}>
                <Text fontWeight="medium">Duration:</Text>
                <Text>2 - 3 weeks</Text>
              </HStack>
              <HStack justifyContent="space-between" px={4}>
                <Text fontWeight="medium">Principal:</Text>
                <Text>≈ {(amount * 120.75).toFixed(2)} KES</Text>
                <HStack alignItems="center" space={2}>
                  {isOkValue ? null : <Icon as={Feather} name="alert-circle" color="danger.500" />}
                  <Text color={isOkValue ? null : 'danger.500'}>
                    {(amount * 1).toFixed(2)} cUSD
                  </Text>
                </HStack>
              </HStack>
              <HStack justifyContent="space-between" px={4}>
                <Text fontWeight="medium">Repayment:</Text>
                <Text>≈ {((amount * 120.75 * (100 + 5)) / 100).toFixed(2)} KES</Text>
                <Text>{((amount * 1 * (100 + 5)) / 100).toFixed(2)} cUSD</Text>
              </HStack>
              <HStack justifyContent="space-between" pb={3} px={4}>
                <Text fontWeight="medium">Repayment Date:</Text>
                <HStack alignItems="center" space={2}>
                  {isOkDeadline ? null : (
                    <Icon as={Feather} name="alert-circle" color="danger.500" />
                  )}
                  <Text color={isOkDeadline ? null : 'danger.500'}>
                    {date[2]
                      ? date[0] + ', ' + date[2] + ' ' + date[1] + ' ' + date[4]
                      : date[0] + ', ' + date[3] + ' ' + date[1] + ' ' + date[5]}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
            <HStack
              bg="white"
              py={3}
              px={4}
              justifyContent="space-between"
              roundedTop="md"
              roundedBottom="2xl"
            >
              <Text fontSize="md">Loan terms and Conditions:</Text>
              <Pressable onPress={() => handleDatePicker()}>
                <HStack space={2}>
                  <Text color="primary.600" fontSize="md">
                    Show
                  </Text>
                  <Icon as={Feather} name="chevron-down" color="primary.600" size="lg" />
                </HStack>
              </Pressable>
            </HStack>
          </VStack>
        </Stack>
        <Spacer />
        <Stack alignItems="center" space={3} mb={8}>
          <Button
            isLoading={isLoading}
            isLoadingText="Submitting"
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              handleLoanData()
            }}
          >
            Continue
          </Button>
        </Stack>
      </VStack>
    </Box>
  )
}
