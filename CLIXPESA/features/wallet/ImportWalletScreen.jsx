import { useEffect, useState } from 'react'
import { Box, Text, VStack, Button, Spacer, FormControl, Input } from 'native-base'
import { isValidMnemonic } from 'clixpesa/blockchain/utils/mnemonic'
import { setPendingWallet } from './pendingWallet'

export default function ImportWalletScreen({ navigation }) {
  const [phrase, setPhrase] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (text) => {
    setPhrase(text)
  }

  const handleSubmit = (values) => {
    //const validationResults = validateForm(values)
    if (validateForm(values)) {
      //TODO: handle import when user already has another account
      setIsLoading(true)
    }
  }

  useEffect(() => {
    //set a pending account
    const handlePendingWallet = async () => {
      await setPendingWallet(phrase)
    }
    if (isLoading) {
      handlePendingWallet()
      navigation.navigate('getUserDetails')
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <FormControl>
        <VStack alignItems="center" space={3} mt="10" mb="6">
          <Text maxW="70%" textAlign="center" fontWeight="medium">
            Enter your recovery (seed) phrase.
          </Text>
          <Text mt="-3">Only import on devices you trust.</Text>
          {/*TODO: Add phrase validation*/}
          <Input
            h="32"
            w="75%"
            isDisabled={isLoading}
            placeholder="apple mango passion ..."
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            autoFocus={true}
            fontSize="md"
            type="submit"
            value={phrase.toLowerCase()}
            onChangeText={handleChange}
          />
          <Text maxW="75%">
            Your recovery pharce is a 24-word phrase that you wrote down and saved when you setup
            your account. Please enter it here to restore your account.
          </Text>
        </VStack>
        <Spacer />
        <VStack alignItems="center" space={3} mb="10">
          <Button
            variant={isLoading ? 'subtle' : null}
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{
              color: isLoading ? 'primary.600' : 'primary.100',
              fontWeight: 'semibold',
              mb: '0.5',
            }}
            onPress={() => handleSubmit({ phrase })}
            isLoading={isLoading}
            spinnerPlacement="end"
            isLoadingText="Importing Account"
          >
            Import Account
          </Button>
          {/* navigation handle for when canceling while already setup (Welcome/Wallet)*/}
          <Button
            variant="subtle"
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate('Welcome')}
          >
            Cancel
          </Button>
        </VStack>
      </FormControl>
    </Box>
  )
}

function validateForm(values) {
  if (!isValidMnemonic(values.phrase)) {
    return console.warn('Invalid recovery phrase')
  }

  return { isValid: true }
}
