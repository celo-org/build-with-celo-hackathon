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
import { fetchLoans } from './loansSlice'

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
      method: loanParams.initiated ? 'fundLoan' : 'RepayLoan',
      methodType: 'write',
      params: [value],
    })
    handleTxResponce(txReceipt)
  }

  const handleTxResponce = (txReceipt) => {
    setIsLoading(false)
    const thisLog = txReceipt.logs.find((el) => el.address === loanParams.address)
    const results = P2PLoanIface.parseLog({ data: thisLog.data, topics: thisLog.topics })
    if (amount === utils.formatUnits(results.args[2], 'ether')) {
      onOpen()
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
                onClose(), dispatch(fetchLoans()), navigation.goBack()
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
            handleTxResponce(txRcpt)
          }}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  )
}

const txRcpt = {
  blockHash: '0xbdacc5ee3659d59928655f1d07a441b98ad8e055e6f4a119af1cbce73facc034',
  blockNumber: 14339069,
  byzantium: true,
  confirmations: 1,
  contractAddress: null,
  cumulativeGasUsed: {
    hex: '0x024110',
    type: 'BigNumber',
  },
  effectiveGasPrice: {
    hex: '0x05f5e100',
    type: 'BigNumber',
  },
  from: '0x8E912eE99bfaECAe8364Ba6604612FfDfE46afd2',
  gasUsed: {
    hex: '0x024110',
    type: 'BigNumber',
  },
  logs: [
    {
      address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      blockHash: '0xbdacc5ee3659d59928655f1d07a441b98ad8e055e6f4a119af1cbce73facc034',
      blockNumber: 14339069,
      data: '0x00000000000000000000000000000000000000000000000006f05b59d3b20000',
      logIndex: 0,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000008e912ee99bfaecae8364ba6604612ffdfe46afd2',
        '0x00000000000000000000000061979179b0efcad139bf6acaa32ba7af50e41ba1',
      ],
      transactionHash: '0x7937c6ca8cc75b6b010f92a8a3545519e7ca80e490de8a21b6e005b5d5121cac',
      transactionIndex: 0,
    },
    {
      address: '0x53981a3A8DF0143a696b953856CDEf4610ac01be',
      blockHash: '0xbdacc5ee3659d59928655f1d07a441b98ad8e055e6f4a119af1cbce73facc034',
      blockNumber: 14339069,
      data: '0x00000000000000000000000000000000000000000000000000000000635d4d6500000000000000000000000061979179b0efcad139bf6acaa32ba7af50e41ba100000000000000000000000000000000000000000000000006f05b59d3b20000',
      logIndex: 1,
      topics: ['0xbd7ef6c6281278f6c8ac4ae9ef2f205b52425813c288dd47c377cb6b59c5076e'],
      transactionHash: '0x7937c6ca8cc75b6b010f92a8a3545519e7ca80e490de8a21b6e005b5d5121cac',
      transactionIndex: 0,
    },
    {
      address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      blockHash: '0xbdacc5ee3659d59928655f1d07a441b98ad8e055e6f4a119af1cbce73facc034',
      blockNumber: 14339069,
      data: '0x0000000000000000000000000000000000000000000000000000099bdade9c40',
      logIndex: 2,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000008e912ee99bfaecae8364ba6604612ffdfe46afd2',
        '0x000000000000000000000000aa963fc97281d9632d96700ab62a4d1340f9a28a',
      ],
      transactionHash: '0x7937c6ca8cc75b6b010f92a8a3545519e7ca80e490de8a21b6e005b5d5121cac',
      transactionIndex: 0,
    },
    {
      address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      blockHash: '0xbdacc5ee3659d59928655f1d07a441b98ad8e055e6f4a119af1cbce73facc034',
      blockNumber: 14339069,
      data: '0x000000000000000000000000000000000000000000000000000003d3b4a073c0',
      logIndex: 3,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000008e912ee99bfaecae8364ba6604612ffdfe46afd2',
        '0x0000000000000000000000001443326496c9775c50adc6e8a26ccb79ad4d00ff',
      ],
      transactionHash: '0x7937c6ca8cc75b6b010f92a8a3545519e7ca80e490de8a21b6e005b5d5121cac',
      transactionIndex: 0,
    },
  ],
  logsBloom:
    '0x00000000000020000001000000000400000000000000000000000000000000004000000000004000000000000000000000000000100000000000000000020000000000000000000002000008000000000000000000000000000008008000000000000000000000000000000000400000000000000000000000000012000000000000000800000000000001000000000000400000000000000008000400000000000000000000080000000000000000000000000000000010000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000200000000000000',
  status: 1,
  to: '0x53981a3A8DF0143a696b953856CDEf4610ac01be',
  transactionHash: '0x7937c6ca8cc75b6b010f92a8a3545519e7ca80e490de8a21b6e005b5d5121cac',
  transactionIndex: 0,
  type: 0,
}
