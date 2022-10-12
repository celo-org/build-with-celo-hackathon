import {
  Box,
  Stack,
  Text,
  Heading,
  HStack,
  Button,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Pressable,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import RIcons from 'react-native-remix-icon'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NativeTokensByAddress } from '../wallet/tokens'
import { fetchBalances } from '../wallet/walletSlice'
import { getWallets } from '../wallet/walletsManager'
import { shortenAddress } from '../../blockchain/utils/addresses'
import { utils } from 'ethers'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const tokenAddrs = Object.keys(NativeTokensByAddress)
  const { isSignerSet } = useSelector((s) => s.essential)
  const walletAddress = useSelector((s) => s.wallet.walletInfo.address)
  const balances = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  const [tempBal, setTempBal] = useState({ [tokenAddrs[1]]: 0.0 })
  const shortAddr = shortenAddress(walletAddress, true)
  useEffect(() => {
    if (!balances) {
      if (isSignerSet) {
        //handleGetBalances()
        dispatch(fetchBalances())
      }
    }
  }, [isSignerSet])

  const handleGetBalances = async () => {
    try {
      const result = await celoHelper.getBalances(walletAddress, NativeTokensByAddress)
      setTempBal(result)
    } catch (e) {
      console.log(e)
    }
  }

  const handleGetWallets = async () => {
    const result = await getWallets()
    console.log(result)
  }

  const handleGetRoscaData = async () => {
    const roscaAddr = '0x96F3FC4FA0408F872833ed0AA930fED675ac81a8' //'0x536a2b859fEF47C31B7C535D57F70C40416A1ac3'
    const result = await celoHelper.smartContractCall('Rosca', {
      contractAddress: roscaAddr,
      method: 'getDetails',
      methodType: 'read',
      params: [],
    })

    console.log(utils.formatUnits(result.data[2].toString(), 18))
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1} bg="muted.50" alignItems="center">
        <Box mt="2" bg="#fff" width="95%" rounded="2xl" shadow="none">
          <HStack justifyContent="space-between">
            <Stack mx="4" my="3">
              <Text _light={{ color: 'muted.700' }}>Actual Balance (KES)</Text>
              <Heading size="xl" letterSpacing="0.5" _light={{ color: 'muted.800' }}>
                {balances ? balances[tokenAddrs[1]] * 120.75 : tempBal[tokenAddrs[1]] * 120.75}
              </Heading>
              <Text _light={{ color: 'muted.700' }} lineHeight="sm">
                ≈ {balances ? balances[tokenAddrs[1]] : tempBal[tokenAddrs[1]]} cUSD
              </Text>
            </Stack>
            <Pressable
              width="20%"
              m={4}
              onPress={() => navigation.navigate('AllTokens', { tempBal: tempBal })}
            >
              <Box bg="muted.50" borderRadius="full" p={2} width="2/3" ml="1/3" alignItems="center">
                <RIcons size={32} name="qr-code-line" color="#737373" />
              </Box>
            </Pressable>
          </HStack>
          {balances ? null : <Spinner right="1/2" top={10} position="absolute" size="lg" />}
          <HStack mx="4" mb="2.5" space="2">
            <Button
              leftIcon={<Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />}
              variant="subtle"
              rounded="3xl"
              pr="4"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => console.log('deposit')}
            >
              Deposit
            </Button>
            <Button
              leftIcon={
                <Icon as={Feather} name="arrow-right" size="md" color="primary.600" mr="1" />
              }
              variant="subtle"
              rounded="3xl"
              pr="4"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => console.log('transfer')}
            >
              Transfer
            </Button>
            <Button
              //leftIcon={<Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />}
              variant="outline"
              rounded="3xl"
              px="4"
              _text={{ color: 'primary.500', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => navigation.navigate('AllTokens', { tempBal: tempBal })}
            >
              {shortAddr}
            </Button>
          </HStack>
        </Box>

        {/*Dummy shadow effect */}
        <Box bg="#fff" height={10} rounded="2xl" width="94.5%" shadow={1} mt="-10" zIndex={-1}>
          <Text color="#fff">Find a better way</Text>
        </Box>
        {/*news update*/}
        <Box bg="#fcfcfc" width="95%" rounded="md" mt="-5" zIndex="-2">
          <HStack space="3" m="3" mt="8">
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
              rounded="md"
              width="52"
            />
            <Text maxW="70%">Get 5 cUSD with ClixCard and stand a chance to win 1 BTC</Text>
            <Icon as={Feather} name="list" size="lg" position="absolute" ml="92%" />
          </HStack>
        </Box>

        {/* Transactions */}
        {/* Nuggets */}
        {/* Saving Spaces/Vault/Earnings */}
        {/* Rewards and Offers */}

        {/*Test buttons*/}
        <Button onPress={() => handleGetRoscaData()}>Show Rosca Data</Button>
      </Box>
    </ScrollView>
  )
}
