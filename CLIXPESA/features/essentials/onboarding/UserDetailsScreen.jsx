import { useState } from 'react'
import {
  Box,
  Text,
  FormControl,
  Input,
  WarningOutlineIcon,
  CheckIcon,
  Stack,
  Select,
  VStack,
  Checkbox,
  Spacer,
  Button,
} from 'native-base'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../essentialSlice'

export default function UserDetailsScreen({ navigation }) {
  const dispatch = useDispatch()
  const [isInvalid, setIsInvalid] = useState({ invalidName: false, invalidNo: false })
  const [isChecked, setIsChecked] = useState(false)
  const [userNames, setUserNames] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const phoneNumber = countryCode + phoneNo

  const handleSubmit = () => {
    if (!isInvalid.invalidName && !isInvalid.invalidNo && isChecked) {
      dispatch(setUserDetails({ userNames, phoneNumber }))
      navigation.navigate('verifyPhoneNo')
    }
  }

  const validateNames = () => {
    if (!userNames) {
      setIsInvalid({ ...isInvalid, invalidName: true })
    } else {
      const name = userNames.split(' ')
      if (name.length < 2) {
        setIsInvalid({ ...isInvalid, invalidName: true })
      } else {
        setIsInvalid({ ...isInvalid, invalidName: false })
      }
    }
  }
  const validateNo = () => {
    if (!phoneNumber) {
      setIsInvalid({ ...isInvalid, invalidNo: true })
    } else {
      //TODO: phonenumber validation
      if (phoneNumber.length !== 13) {
        setIsInvalid({ ...isInvalid, invalidNo: true })
      } else {
        setIsInvalid({ ...isInvalid, invalidNo: false })
      }
    }
  }

  return (
    <Box flex={1} bg="muted.50" alignItems="center">
      <FormControl mt={10}>
        <VStack mx={8} space={4}>
          <Stack>
            <FormControl.Label color="muted.600">Please enter your two names</FormControl.Label>
            <Input
              placeholder="Firstname Lastname"
              size="md"
              fontSize="md"
              spellCheck={false}
              value={userNames}
              onChangeText={(text) => setUserNames(text)}
              onEndEditing={() => validateNames()}
            />
            <FormControl.ErrorMessage
              isInvalid={isInvalid.invalidName}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Something is wrong. Enter two names
            </FormControl.ErrorMessage>
          </Stack>
          <Stack>
            <FormControl.Label color="muted.600">
              Select country and enter phonenumber
            </FormControl.Label>
            <Select
              accessibilityLabel="Choose Country"
              placeholder="Country"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="xs" />,
              }}
              mb={2}
              size="md"
              onValueChange={(value) => setCountryCode(value)}
            >
              <Select.Item label="Kenya" value="+254" />
              <Select.Item label="Uganda" value="+256" />
              <Select.Item label="Tanzania" value="+255" />
            </Select>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please make a selection!
            </FormControl.ErrorMessage>
            <Input
              InputLeftElement={
                <Text ml={3} mb={0.5} fontSize="md">
                  {countryCode ? countryCode : '+123'}
                </Text>
              }
              placeholder="712345678"
              size="md"
              fontSize="md"
              keyboardType="numeric"
              spellCheck={false}
              value={phoneNo}
              isDisabled={countryCode ? false : true}
              onChangeText={(text) => setPhoneNo(text)}
              onEndEditing={() => validateNo()}
            />
            <FormControl.ErrorMessage
              isInvalid={isInvalid.invalidNo}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Something is wrong.
            </FormControl.ErrorMessage>
            <FormControl.HelperText color="muted.500">
              Depending on your mobile network and country, standard rates and taxes may apply.
            </FormControl.HelperText>
          </Stack>
          <Checkbox
            isChecked={isChecked}
            colorScheme="teal"
            size="md"
            maxW="85%"
            onChange={() => setIsChecked(!isChecked)}
          >
            <Text color="muted.600">
              I have read and agreed with Clixpesa terms and privacy policy
            </Text>
          </Checkbox>
        </VStack>
      </FormControl>
      <Spacer />
      <Button
        variant={isChecked ? 'solid' : 'subtle'}
        rounded="3xl"
        pr="4"
        minW="75%"
        isDisabled={isChecked ? false : true}
        my="10"
        _text={{
          color: isChecked ? 'primary.100' : 'primary.600',
          fontWeight: 'semibold',
          mb: '0.5',
        }}
        onPress={() => handleSubmit()}
      >
        Verify phone number
      </Button>
    </Box>
  )
}
