import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Pressable,
  Stack,
  Button,
  Spacer,
  useDisclose,
  Modal,
  Icon,
} from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { getDaysBetween } from 'clixpesa/utils/time'
import { utils } from 'ethers'
import celoHelper from 'clixpesa/blockchain/helpers/celoHelper'
import { LoansIface } from 'clixpesa/blockchain/contracts'
import { config } from 'clixpesa/blockchain/configs/celo.config'
import { fetchOffers } from './loansSlice'
import { getDefaultNewLoanName, loansListCache } from './loansManager'
import { LOANS_STORE } from 'clixpesa/app/constants'
import { storeUserLoan } from 'clixpesa/app/storage'

export default function ApplyLoanScreen({ navigation, route }) {
  const loanParams = route.params ? route.params.loanParams : null
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclose()
  const thisUser = useSelector((s) => s.essential.userDetails.names)
  const thisAddress = useSelector((s) => s.wallet.walletInfo.address)
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [deadline, setDeadline] = useState(new Date(Date.now()))
  const [isOkDeadline, setOkDeadline] = useState(true)
  const [isOkValue, setOkValue] = useState(true)
  const date = deadline.toLocaleString('en-US').split(' ')
  const [newLoan, setNewLoan] = useState({})

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

  const handleLoanData = async () => {
    const loanData = {
      id: loanParams.id,
      token: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      lender: loanParams.lender,
      lenderName: loanParams.lenderName,
      borrower: thisAddress,
      borrowerName: thisUser,
      principal: utils.parseEther(amount).toString(),
      interest: loanParams.interest * 100,
      estRepayment: utils.parseEther(((amount * 1 * (100 + 5)) / 100).toString()).toString(),
      minDuration: loanParams.minDuration,
      maxDuration: loanParams.maxDuration,
      deadline: Date.parse(deadline.toDateString() + ' 11:59 pm'),
    }
    if (validate(loanData)) {
      setIsLoading(true)
      try {
        const txReceipt = await celoHelper.smartContractCall('Loans', {
          method: 'BorrowLoan',
          methodType: 'write',
          params: [Object.values(loanData)],
        })
        handleTxResponce(txReceipt)
      } catch (error) {
        console.log(error.code)
      }
    } else {
      handleTxResponce(txRecpt)
      console.log('There is problem')
    }
  }

  const validate = (loanData) => {
    const minDays = loanParams.minDuration
    const maxDays = loanParams.maxDuration

    const days = getDaysBetween(Date.now(), deadline)
    if (days < minDays || days > maxDays) {
      setOkDeadline(false)
    } else {
      setOkDeadline(true)
    }
    if (loanParams.minLimit > amount * 1 || amount * 1 > loanParams.maxLimit) {
      console.log(amount)
      setOkValue(false)
    } else {
      setOkValue(true)
    }
    return (
      days >= minDays &&
      days <= maxDays &&
      amount * 1 >= loanParams.minLimit &&
      amount * 1 <= loanParams.maxLimit
    )
    //return false
  }

  const handleTxResponce = async (txReceipt) => {
    setIsLoading(false)
    const thisLog = txReceipt.logs.find((el) => el.address === config.contractAddresses['Loans'])
    const results = LoansIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    const loanName = await getDefaultNewLoanName()
    const dueDate = new Date(results.args[2][11].toString() * 1)
    const loanDetails = {
      pending: true,
      name: loanName,
      address: results.args[0],
      balance: utils.formatUnits(results.args[2][6], 'ether'),
      paid: 0,
      repayment: utils.formatUnits(results.args[2][6], 'ether'),
      dueDate: dueDate.toDateString(),
      initiated: false,
    }
    setNewLoan(loanDetails)
    if (loanParams.id === results.args[2][0]) {
      onOpen()
      await storeUserLoan(LOANS_STORE, loanDetails)
      Object.assign(loansListCache, { [loanDetails.address]: loanDetails })
    }
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3} width="95%">
        <Stack mx={6} mt={8}>
          <Text>Set an amount and deadline for your loan</Text>
          {loanParams.lender ? (
            <Text fontSize="md">
              Limit: {(loanParams.minLimit * 1).toFixed(2)} - {(loanParams.maxLimit * 1).toFixed(2)}{' '}
              cUSD
            </Text>
          ) : (
            <Text fontSize="md">Duration: 2 - 3 weeks</Text>
          )}
        </Stack>
        <Stack space={1}>
          {loanParams.lender ? (
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
                Max Borrowable: {(loanParams.maxLimit * 1).toFixed(2)} cUSD
              </Text>
            </Box>
          ) : null}
          <HStack
            bg="white"
            py={3}
            px={4}
            justifyContent="space-between"
            roundedTop={loanParams.lender ? '2xl' : 'md'}
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
                <Text>{loanParams.lenderName}</Text>
              </HStack>
              <HStack justifyContent="space-between" px={4}>
                <Text fontWeight="medium">Interest:</Text>
                <Text>{loanParams.interest}% (45% APR)</Text>
              </HStack>
              <HStack justifyContent="space-between" px={4}>
                <Text fontWeight="medium">Duration:</Text>
                <Text>
                  {loanParams.minDuration / 7} - {loanParams.maxDuration / 7} weeks
                </Text>
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
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide">
        <Modal.Content width="65%" maxWidth="400px">
          <Modal.Body alignItems="center">
            <Icon as={Ionicons} name="md-checkmark-circle" size="6xl" color="success.600" />
            <Text textAlign="center" mt={3}>
              You have initiated a loan of
            </Text>
            <Text textAlign="center" fontWeight="semibold">
              {(amount * 1).toFixed(2)} cUSD
            </Text>
            <Text textAlign="center">from {loanParams.lenderName}</Text>
            <Button
              variant="subtle"
              rounded="3xl"
              w="60%"
              mt={3}
              _text={{ color: 'primary.600', fontWeight: 'semibold' }}
              onPress={() => {
                onClose(), dispatch(fetchOffers()), navigation.navigate('LoanHome', newLoan)
              }}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Spacer />
      <Stack alignItems="center" space={3} mb={8} width="95%">
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
    </Box>
  )
}

