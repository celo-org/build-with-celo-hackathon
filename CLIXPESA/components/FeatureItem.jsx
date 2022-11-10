import { Box, Text, HStack, VStack, Pressable, Avatar } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const FeatureItem = (props) => {
  const navigation = useNavigation()
  const title = props.itemTitle.split(' ')
  const initials =
    title.length > 1
      ? title[0].slice(0, 1) + title[1].slice(0, 1)
      : title[0].slice(0, 2).toUpperCase()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(props.screen, props.itemParams ? props.itemParams : {})
      }}
    >
      <HStack space={3} my={2} mx={3} alignItems="center">
        <Avatar
          bg={props.initiated ? 'primary.100' : 'primary.500'}
          _text={{ color: props.initiated ? 'primary.600' : 'primary.100' }}
        >
          {initials}
        </Avatar>
        <Box flexDirection="row" justifyContent="space-between" width="84%" mt="-0.5">
          <VStack>
            <Text fontWeight="semibold" color="blueGray.800">
              {props.itemTitle}
            </Text>
            <Text>{props.payProgress}</Text>
          </VStack>
          <VStack mr={2}>
            <Text fontWeight="semibold" color="blueGray.800" textAlign="right">
              {props.value}
            </Text>
            <Text color="blueGray.800" textAlign="right">
              {props.dueDate}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Pressable>
  )
}

export default FeatureItem
