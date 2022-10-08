import { Box, VStack, Spinner, Text } from 'native-base'
import { useState } from 'react'

import CodeInput from 'clixpesa/components/CodeInput'
import { DEPRECATED_PIN_BLOCKLIST } from 'clixpesa/app/constants'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../essentialSlice'
import { saltyPasscode } from 'clixpesa/utils/encryption'
import { createWallet, importWallet } from 'clixpesa/features/wallet/walletSlice'
import { pendingWallet } from '../../wallet/pendingWallet'

export default function SetPasscodeScreen({ navigation }) {
  const dispatch = useDispatch()
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleOnSucess = (code) => {
    const token = saltyPasscode(code)
    console.log('Pincode Set!')
    dispatch(setUserToken(token))
    if (pendingWallet) {
      dispatch(importWallet(code))
    } else {
      dispatch(createWallet(code))
    }
  }

  const onFullCode1 = (code) => {
    if (isPinValid(code)) {
      setIsVerifying(true)
      console.log('Pin is Valid')
    } else {
      console.log('Pin is Invalid')
      setCode1('')
    }
  }
  const onFullCode2 = (code) => {
    if (code1 === code) {
      console.log('Pin session is done')
      handleOnSucess(code)
      setCode1('')
      setCode2('')
      setIsLoading(true)
      setIsVerifying(false)
    } else {
      console.log('Pin does not match')
      setCode2('')
    }
  }

  return (
    <Box flex={1} bg="muted.50" justifyContent="center">
      {isLoading ? (
        <VStack mx="20" space={3} alignItems="center">
          <Spinner size="lg" />
          <Text fontSize="md">Loading Account...</Text>
        </VStack>
      ) : (
        <>
          {isVerifying ? (
            <Box>
              <Box mx="10">
                <Text fontSize="md" mb="3">
                  Re-enter the passcode
                </Text>
                <Text mb="3">Please input the passcode again to confirm.</Text>
                <CodeInput
                  value={code2}
                  autoFocus={true}
                  password={true}
                  onTextChange={(code) => setCode2(code)}
                  onFulfill={(code) => onFullCode2(code)}
                />
              </Box>

              <Text fontSize="xs" mx="10" mt="5">
                You will use this passcode to authorize transactions and sign into your account.
                Please keep it safe.
              </Text>
            </Box>
          ) : (
            <Box>
              <Box mx="10">
                <Text fontSize="md" mb="3">
                  Set a passcode
                </Text>
                <Text mb="3">
                  You will use this passcode to authorize transactions and sign into you account.
                  Please keep it safe.
                </Text>
                <CodeInput
                  value={code1}
                  password={true}
                  autoFocus={true}
                  onTextChange={(code) => setCode1(code)}
                  onFulfill={(code) => onFullCode1(code)}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

function isPinValid(pin) {
  return /^\d{6}$/.test(pin) && !DEPRECATED_PIN_BLOCKLIST.includes(pin)
}
