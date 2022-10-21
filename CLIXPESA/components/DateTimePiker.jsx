import { Actionsheet, Box, Text, Button } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker'

const DateTimePiker = (props) => {
  return (
    <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
      <Actionsheet.Content>
        <Box alignSelf="flex-start" ml={3}>
          <Text fontSize="md" fontWeight="medium">
            Select a date
          </Text>
          <Text fontSize="md" color="muted.500"></Text>
        </Box>
        <Box maxH={120} w="2/3" my={2}>
          {props.isOpen && (
            <DateTimePicker
              value={props.date}
              mode="date"
              onChange={props.onChange}
              onTouchCancel={props.onClose}
            />
          )}
        </Box>
        <Button
          variant="subtle"
          rounded="3xl"
          w="60%"
          my={3}
          _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => {}}
          onPressOut={props.onClose}
        >
          Set
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default DateTimePiker
