import { Box, Text, Image, HStack, Spacer, VStack, Progress, Icon } from 'native-base'
import { HeaderBackButton } from '@react-navigation/elements'
import { useLayoutEffect } from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

export default function PersonalHomeScreen({ navigation }) {
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

  const prog = (300.89 / 5000.0) * 100
  return (
    <Box flex={1} bg="muted.100">
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        }}
        alt="Your groups photo"
        height="35%"
        minH={240}
      />
      <Box position="absolute" top="10%" left={3}>
        <Box bg="rgba(52, 52, 52, 0.3)" w="60%" rounded="lg">
          <Box p={3}>
            <Text fontSize="md" fontWeight="medium" color="white" lineHeight="xs">
              Balance (cUSD)
            </Text>
            <Text fontSize="3xl" fontWeight="semibold" color="white">
              500.00
            </Text>
            <Text fontSize="sm" color="white" lineHeight="xs">
              ≈ 50000.00 KES
            </Text>
          </Box>
        </Box>
        <HStack space={2} mt={3}>
          <Pressable
            width="30%"
            onPress={() => {
              navigation.navigate('addPersonalFund')
            }}
          >
            <HStack bg="primary.100" rounded="full" alignItems="center" ml="1">
              <Icon as={MaterialCommunityIcons} name="plus" size="lg" color="primary.600" m="2" />
              <Text>Fund</Text>
            </HStack>
          </Pressable>

          <Pressable
            width="40%"
            onPress={() => {
              navigation.navigate('withdrawFund')
            }}
          >
            <HStack bg="primary.100" rounded="full" alignItems="center" ml="1">
              <Icon
                as={MaterialCommunityIcons}
                name="arrow-down"
                size="lg"
                color="primary.600"
                m="2"
              />
              <Text>Withdraw</Text>
            </HStack>
          </Pressable>

          <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
            <Icon as={MaterialCommunityIcons} name="cog" size="lg" color="primary.600" m="2" />
          </Box>
        </HStack>
      </Box>

      <Box alignItems="center" mt={3}>
        <HStack mx="3" my="2">
          <Text fontWeight="medium" color="blueGray.600">
            Achievement
          </Text>
          <Spacer />
        </HStack>
        <Box bg="white" roundedTop="xl" roundedBottom="md" width="95%">
          <VStack space={2}>
            <HStack mx="5" my="2">
              <Text fontWeight="semibold" fontSize="md">
                Saved: {prog.toFixed(1)}%
              </Text>
              <Spacer />
              <Text _light={{ color: 'muted.500' }} fontWeight="medium" pt={1}>
                300.89/5000.00 cUSD
              </Text>
            </HStack>
            <Progress colorScheme="primary" value={prog} mx="4" bg="primary.100" />
            <HStack mx="5" my="2">
              <Text fontWeight="medium" color="muted.500">
                30 Sep 2022 - 30 days to go
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
              200/1635.89 cUSD
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
              <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
                <Icon
                  as={MaterialCommunityIcons}
                  name="currency-usd"
                  size="lg"
                  color="primary.600"
                  m="2"
                />
              </Box>
              <VStack minW="78%" ml={3}>
                <HStack>
                  <Text fontWeight="medium" color="blueGray.600">
                    Money added via MPESA
                  </Text>
                  <Spacer />
                  <Text color="primary.600" fontWeight="medium">
                    + 600
                  </Text>
                </HStack>
                <HStack>
                  <Text color="blueGray.600">Mon, 10 Oct, 9:30</Text>
                  <Spacer />
                  <Text color="muted.500">870/1667.78</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          <Box bg="white" roundedTop="md" roundedBottom="xl">
            <HStack m={2}>
              <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
                <Icon
                  as={MaterialCommunityIcons}
                  name="currency-usd"
                  size="lg"
                  color="primary.600"
                  m="2"
                />
              </Box>
              <VStack minW="78%" ml={3}>
                <HStack>
                  <Text fontWeight="medium" color="blueGray.600">
                    Money added via MPESA
                  </Text>
                  <Spacer />
                  <Text color="primary.600" fontWeight="medium">
                    + 500
                  </Text>
                </HStack>
                <HStack>
                  <Text color="blueGray.600">Mon, 10 Oct, 9:30</Text>
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