const txRecpt = {
  blockHash: '0xaf8d6cfc8370b5b928494e4f75fc8d73135d7db7f7956d5e54403487b349c2c2',
  blockNumber: 14281731,
  byzantium: true,
  confirmations: 1,
  contractAddress: null,
  cumulativeGasUsed: {
    hex: '0x05d720',
    type: 'BigNumber',
  },
  effectiveGasPrice: {
    hex: '0x05f5e100',
    type: 'BigNumber',
  },
  from: '0x61979179B0EFcad139Bf6AcAA32Ba7aF50e41BA1',
  gasUsed: {
    hex: '0x05d720',
    type: 'BigNumber',
  },
  logs: [
    {
      address: '0xD153C919944b412AB9383f97C47DdBC50D2C7225',
      blockHash: '0xaf8d6cfc8370b5b928494e4f75fc8d73135d7db7f7956d5e54403487b349c2c2',
      blockNumber: 14281731,
      data: '0x000000000000000000000000cc426c8a8a9601fa17bde3a639f32e92cff2dbfa00000000000000000000000061979179b0efcad139bf6acaa32ba7af50e41ba100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000180000000000000000000000000874069fa1eb16d44d622f2e0ca25eea172369bc10000000000000000000000008e912ee99bfaecae8364ba6604612ffdfe46afd200000000000000000000000000000000000000000000000000000000000001c000000000000000000000000061979179b0efcad139bf6acaa32ba7af50e41ba100000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000000000c800000000000000000000000000000000000000000000000091b77e5e5d9a00000000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000001843a23de200000000000000000000000000000000000000000000000000000000000000015514e3134712d735456735f347553396d58744c79460000000000000000000000000000000000000000000000000000000000000000000000000000000000000b44656b616e204b61636869000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b416b696d626f204b657961000000000000000000000000000000000000000000',
      logIndex: 0,
      topics: ['0x47174e8187e8170c77d654fe9dc9c5a36dc9700b8743cbfe78795c42c0d221bf'],
      transactionHash: '0xbc2e7100148a1a693156804f501698d7a4b69f9f07887f1db3362ec2eedd07e2',
      transactionIndex: 0,
    },
    {
      address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      blockHash: '0xaf8d6cfc8370b5b928494e4f75fc8d73135d7db7f7956d5e54403487b349c2c2',
      blockNumber: 14281731,
      data: '0x00000000000000000000000000000000000000000000000000001947500f2860',
      logIndex: 1,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x00000000000000000000000061979179b0efcad139bf6acaa32ba7af50e41ba1',
        '0x000000000000000000000000aa963fc97281d9632d96700ab62a4d1340f9a28a',
      ],
      transactionHash: '0xbc2e7100148a1a693156804f501698d7a4b69f9f07887f1db3362ec2eedd07e2',
      transactionIndex: 0,
    },
    {
      address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      blockHash: '0xaf8d6cfc8370b5b928494e4f75fc8d73135d7db7f7956d5e54403487b349c2c2',
      blockNumber: 14281731,
      data: '0x0000000000000000000000000000000000000000000000000000098853a3f7a0',
      logIndex: 2,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x00000000000000000000000061979179b0efcad139bf6acaa32ba7af50e41ba1',
        '0x0000000000000000000000005ac064ff2cebc9154b9bbc1ecdbc5231573b9cdf',
      ],
      transactionHash: '0xbc2e7100148a1a693156804f501698d7a4b69f9f07887f1db3362ec2eedd07e2',
      transactionIndex: 0,
    },
  ],
  logsBloom:
    '0x00000000000020000000000000080000000000000000000000000000000000000000000000004000000000000000000000000000040000000000000000000000000000000000000000000008000000000000000000000000000008000000000002001000000000000000000000000000000000000000000000000012000000000000000800000200000000000000000000400000080000000000000400000000020000000000080000000000000000000000000000000010000100000000000000000002000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: 1,
  to: '0xD153C919944b412AB9383f97C47DdBC50D2C7225',
  transactionHash: '0xbc2e7100148a1a693156804f501698d7a4b69f9f07887f1db3362ec2eedd07e2',
  transactionIndex: 0,
  type: 0,
}
