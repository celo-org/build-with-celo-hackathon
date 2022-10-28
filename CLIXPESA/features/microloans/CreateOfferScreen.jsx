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
  Icon,
  ScrollView,
  Modal,
} from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { getDaysBetween } from 'clixpesa/utils/time'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { utils } from 'ethers'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { ONRsIface } from '../../blockchain/contracts'
import { fetchOffers } from './loansSlice'

export default function CreateOfferScreen({ navigation }) {
  const dispatch = useDispatch()
  const loanONRsAddr = useSelector((s) => s.loans.ONRsAddr)
  const thisUser = useSelector((s) => s.essential.userDetails.names)
  const thisAddress = useSelector((s) => s.wallet.walletInfo.address)
  const { isOpen, onOpen, onClose } = useDisclose()
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [interest, setInterest] = useState('')
  const [duration, setDuration] = useState({ min: '', max: '' })
  const [limit, setLimit] = useState({ min: '', max: '' })
  const [offerID, setOfferID] = useState('')
  const [deadline, setDeadline] = useState(new Date(Date.now()))
  const [isOkDeadline, setOkDeadline] = useState(true)
  const [isOkValue, setOkValue] = useState(true)
  const date = deadline.toLocaleString('en-US').split(' ')

  useEffect(() => {
    const id = nanoid()
    setOfferID(id)
  }, [])

  const handleOfferData = async () => {
    const offerData = {
      id: offerID,
      lender: thisAddress,
      lenderName: thisUser,
      principal: utils.parseEther(amount).toString(),
      minLimit: utils.parseEther(limit.min).toString(),
      maxLimit: utils.parseEther(limit.max).toString(),
      interest: interest * 100,
      minDuration: duration.min * 7,
      maxDuration: duration.max * 7,
    }
    if (validate(offerData)) {
      setIsLoading(true)
      const txReceipt = await celoHelper.smartContractCall('ONRs', {
        contractAddress: loanONRsAddr,
        method: 'createOffer',
        methodType: 'write',
        params: [Object.values(offerData)],
      })
      handleTxResponce(txReceipt)
    } else {
      console.log(Object.values(offerData))
      onOpen()
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
    return true
  }

  const handleTxResponce = (txReceipt) => {
    setIsLoading(false)
    const thisLog = txReceipt.logs.find((el) => el.address === loanONRsAddr)
    const results = ONRsIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    if (offerID === results.args[1][0]) {
      onOpen()
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1} bg="muted.100" alignItems="center">
        <VStack space={3}>
          <Stack mx={6} mt={8}>
            <Text>Set an amount, duration, interest and limit for your loan</Text>
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
                />
              </HStack>
              <Text px={5} mb={3}>
                Max Borrowable: 300 cUSD
              </Text>
            </Box>
            <Stack bg="white" py={3} px={4} rounded="md">
              <HStack justifyContent="space-between">
                <Text fontSize="md">Duration</Text>
                <Pressable onPress={() => {}}>
                  <HStack space={2}>
                    <Text color="primary.600" fontSize="md">
                      Weeks
                    </Text>
                    <Icon as={Feather} name="chevron-down" color="primary.600" size="lg" />
                  </HStack>
                </Pressable>
              </HStack>
              <HStack mt={2} justifyContent="space-between" alignItems="center">
                <Input
                  py={1}
                  textAlign="right"
                  placeholder="min"
                  width="45%"
                  size="lg"
                  keyboardType="numeric"
                  value={duration.min}
                  onChangeText={(text) => setDuration({ ...duration, min: text })}
                />
                <Text fontSize="lg"> - </Text>
                <Input
                  py={1}
                  textAlign="right"
                  placeholder="max"
                  width="45%"
                  size="lg"
                  keyboardType="numeric"
                  value={duration.max}
                  onChangeText={(text) => setDuration({ ...duration, max: text })}
                />
              </HStack>
            </Stack>

            <Stack bg="white" py={3} px={4} rounded="md">
              <HStack justifyContent="space-between">
                <Text fontSize="md">Limit</Text>

                <Text fontSize="md" mr={3}>
                  cUSD
                </Text>
              </HStack>
              <HStack mt={2} justifyContent="space-between" alignItems="center">
                <Input
                  py={1}
                  textAlign="right"
                  placeholder="min"
                  width="45%"
                  size="lg"
                  keyboardType="numeric"
                  InputRightElement={<Text pr={3}>cUSD</Text>}
                  value={limit.min}
                  onChangeText={(amount) => setLimit({ ...limit, min: amount })}
                />
                <Text fontSize="lg"> - </Text>
                <Input
                  py={1}
                  textAlign="right"
                  placeholder="max"
                  width="45%"
                  size="lg"
                  keyboardType="numeric"
                  InputRightElement={<Text pr={3}>cUSD</Text>}
                  value={limit.max}
                  onChangeText={(amount) => setLimit({ ...limit, max: amount })}
                />
              </HStack>
            </Stack>
            <Stack bg="white" py={3} px={4} roundedTop="md" roundedBottom="2xl">
              <HStack justifyContent="space-between">
                <Text fontSize="md">Interest</Text>

                <Text fontSize="md" mr={3}>
                  %
                </Text>
              </HStack>
              <HStack mt={2} justifyContent="space-between" alignItems="center">
                <Text>Repayment: {(amount * 1 * (100 + interest * 1)) / 100} cUSD</Text>
                <Input
                  py={1}
                  textAlign="right"
                  placeholder="0.00"
                  width="45%"
                  size="lg"
                  keyboardType="numeric"
                  value={interest}
                  onChangeText={(value) => setInterest(value)}
                />
              </HStack>
            </Stack>
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide">
            <Modal.Content width="65%" maxWidth="400px">
              <Modal.Body alignItems="center">
                <Icon as={Ionicons} name="md-checkmark-circle" size="6xl" color="success.600" />
                <Text textAlign="center" mt={3}>
                  Offer number {offerID.toUpperCase()} created successfully!
                </Text>
                <Button
                  variant="subtle"
                  rounded="3xl"
                  w="60%"
                  mt={3}
                  _text={{ color: 'primary.600', fontWeight: 'semibold' }}
                  onPress={() => {
                    onClose(), dispatch(fetchOffers()), navigation.navigate('Offers')
                  }}
                >
                  OK
                </Button>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <Spacer />
          <Stack alignItems="center" space={3} mb={8}>
            <Button
              isLoading={isLoading}
              isLoadingText="Submitting"
              rounded="3xl"
              w="60%"
              _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => {
                handleOfferData()
              }}
            >
              Continue
            </Button>
          </Stack>
        </VStack>
      </Box>
    </ScrollView>
  )
}
