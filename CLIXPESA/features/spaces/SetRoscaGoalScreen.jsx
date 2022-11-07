import {
  Box,
  Text,
  VStack,
  Spacer,
  Button,
  Stack,
  HStack,
  Input,
  Pressable,
  Actionsheet,
  useDisclose,
  FlatList,
  Modal,
  Icon,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  getRoscaData,
  setCtbSchedule,
  setDisbSchedule,
  setGoalAmount,
  setUserSpaces,
} from './spacesSlice'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { config } from '../../blockchain/configs/celo.config'
import { spacesIface } from '../../blockchain/contracts'
import { utils } from 'ethers'

export default function SetRoscaGoalScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const spaceInfo = useSelector((state) => state.spaces.spaceInfo)
  const [newRosca, setNewRosca] = useState()
  const [amount, setAmount] = useState('0')
  const { isOpen, onOpen, onClose } = useDisclose()
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose()
  const [isSetCtb, setIsSetCtb] = useState(false)
  const [schedule, setSchedule] = useState({
    day: spaceInfo.ctbDay,
    occurrence: spaceInfo.ctbOccurence,
  })

  const [isLoading, setIsLoading] = useState(false)
  const userAddress = useSelector((s) => s.wallet.walletInfo.address)
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const members = useSelector((state) => state.spaces.spaceInfo.members)
  const createRosca = async () => {
    setIsLoading(true)
    const ctbAmount = utils.parseEther(spaceInfo.ctbAmount.toString()).toString()
    const goalAmount = utils.parseEther(spaceInfo.goalAmount.toString()).toString()
    //let results
    const imageLink =
      'https://images.unsplash.com/photo-1493655430214-3dd7718460bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    try {
      let txData = {
        token: config.contractAddresses['StableToken'],
        roscaName: spaceInfo.name,
        imageLink,
        authCode: spaceInfo.authCode,
        goalAmount,
        ctbAmount,
        ctbDay: spaceInfo.ctbDay,
        ctbOccur: spaceInfo.ctbOccurence,
        disbDay: spaceInfo.disbDay,
        disbOccur: spaceInfo.disbOccurence,
      }
      const txReceipt = await celoHelper.smartContractCall('Spaces', {
        method: 'createRosca',
        methodType: 'write',
        params: [Object.values(txData)],
      })
      handleTxResponce(txReceipt)
    } catch (e) {
      console.log(e)
    }
  }

  const handleTxResponce = (txReceipt) => {
    setIsLoading(false)
    const { data, topics } = txReceipt.logs.find(
      (el) => el.address === config.contractAddresses['Spaces'],
    )
    const results = spacesIface.parseLog({ data, topics })
    if (results) {
      const roscaDetails = {
        address: results.args.roscaAddress,
        roscaName: results.args[2][1],
        goalAmount: utils.formatUnits(results.args[2][4], 'ether'),
        goalAmountPaid: 0,
        ctbDay: results.args[2][6],
        ctbOccur: results.args[2][7],
      }
      setNewRosca(roscaDetails)
      dispatch(setUserSpaces(results.args.roscaAddress))
      onOpen1()
    }
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3}>
        <Text mx={6} mt={8}>
          Set an amount and contribution and disbursment schedule
        </Text>
        <Stack mx={2} space={1}>
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
                onClose={() => dispatch(setGoalAmount(amount))}
                onSubmitEditing={() => dispatch(setGoalAmount(amount))}
              />
            </HStack>
            <Text px={5} mb={3}>
              Each member contributes:{' '}
              {members.length > 0 ? (amount / members.length).toFixed(2).toString() : 'some'} cUSD
            </Text>
          </Box>
          <HStack bg="white" py={3} px={4} justifyContent="space-between" rounded="md">
            <Text fontSize="md">Contribution Schedule:</Text>
            <Pressable onPress={onOpen} onPressOut={() => setIsSetCtb(true)}>
              {spaceInfo.ctbDay !== 'every' ? (
                <Text color="primary.600" fontSize="md">
                  {spaceInfo.ctbOccurence} on {spaceInfo.ctbDay.slice(0, 3)}
                </Text>
              ) : (
                <Text color="primary.600" fontSize="md">
                  Everyday
                </Text>
              )}
            </Pressable>
          </HStack>
          <HStack
            bg="white"
            p={4}
            pt={3}
            justifyContent="space-between"
            roundedTop="md"
            roundedBottom="xl"
          >
            <Text fontSize="md">Disbursment Schedule:</Text>
            <Pressable onPress={onOpen} onPressOut={() => setIsSetCtb(false)}>
              {spaceInfo.disbDay !== 'every' ? (
                <Text color="primary.600" fontSize="md">
                  {spaceInfo.disbOccurence} on {spaceInfo.disbDay.slice(0, 3)}
                </Text>
              ) : (
                <Text color="primary.600" fontSize="md">
                  Everyday
                </Text>
              )}
            </Pressable>
          </HStack>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Box alignSelf="flex-start" ml={3}>
                <Text fontSize="md" fontWeight="medium">
                  Schedule
                </Text>
                <Text fontSize="md" color="muted.500">
                  {schedule.occurrence} on {schedule.day}
                </Text>
              </Box>
              <HStack space={3} m={3}>
                <Button
                  variant="subtle"
                  rounded="3xl"
                  w="25%"
                  _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
                  onPress={() => setSchedule({ day: 'every', occurrence: 'Daily' })}
                >
                  Daily
                </Button>
                <Button
                  variant="subtle"
                  rounded="3xl"
                  w="25%"
                  _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
                  onPress={() => setSchedule({ day: schedule.day, occurrence: 'Weekly' })}
                >
                  Weekly
                </Button>
                <Button
                  variant="subtle"
                  rounded="3xl"
                  w="25%"
                  _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
                  onPress={() => setSchedule({ day: schedule.day, occurrence: 'Monthly' })}
                >
                  Monthly
                </Button>
              </HStack>
              <Box maxH={120} w="2/3" my={2}>
                {schedule.occurrence !== 'Daily' ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={weekDays}
                    //keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => setSchedule({ day: item, occurrence: schedule.occurrence })}
                      >
                        <Text
                          fontSize="xl"
                          color="primary.600"
                          py={1}
                          textAlign="center"
                          borderBottomWidth={1}
                          borderBottomColor="muted.500"
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <>
                    <Text fontWeight="medium" textAlign="center">
                      Its Gonna be Daily.
                    </Text>
                    <Text textAlign="center" color="primary.600">
                      This frequency means that your first contribution will start Today and repeat
                      everyday after that.
                    </Text>
                  </>
                )}
              </Box>
              <Button
                variant="subtle"
                rounded="3xl"
                w="60%"
                my={3}
                _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
                onPress={() => {
                  if (isSetCtb) {
                    dispatch(setCtbSchedule(schedule))
                  } else {
                    dispatch(setDisbSchedule(schedule))
                  }
                }}
                onPressOut={onClose}
              >
                Set
              </Button>
            </Actionsheet.Content>
          </Actionsheet>
        </Stack>
        <Modal isOpen={isOpen1} onClose={onClose1} animationPreset="slide">
          <Modal.Content width="65%" maxWidth="400px">
            <Modal.Body alignItems="center">
              <Icon as={Ionicons} name="md-checkmark-circle" size="6xl" color="success.600" />
              <Text textAlign="center" mt={3}>
                Rosca created successfully!
              </Text>
              <Button
                variant="subtle"
                rounded="3xl"
                w="60%"
                mt={3}
                _text={{ color: 'primary.600', fontWeight: 'semibold' }}
                onPress={() => {
                  onClose(), navigation.navigate('RoscaHome', { roscaAddress: newRosca.address })
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
            variant="subtle"
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          >
            Skip
          </Button>
          <Button
            isLoading={isLoading}
            isLoadingText="Submitting"
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              createRosca()
              dispatch(setUserSpaces(userAddress))
            }}
          >
            Continue
          </Button>
        </Stack>
      </VStack>
    </Box>
  )
}
