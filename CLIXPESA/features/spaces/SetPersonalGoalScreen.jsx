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
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { setCtbSchedule, setDisbSchedule, setGoalAmount, setUserSpaces } from './spacesSlice'

export default function SetPersonalGoalScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const spaceInfo = useSelector((state) => state.spaces.spaceInfo)
  const [amount, setAmount] = useState('')
  const { isOpen, onOpen, onClose } = useDisclose()
  const [isSetCtb, setIsSetCtb] = useState(false)
  const [schedule, setSchedule] = useState({
    day: spaceInfo.ctbDay,
    occurrence: spaceInfo.ctbOccurence,
  })

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3}>
        <Text mx={6} mt={8}>
          Set an amount and contribution schedule for your goal
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
                onChangeText={(text) => setAmount(text)}
                onSubmitEditing={() => dispatch(setGoalAmount(amount))}
              />
            </HStack>
          </Box>
          <HStack bg="white" py={3} px={4} justifyContent="space-between" rounded="md">
            <Text fontSize="md">Contribution Schedule:</Text>
            <Pressable onPress={onOpen} onPressOut={() => setIsSetCtb(true)}>
              {schedule.day !== 'every' ? (
                <Text color="primary.600" fontSize="md">
                  {schedule.occurrence} on {schedule.day.slice(0, 3)}
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
                  _text={{
                    color: 'primary.600',
                    fontWeight: 'semibold',
                    mb: '0.5',
                  }}
                  onPress={() => setSchedule({ day: 'every', occurrence: 'Daily' })}
                >
                  Daily
                </Button>
                <Button
                  variant="subtle"
                  rounded="3xl"
                  w="25%"
                  _text={{
                    color: 'primary.600',
                    fontWeight: 'semibold',
                    mb: '0.5',
                  }}
                  onPress={() => setSchedule({ day: schedule.day, occurrence: 'Weekly' })}
                >
                  Weekly
                </Button>
                <Button
                  variant="subtle"
                  rounded="3xl"
                  w="25%"
                  _text={{
                    color: 'primary.600',
                    fontWeight: 'semibold',
                    mb: '0.5',
                  }}
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
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          setSchedule({
                            day: item,
                            occurrence: schedule.occurrence,
                          })
                        }
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
                _text={{
                  color: 'primary.600',
                  fontWeight: 'semibold',
                  mb: '0.5',
                }}
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
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              navigation.navigate('PersonalHome')
              // dispatch(setUserSpaces())
            }}
          >
            Continue
          </Button>
        </Stack>
      </VStack>
    </Box>
  )
}
