import { Box, Text, HStack, Icon, FlatList } from 'native-base'
import { RefreshControl } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getSpaces } from './spacesManager'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { fetchSpaces } from './spacesSlice'
import { FeatureHomeCard, FeatureItem } from 'clixpesa/components'

export default function SpacesScreen({ navigation, route }) {
  const roscaAddress = useSelector((s) => s.spaces.userSpaces.roscas[0])
  const dispatch = useDispatch()
  //const offers = useSelector((s) => s.loans.allSpaces)
  const [spaces, setSpaces] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  //const navigation = useNavigation();
  let totalBalance = 0.0
  useEffect(() => {
    const fetchMySpaces = async () => {
      const mySpaces = await celoHelper.smartContractCall('Spaces', {
        method: 'getMySpaces',
        methodType: 'read',
      })
      const results = await getSpaces()
      console.log(results)
      setSpaces(results)
      for (const idx in mySpaces) {
        if (!results.find((ln) => ln.address === mySpaces[idx][0])) {
          console.log(mySpaces[idx])
          dispatch(fetchSpaces())
          return
        }
      }
    }

    const unsubscribe = navigation.addListener('focus', () => {
      fetchMySpaces()
    })

    return unsubscribe
  }, [navigation])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    dispatch(fetchSpaces())
    wait(2000).then(async () => {
      const results = await getSpaces()
      setSpaces(results)
      setRefreshing(false)
    })
  }, [])

  if (spaces.length > 0) {
    spaces.forEach((space) => {
      totalBalance += space.repaid * 1
    })
    //wait(1000).then(() => dispatch(updateLoans()))
  }
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FlatList
        width="95%"
        data={spaces}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            <FeatureHomeCard
              balance={totalBalance.toFixed(4).toString()}
              apprxBalance={(totalBalance * 120.75).toFixed(2).toString()}
              // expScreen="DummyModal"
              btn1={{
                icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
                name: 'New Space',
                screen: 'createSpace',
              }}
              btn2={{
                icon: (
                  <Icon as={Feather} name="arrow-up-right" size="md" color="primary.600" mr="1" />
                ),
                name: 'Fund',
                screen: 'DummyModal',
              }}
              itemBottom={false}
            />
            {spaces.length > 0 ? (
              <HStack justifyContent="space-between" mx={4} mt={3} mb={1}>
                <Text fontWeight="medium" color="blueGray.600">
                  Spaces
                </Text>
                <Text color="primary.600">See all</Text>
              </HStack>
            ) : null}
          </>
        }
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop={index == 0 ? '2xl' : 'md'}
            roundedBottom={index == spaces.length - 1 ? '2xl' : 'md'}
            mt={1}
          >
            <FeatureItem
              initiated={item.initiated}
              itemTitle={item.name}
              payProgress={
                (item.repaid * 1).toFixed(2).toString() +
                '/' +
                (item.value * 1).toFixed(2).toString() +
                ' Paid'
              }
              value={(item.value * 1).toFixed(2).toString() + ' cUSD'}
              dueDate={'Due: ' + item.dueDate}
              screen="RoscaHome"
              itemParams={{ roscaAddress: item.addr }}
            />
          </Box>
        )}
        keyExtractor={(item) => item.addr}
      />
    </Box>
  )
}
