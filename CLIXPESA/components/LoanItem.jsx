import { Avatar, HStack, Text, VStack, Heading, Button, Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const LoanItem = (props) => {
  const navigation = useNavigation()
  const title = props.itemTitle.split(' ')
  const initials =
    title.length > 1
      ? title[0].slice(0, 1) + title[1].slice(0, 1)
      : title[0].slice(0, 2).toUpperCase()
  const fees = 0.0
  const apprxAmt = (props.principal * 120.75).toFixed(2)
  const repayment = (props.principal * ((100 + props.interest) / 100)).toFixed(2)
  const minDuration = (props.duration.min / 7).toFixed(0)
  const maxDuration = (props.duration.max / 7).toFixed(0)
  const minAmount = props.isOffer ? (props.limit.min * 120.75).toFixed(2) : 0.0
  const maxAmount = props.isOffer ? (props.limit.max * 120.75).toFixed(2) : 0.0
  const minAPR = (
    ((props.interest + fees / (props.isOffer ? props.limit.max : props.principal)) /
      props.duration.max) *
    365
  ).toFixed(0)

  return (
    <Pressable onPress={() => navigation.navigate(props.screen)}>
      <HStack alignItems="flex-start" justifyContent="space-between" my={3} mx={4}>
        <HStack alignItems="center" space={2}>
          <Avatar size="sm">{initials}</Avatar>
          <VStack>
            <Text fontWeight="semibold" color="blueGray.800">
              {props.itemTitle}
            </Text>
            <Text fontSize="sm" lineHeight="xs" color="muted.500">
              {props.type}
            </Text>
          </VStack>
        </HStack>
        <VStack>
          <HStack alignItems="flex-end" justifyContent="flex-end">
            <Heading size="md">{props.principal}</Heading>
            <Text fontWeight="medium" mb={0.5} ml={1}>
              cUSD
            </Text>
          </HStack>
          <Text textAlign="right" color="muted.700">
            apprx: {apprxAmt} KES
          </Text>
          <Text textAlign="right" color="muted.700">
            {(props.isOffer ? 'repay: ' : 'receive: ') + repayment} cUSD
          </Text>
          <Button
            maxW="80%"
            variant="subtle"
            rounded="3xl"
            size="sm"
            mt={2}
            ml="20%"
            _text={{ fontWeight: 'medium', mb: '0.5' }}
          >
            {props.isOffer ? 'Borrow' : 'Lend'}
          </Button>
        </VStack>
      </HStack>
      <VStack position="absolute" bottom={3} left={4}>
        <Text color="muted.700">
          {props.interest + '% Interest (' + minAPR + '% ' + (props.isOffer ? 'APR' : 'APY') + ')'}
        </Text>
        <Text color="muted.700">{'Duration: ' + minDuration + ' - ' + maxDuration + ' weeks'}</Text>
        <Text color="muted.700">
          {props.isOffer
            ? 'Limit: ' + minAmount + ' - ' + maxAmount + ' KES'
            : 'Score: ' + props.creditScore.value + ' (' + props.creditScore.status + ')'}
        </Text>
      </VStack>
    </Pressable>
  )
}

export default LoanItem
