import {
  Box,
  Text,
  Image,
  HStack,
  Button,
  Spacer,
  VStack,
  Progress,
  Avatar,
  Spinner,
  Icon,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { HeaderBackButton } from '@react-navigation/elements'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRoscaData } from './spacesSlice'

export default function RoscaHomeScreen({ navigation, route }) {
  const roscaAddress = route.params.roscaAddress
  console.log(roscaAddress)
  const dispatch = useDispatch()
  const { roscaDetails } = useSelector((state) => state.spaces)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    dispatch(getRoscaData(roscaAddress))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => {
        return (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.navigate('Spaces')
            }}
          />
        )
      },
    })
  }, [navigation])

  const prog = (roscaDetails.roscaBal / roscaDetails.goalAmount) * 100
  if (!roscaDetails) {
    return <Spinner size="lg" />
  }
  return (
    <Box flex={1} bg="muted.100">
      <Image
        source={{
          uri: roscaDetails.imgLink,
        }}
        alt="Your groups photo"
        height="35%"
        minH={240}
      />
      <Box position="absolute" top="11%" left={3}>
        <Box bg="rgba(52, 52, 52, 0.3)" minW="2/3" rounded="lg">
          <Box p={3} minW="2/3">
            <Text fontSize="md" fontWeight="medium" color="white" lineHeight="xs">
              Balance (cUSD)
            </Text>
            <Text fontSize="3xl" fontWeight="semibold" color="white">
              {roscaDetails.roscaBal}
            </Text>
            <Text fontSize="sm" color="white" lineHeight="xs">
              ≈ {(roscaDetails.roscaBal * 120.75).toFixed(2)} KES
            </Text>
          </Box>
        </Box>
        <HStack space={2} mt={3}>
          <Button
            leftIcon={<Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />}
            variant="subtle"
            rounded="3xl"
            pr="4"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate('fundSpace')}
          >
            Fund
          </Button>
          <Button
            leftIcon={
              <Icon as={Feather} name="arrow-down-right" size="md" color="primary.600" mr="1" />
            }
            variant="subtle"
            rounded="3xl"
            pr="4"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          >
            Withdraw
          </Button>
          <Button
            leftIcon={
              <Icon as={Feather} name="more-horizontal" size="md" color="primary.600" mx="2" />
            }
            variant="subtle"
            rounded="3xl"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          />
        </HStack>
      </Box>
      <Box alignItems="center" mt={3}>
        <HStack mx="8" my="2">
          <Text fontWeight="medium" color="blueGray.600">
            Round: {roscaDetails.currentRound}
          </Text>
          <Spacer />
          <Text _light={{ color: 'primary.600' }} fontWeight="medium">
            Due for: {roscaDetails.creator ? roscaDetails.creator.slice(0, 6) : 'Next'}
          </Text>
        </HStack>
        <Box bg="white" roundedTop="xl" roundedBottom="md" width="95%">
          <VStack space={2}>
            <HStack mx="5" my="2">
              <Text fontWeight="semibold" fontSize="md">
                Saved: {prog.toFixed(1)}%
              </Text>
              <Spacer />
              <Text _light={{ color: 'muted.500' }} fontWeight="medium" pt={1}>
                {roscaDetails.roscaBal} / {roscaDetails.goalAmount}
              </Text>
            </HStack>
            <Progress colorScheme="primary" value={prog} mx="4" bg="primary.100" />
            <HStack mx="5" my="2">
              <Text fontWeight="medium" color="muted.500">
                Due: {roscaDetails.dueDate}
              </Text>
              <Spacer />
              <Text _light={{ color: 'muted.500' }} fontWeight="medium">
                2/5 Contributions
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box bg="white" roundedTop="md" roundedBottom="xl" width="95%" mt={1}>
          <HStack mx="5" my="2" pb={1}>
            <Text fontWeight="medium" fontSize="md" color="blueGray.600">
              Your Contribution
            </Text>
            <Spacer />
            <Text _light={{ color: 'primary.600' }} fontWeight="medium" py={1}>
              {roscaDetails.roscaBal}/
              {(roscaDetails.goalAmount * 1) / (roscaDetails.activeMembers * 1)} cUSD
            </Text>
          </HStack>
        </Box>
      </Box>
      <Box alignItems="center" mt={3}>
        <HStack mx="8" my="2">
          <Text fontWeight="medium" color="blueGray.600">
            Transactions
          </Text>
          <Spacer />
          <Text _light={{ color: 'primary.600' }} fontWeight="medium">
            See all
          </Text>
        </HStack>
        <VStack w="95%" space={0.5}>
          <Box bg="white" roundedTop="xl" roundedBottom="md">
            <HStack m={2}>
              <Avatar>AK</Avatar>
              <VStack minW="78%" ml={3}>
                <HStack>
                  <Text fontWeight="medium" color="blueGray.600">
                    Akimbo funded Round 2
                  </Text>
                  <Spacer />
                  <Text color="primary.600" fontWeight="medium">
                    + 600
                  </Text>
                </HStack>
                <HStack>
                  <Text color="blueGray.600">Mon, 26 Jul, 10:30</Text>
                  <Spacer />
                  <Text color="muted.500">870/1667.78</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          <Box bg="white" roundedTop="md" roundedBottom="xl">
            <HStack m={2}>
              <Avatar>BK</Avatar>
              <VStack minW="78%" ml={3}>
                <HStack>
                  <Text fontWeight="medium" color="blueGray.600">
                    Bishi funded Round 2
                  </Text>
                  <Spacer />
                  <Text color="primary.600" fontWeight="medium">
                    + 500
                  </Text>
                </HStack>
                <HStack>
                  <Text color="blueGray.600">Mon, 26 Jul, 10:30</Text>
                  <Spacer />
                  <Text color="muted.500">500/1667.78</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
