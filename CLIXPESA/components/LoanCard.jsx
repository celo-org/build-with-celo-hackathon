import { VStack, HStack, Avatar, Text, Stack, Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const LoanCard = (props) => {
  const navigation = useNavigation()
  const title = props.loanTitle.split(' ')
  const initials =
    title.length > 1
      ? title[0].slice(0, 1) + title[1].slice(0, 1)
      : title[0].slice(0, 2).toUpperCase()
  return (
    <Pressable
      bg="white"
      width="46%"
      p={4}
      borderRadius="2xl"
      m={1}
      onPress={() =>
        navigation.navigate(props.screenOptions.screen, {
          loanParams: props.screenOptions.params,
        })
      }
    >
      <VStack space="12">
        <HStack alignItems="center" space={2}>
          <Avatar size="sm">{initials}</Avatar>
          <VStack>
            <Text fontWeight="semibold" color="blueGray.800">
              {props.loanTitle}
            </Text>
            <Text fontSize="sm" lineHeight="xs" color="muted.500">
              {props.type}
            </Text>
          </VStack>
        </HStack>
        <Stack>
          <Text fontSize="md" fontWeight="medium">
            {props.principal} cUSD
          </Text>
          <Text color="muted.500">
            Paid: {props.repaid}/{props.principal}
          </Text>
          <Text fontWeight="medium">Due: {props.dueDate}</Text>
        </Stack>
      </VStack>
    </Pressable>
  )
}

export default LoanCard
