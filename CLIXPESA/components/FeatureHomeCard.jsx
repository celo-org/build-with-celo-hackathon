import { Box, Text, HStack, Stack, Pressable, Button, Heading, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const FeatureHomeCard = (props) => {
  const navigation = useNavigation()
  const bal = props.balance.split('.')
  return (
    <Box mt="2" bg="white" roundedTop="2xl" roundedBottom={props.itemBottom ? 'md' : '2xl'}>
      <HStack justifyContent="space-between">
        <Stack mx="4" my="3">
          <Text _light={{ color: 'muted.700' }}>Total Balance (cUSD)</Text>
          <HStack alignItems="center">
            <Heading size="xl" letterSpacing="0.5" _light={{ color: 'muted.800' }}>
              {bal[0] + '.'}
            </Heading>
            <Heading size="lg" letterSpacing="0.5" mt={1} _light={{ color: 'muted.800' }}>
              {bal[1]}
            </Heading>
            <Icon as={Feather} name="chevron-down" size="lg" color="muted.800" ml={2} />
          </HStack>

          <Text _light={{ color: 'muted.700' }} lineHeight="sm">
            ≈ {props.apprxBalance} KES
          </Text>
        </Stack>
        <Pressable width="20%" m={4} onPress={() => navigation.navigate(props.expScreen)}>
          <Box
            bg="muted.50"
            borderRadius="full"
            p={2}
            width="2/3"
            ml="1/3"
            alignItems="center"
          ></Box>
        </Pressable>
      </HStack>
      {props.balance ? null : <Spinner right="1/2" top={10} position="absolute" size="lg" />}
      <HStack mx="4" mb="2.5" space="2">
        <Button
          leftIcon={props.btn1.icon}
          variant="subtle"
          rounded="3xl"
          pr="4"
          _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate(props.btn1.screen, props.btn1.screenParams)}
        >
          {props.btn1.name}
        </Button>
        <Button
          leftIcon={props.btn2.icon}
          variant="subtle"
          rounded="3xl"
          pr="4"
          _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate(props.btn2.screen)}
        >
          {props.btn2.name}
        </Button>
        <Button
          leftIcon={<Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />}
          variant="subtle"
          rounded="3xl"
          px="4"
          _text={{ color: 'primary.500', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => console.log('More')}
        />
      </HStack>
    </Box>
  )
}

export default FeatureHomeCard
