import {
  Box,
  Text,
  VStack,
  Stack,
  HStack,
  Input,
  Spacer,
  Button,
  Modal,
  useDisclose,
  Icon,
} from 'native-base'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { NativeTokensByAddress } from '../wallet/tokens'
import celoHelper from 'clixpesa/blockchain/helpers/celoHelper'
import { utils } from 'ethers'
import { P2PLoanIface } from 'clixpesa/blockchain/contracts'
import { fetchLoans, updateLoans } from './loansSlice'
import { areAddressesEqual } from '../../blockchain/utils/addresses'

export default function FundLoanScreen({ navigation, route }) {
  const loanParams = route.params
  const dispatch = useDispatch()
  const balances = useSelector((s) => s.wallet.walletBalances.tokenAddrToValue)
  const tokenAddrs = Object.keys(NativeTokensByAddress)
  const { isOpen, onOpen, onClose } = useDisclose()
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTransfer = async () => {
    setIsLoading(true)
    const value = utils.parseEther(amount).toString()
    const txReceipt = await celoHelper.smartContractCall('P2PLoan', {
      approvalContract: 'StableToken',
      contractAddress: loanParams.address,
      method: loanParams.lender ? 'FundLoan' : 'RepayLoan',
      methodType: 'write',
      params: [value],
    })
    handleTxResponce(txReceipt)
  }

  const handleTxResponce = (txReceipt) => {
    setIsLoading(false)
    const thisLog = txReceipt.logs.find((el) => areAddressesEqual(el.address, loanParams.address))
    const results = P2PLoanIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    if (utils.parseEther(amount).toString() === results.args[2].toString()) {
      onOpen()
    }
  }

  const handleLoanUpdate = () => {
    if (loanParams.initiated) {
      dispatch(fetchLoans())
    } else {
      dispatch(updateLoans())
    }
  }

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3} width="95%">
        <Stack mx={6} mt={8}>
          <Text>Set an amount you wish to pay</Text>
          <Text fontSize="md">Pay a max of: {(loanParams.balance * 1).toFixed(4)} cUSD</Text>
        </Stack>
        <Stack bg="white" rounded="2xl">
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
              onChangeText={(amount) => setAmount(amount)}
            />
          </HStack>
          <Text px={5} mb={3}>
            Account Balance: {(balances[tokenAddrs[1]] * 1.0).toFixed(2)} cUSD
          </Text>
        </Stack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide">
        <Modal.Content width="65%" maxWidth="400px">
          <Modal.Body alignItems="center">
            <Icon as={Ionicons} name="md-checkmark-circle" size="6xl" color="success.600" />
            <Text textAlign="center" mt={3}>
              Loan has been funded successfully!
            </Text>
            <Text textAlign="center" fontWeight="medium" mt={2}>
              + {(amount * 1).toFixed(2)} cUSD
            </Text>
            <Button
              variant="subtle"
              rounded="3xl"
              w="60%"
              mt={3}
              _text={{ color: 'primary.600', fontWeight: 'semibold' }}
              onPress={() => {
                onClose(), navigation.goBack()
              }}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Spacer />
      <Stack alignItems="center" mb={8} width="95%">
        <Button
          isLoading={isLoading}
          isLoadingText="Sending..."
          rounded="3xl"
          w="60%"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => {
            handleTransfer()
          }}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  )
}
