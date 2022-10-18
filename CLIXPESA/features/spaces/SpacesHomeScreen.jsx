import { Box, Text, HStack, Icon, FlatList } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

<<<<<<< HEAD
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
=======
import { FeatureHomeCard, FeatureItem } from 'clixpesa/components'

export default function SpacesScreen({ navigation, route }) {
  const roscaAddress = useSelector((s) => s.spaces.userSpaces.roscas[0])
  //const navigation = useNavigation();
  const spaces = [
    {
      addr: '0x001',
      name: 'Chamma',
      initiated: false,
      value: 300,
      repaid: 10,
      dueDate: '14 Sep 2022',
    },
    {
      addr: '0x002',
      name: 'Sherehe',
      initiated: true,
      value: 500,
      repaid: 200,
      dueDate: '24 Oct 2022',
    },
  ]
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FeatureHomeCard
        balance="30.3780"
        apprxBalance="3,037.80"
        expScreen="DummyModal"
        btn1={{
          icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
          name: 'New Space',
          screen: 'DummyModal',
        }}
        btn2={{
          icon: <Icon as={Feather} name="arrow-up-right" size="md" color="primary.600" mr="1" />,
          name: 'Fund',
          screen: 'DummyModal',
        }}
      />
      <FlatList
        width="95%"
        data={spaces}
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop="md"
            roundedBottom={index == spaces.length - 1 ? '2xl' : 'md'}
            mt={1}
>>>>>>> setup loans feature
          >
            {index == 0 ? (
              <HStack justifyContent="space-between" mx={4} mt={2} mb={1}>
                <Text fontWeight="medium" color="blueGray.600">
                  Spaces
                </Text>
                <Text color="primary.600">See all</Text>
              </HStack>
            ) : null}
            <FeatureItem
              initiated={item.initiated}
              itemTitle={item.name}
              payProgress={
                item.repaid.toFixed(2).toString() + '/' + item.value.toFixed(2).toString() + ' Paid'
              }
              value={item.value.toFixed(2).toString() + ' cUSD'}
              dueDate={'Due: ' + item.dueDate}
              screen="SpaceHome"
            />
          </Box>
        )}
        keyExtractor={(item) => item.addr}
      />
    </Box>
  )
}
