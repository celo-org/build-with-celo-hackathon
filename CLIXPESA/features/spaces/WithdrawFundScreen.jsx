import { Box, Text, VStack, Spacer, Button, Stack, HStack, Input } from 'native-base'
import { useNavigation } from '@react-navigation/native'

export default function WithdrawFundScreen() {
  const navigation = useNavigation()
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3}>
        <Text mx={6} mt={8}>
          Withdraw to default account (cUSD)
        </Text>
        <Stack mx={2} space={1}>
          <Box bg="white" roundedTop="xl" roundedBottom="md">
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
              />
            </HStack>
          </Box>
          <HStack bg="white" py={3} px={4} justifyContent="space-between" rounded="md">
            <Text fontSize="md">Balance: c200</Text>
            <Text fontSize="md" fontWeight="medium" color="white" lineHeight="xs">
              Balance (cUSD)
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="white">
              500.00
            </Text>
          </HStack>
          <HStack bg="white" py={3} px={4} justifyContent="space-between" rounded="md">
            <Button
              variant="subtle"
              rounded="md"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            >
              25%
            </Button>
            <Button
              variant="subtle"
              rounded="md"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            >
              50%
            </Button>
            <Button
              variant="subtle"
              rounded="md"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            >
              75%
            </Button>
            <Button
              variant="subtle"
              rounded="md"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            >
              100%
            </Button>
          </HStack>
        </Stack>
        <Spacer />
        <Stack alignItems="center" space={3} mb={20}>
          <Button
            variant="subtle"
            rounded="3xl"
            w="60%"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              navigation.navigate('PersonalHome')
            }}
          >
            Confirm
          </Button>
        </Stack>
      </VStack>
    </Box>
  )
}
