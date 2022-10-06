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
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import celoHelper from '../../blockchain/helpers/celoHelper'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NativeTokensByAddress } from '../wallet/tokens'
import { fetchBalances } from '../wallet/walletSlice'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const tokenAddrs = Object.keys(NativeTokensByAddress)
  const isLoading = useSelector((s) => s.essential.status.isLoading)
  const balances = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  const [tempBal, setTempBal] = useState({})
  const [address, setAddress] = useState('0x8E912eE99bfaECAe8364Ba6604612FfDfE46afd2')

  useEffect(() => {
    //dispatch(setCeloSigner(wallet.privateKey))
    if (!balances) {
      console.log('No balances yet')
      handleGetBalances()
      dispatch(fetchBalances())
    }
  }, [])

  const handleGetBalances = async () => {
    try {
      const result = await celoHelper.getBalances(address, NativeTokensByAddress)
      setTempBal(result)
    } catch (e) {
      console.log(e)
    }
  }

  console.log(tokenAddrs[1] + ':' + balances[tokenAddrs[1]])
  console.log('Local' + tempBal)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1} bg="#F5F5F5" alignItems="center">
        <Box mt="2" bg="#fff" width="95%" rounded="2xl" shadow="none">
          <Stack mx="4" my="3">
            <Text _light={{ color: 'muted.700' }}>Actual Balance (KES)</Text>
            <Heading size="xl" letterSpacing="0.5" _light={{ color: 'muted.800' }}>
              {balances ? balances[tokenAddrs[1]] * 120.75 : tempBal[tokenAddrs[1]] * 120.75}
            </Heading>
            <Text _light={{ color: 'muted.700' }} lineHeight="sm">
              ≈ {balances ? balances[tokenAddrs[1]] : tempBal[tokenAddrs[1]]} cUSD
            </Text>
          </Stack>
          <HStack mx="4" mb="2.5" space="3">
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
              leftIcon={<Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />}
              variant="subtle"
              rounded="3xl"
              px="5"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => console.log('more')}
            />
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
      </Box>
    </ScrollView>
  )
}
