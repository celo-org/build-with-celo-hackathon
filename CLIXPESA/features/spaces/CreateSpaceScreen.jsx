import { Box, Text, Image, HStack, VStack, Icon } from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function CreateSpaceScreen() {
  const navigation = useNavigation()
  return (
    <VStack roundedTop="xl" roundedBottom="md" margin={2} space="xl" marginTop={8}>
      <Pressable h="35%" onPress={() => navigation.navigate('CustomizePersonal')}>
        <HStack m={2}>
          <VStack bg="white" p={2} space="2xl" borderRadius={10} w="100%">
            <Box
              bg="primary.100"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={60}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="piggy-bank"
                size="lg"
                color="primary.600"
                m="2"
              />
            </Box>
            <VStack>
              <Text fontWeight="semibold">Personal Space</Text>
              <Text w="80%">Put some money aside with your stable coins or cypto</Text>
            </VStack>
          </VStack>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            }}
            alt="personal space"
            size={150}
            borderRadius={100}
            position="absolute"
            top={-30}
            right={-10}
          />
        </HStack>
      </Pressable>
      <Pressable h="35%" onPress={() => navigation.navigate('customizeGroup')}>
        <HStack m={2}>
          <VStack bg="white" p={2} space="2xl" borderRadius={10} w="100%">
            <Box
              bg="primary.100"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={60}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="safe-square"
                size="lg"
                color="primary.600"
                m="2"
              />
            </Box>
            <VStack>
              <Text fontWeight="semibold">Group Space</Text>
              <Text>Chama, vacation?</Text>
              <Text>Save money together for a given goal</Text>
            </VStack>
          </VStack>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1521510186458-bbbda7aef46b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80',
            }}
            alt="personal space"
            size={150}
            borderRadius={100}
            position="absolute"
            top={-30}
            right={-10}
          />
        </HStack>
      </Pressable>
    </VStack>
  )
}