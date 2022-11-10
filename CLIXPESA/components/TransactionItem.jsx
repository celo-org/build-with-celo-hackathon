import { Box, Text, HStack, VStack, Pressable, Avatar } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const TransactionItem = (props) => {
  const navigation = useNavigation()
  const title = props.trTitle.split(' ')
  const initials =
    title.length > 1
      ? title[0].slice(0, 1) + title[1].slice(0, 1).toUpperCase()
      : title[0].slice(0, 2).toUpperCase()
  return (
    <Pressable onPress={() => navigation.navigate(props.screen)}>
      <HStack space={3} my={2} mx={3} alignItems="center">
        <Avatar
          bg={props.credited ? 'primary.500' : 'primary.100'}
          _text={{ color: props.credited ? 'primary.100' : 'primary.600' }}
        >
          {initials}
        </Avatar>
        <Box flexDirection="row" justifyContent="space-between" width="84%" mt="-0.5">
          <VStack>
            <Text fontWeight="semibold" color="blueGray.800">
              {props.trTitle}
            </Text>
            <Text>{props.trDate}</Text>
          </VStack>
          <VStack mr={2}>
            <Text fontWeight="semibold" color="blueGray.800" textAlign="right">
              {props.spAmount}
            </Text>
            <Text color="blueGray.800" textAlign="right">
              {props.eqAmount}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Pressable>
  )
}

export default TransactionItem
