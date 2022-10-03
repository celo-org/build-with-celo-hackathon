import { Box, Text, VStack, Avatar } from 'native-base'
import { View } from 'react-native'
import CodeInput from 'clixpesa/components/CodeInput'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setLoggedIn } from './essentialSlice'
import { saltyPasscode } from 'clixpesa/utils/encryption'

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()
  const { names, initials, userToken } = useSelector((s) => s.essential.userDetails)
  const firstName = names.split(' ')[0]
  const [code, setCode] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleFullFill = (code) => {
    const token = saltyPasscode(code)
    if (token === userToken) {
      setIsValid(true)
      dispatch(setLoggedIn(true))
    } else {
      console.log('LoggedIn Failed')
      setIsValid(false)
      setCode('')
    }
  }

  return (
    <Box flex={1} bg="#fff" justifyContent="center">
      <VStack alignItems="center" space={3} mb={5}>
        <Avatar bgColor="primary.600" size="lg">
          {initials}
        </Avatar>
        <Text fontSize="md" mb="3">
          Welcome back, {firstName}
        </Text>
        <CodeInput
          placeholder={
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 25,
                backgroundColor: '#99F6E4',
              }}
            ></View>
          }
          mask={
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 25,
                backgroundColor: '#0D9488',
              }}
            ></View>
          }
          maskDelay={300}
          password={true}
          autoFocus={true}
          cellStyle={null}
          cellStyleFocused={null}
          value={code}
          onTextChange={(code) => setCode(code)}
          onFulfill={(code) => handleFullFill(code)}
        />
        {isValid ? null : <Text>Forgot passcode? See how to reset here!</Text>}
      </VStack>
    </Box>
  )
}
