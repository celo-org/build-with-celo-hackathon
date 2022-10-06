import { HStack, Text, Spacer, Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native'

function SectionHeader(props) {
  const navigation = useNavigation()
  return (
    <HStack mx="3" my="2">
      <Text fontWeight="medium" color="blueGray.600">
        {props.title}
      </Text>
      <Spacer />
      <Pressable onPress={() => navigation.navigate(props.screen)}>
        <Text _light={{ color: 'primary.600' }}>{props.link}</Text>
      </Pressable>
    </HStack>
  )
}

export default SectionHeader
