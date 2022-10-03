import { Box, VStack, Button, Heading, Spacer } from 'native-base'

export default function WelcomeScreen({ navigation }) {
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="flex-end">
      <Box width="75%" mt="3/4">
        <Heading textAlign="center" color="blueGray.700">
          Step into the future of money with Clixpesa
        </Heading>
      </Box>
      <Spacer />
      <VStack alignItems="center" space={3} mb="10">
        <Button
          rounded="3xl"
          pr="4"
          minW="75%"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate('getUserDetails')}
        >
          Create New Account
        </Button>
        <Button
          variant="subtle"
          rounded="3xl"
          pr="4"
          minW="75%"
          _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate('importAccount')}
        >
          Use Existing Account
        </Button>
      </VStack>
    </Box>
  )
}
