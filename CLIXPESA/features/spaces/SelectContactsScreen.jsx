import React, { useEffect, useState } from 'react'
import { Box, HStack, Text, Avatar, VStack, FlatList, Button } from 'native-base'
import { useDispatch } from 'react-redux'
import * as Contacts from 'expo-contacts'
import { TouchableOpacity } from 'react-native'
import { setSelectedMembers } from './spacesSlice'

//TODO! Maintain unique selctions
//TODO! Handle submissions.

export default function SelectContactsScreen({ navigation }) {
  const dispatch = useDispatch()
  const [selectedContacts, setSelectedContacts] = useState([])
  const [contactList, setContactList] = useState()
  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          Fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        })
        if (data.length > 0) {
          setContactList(data)
        } else {
          console.log('No Contacts')
        }
      }
    })()
  }, [])

  const handleSelected = (selected) => {
    const selectedInfo = {
      id: selected.lookupKey,
      name: selected.name,
      phoneNo: selected.phoneNumbers
        ? getContactData(selected.phoneNumbers, 'number')[0]
        : 'No Number',
    }
    const selectedList = [...selectedContacts, selectedInfo]
    setSelectedContacts(selectedList)
  }

  const handleDeselect = (deselected) => {
    const filtredList = selectedContacts.filter((el) => el.id !== deselected.id)
    setSelectedContacts(filtredList)
  }

  return (
    <Box flex={1} bg="muted.50" alignItems="flex-start">
      <VStack width="full">
        {selectedContacts.length > 0 ? (
          <HStack space={3} p={2} borderBottomWidth="1" borderColor="muted.200">
            {selectedContacts.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleDeselect(item)
                  }}
                >
                  <SelectedContact nameInitials={item.name[0].toUpperCase()} fullName={item.name} />
                </TouchableOpacity>
              )
            })}
          </HStack>
        ) : (
          <Box alignItems="center" m={3} ml={8} w="60%">
            <Text>Please select some members to add to your space</Text>
          </Box>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contactList}
          keyExtractor={(item) => item.lookupKey}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handleSelected(item)
              }}
            >
              <ContactItem
                nameInitials={item.name[0].toUpperCase()}
                fullName={item.name}
                phoneNo={
                  item.phoneNumbers ? getContactData(item.phoneNumbers, 'number')[0] : 'No Number'
                }
              />
            </TouchableOpacity>
          )}
        />
      </VStack>
      <Button
        position="absolute"
        variant="subtle"
        bottom={6}
        left="20%"
        rounded="3xl"
        w="60%"
        _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
        onPress={() => {
          dispatch(setSelectedMembers(selectedContacts))
          navigation.navigate('customizeGroup')
        }}
      >
        Next
      </Button>
    </Box>
  )
}

function ContactItem(props) {
  return (
    <HStack w="75%" space={3} ml={8} my={1.5}>
      <Avatar>{props.nameInitials}</Avatar>
      <VStack>
        <Text>{props.fullName}</Text>
        <Text>{props.phoneNo}</Text>
      </VStack>
    </HStack>
  )
}

function SelectedContact(props) {
  return (
    <VStack alignItems="center">
      <Avatar>{props.nameInitials}</Avatar>
      <Text fontSize="xs">{props.fullName}</Text>
    </VStack>
  )
}

const getContactData = (data, property) => {
  if (data) {
    return data.map((data, index) => {
      return data[property]
    })
  }
}
