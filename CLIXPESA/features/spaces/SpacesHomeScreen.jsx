import { Box, Text, HStack, Icon, FlatList } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

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
        // expScreen="DummyModal"
        btn1={{
          icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
          name: 'New Space',
          screen: 'createSpace',
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
