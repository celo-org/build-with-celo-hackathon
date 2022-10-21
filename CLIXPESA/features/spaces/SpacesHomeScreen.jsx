import {
  Heading,
  Box,
  Text,
  VStack,
  AspectRatio,
  Image,
  HStack,
  Icon,
  Pressable,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

export default function SpacesScreen({ navigation }) {
  const roscaAddress = useSelector((s) => s.spaces.userSpaces.roscas[0])
  return (
    <Box flex={1} bg="muted.50" justifyContent="flex-start" p={6}>
      <Box pt={2} alignItems="center">
        <Heading p={3}>Start saving together today</Heading>
        <Text marginBottom={4} textAlign="center" fontSize="16px">
          What would you like to save for and Who would you like to save with ?
        </Text>
      </Box>
      <Box>
        <Text py={3} fontSize="sm">
          Personal Saving spaces
        </Text>
        <HStack>
          <Box bg="#fff" rounded="xl" padding="2" marginRight="2" width="50%">
            <AspectRatio width="100%">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1493655161922-ef98929de9d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                }}
                borderRadius={6}
                alt="spaces"
              />
            </AspectRatio>
            <HStack mt="2" display="flex" justifyContent="space-between">
              <VStack>
                <Text fontWeight="semibold">Save for a Goal</Text>
                <Text>Save Today</Text>
              </VStack>
              <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
                <Icon as={MaterialCommunityIcons} name="plus" size="lg" color="primary.600" m="2" />
              </Box>
            </HStack>
          </Box>

          <Pressable
            bg="#fff"
            rounded="xl"
            padding="2"
            marginRight="2"
            width="50%"
            onPress={() => {
              navigation.navigate('CustomizePersonal')
            }}
          >
            <AspectRatio w="100%">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                }}
                borderRadius={6}
                alt="spaces"
              />
            </AspectRatio>
            <HStack mt="2" display="flex" justifyContent="space-between">
              <VStack>
                <Text bold>Start a Personal</Text>
                <Text>Savings Space</Text>
              </VStack>
              <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
                <Icon as={MaterialCommunityIcons} name="plus" size="lg" color="primary.600" m="2" />
              </Box>
            </HStack>
          </Pressable>
        </HStack>
      </Box>

      <Box>
        <Text py={3} fontSize="sm">
          Group Saving spaces
        </Text>
        <HStack>
          <Box bg="#fff" rounded="xl" padding="2" marginRight="2" width="50%">
            <AspectRatio width="100%">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1493655161922-ef98929de9d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                }}
                borderRadius={6}
                alt="spaces"
              />
            </AspectRatio>
            <HStack mt="2" display="flex" justifyContent="space-between">
              <VStack>
                <Text bold>Join Thousands</Text>
                <Text>Saving Today</Text>
              </VStack>
              <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
                <Icon as={MaterialCommunityIcons} name="plus" size="lg" color="primary.600" m="2" />
              </Box>
            </HStack>
          </Box>
          <Pressable
            bg="#fff"
            rounded="xl"
            padding="2"
            width="50%"
            onPress={() => {
              //navigation.navigate('selectContacts')
              //navigation.navigate('setRoscaGoal')
              navigation.navigate('RoscaHome', { roscaAddress: roscaAddress })
            }}
          >
            <AspectRatio w="100%">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1517840933437-c41356892b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                }}
                borderRadius={6}
                alt="spaces"
              />
            </AspectRatio>
            <HStack mt="2" display="flex" justifyContent="space-between">
              <VStack>
                <Text fontWeight="semibold">Start a Group</Text>
                <Text>Savings Space</Text>
              </VStack>
              <Box bg="primary.100" rounded="full" alignItems="center" ml="1">
                <Icon as={MaterialCommunityIcons} name="plus" size="lg" color="primary.600" m="2" />
              </Box>
            </HStack>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  )
}
