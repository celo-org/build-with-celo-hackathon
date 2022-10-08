import {
  Box,
  Text,
  HStack,
  VStack,
  Avatar,
  Button,
  Icon,
  Image,
  AspectRatio,
  SectionList,
  Pressable,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import Remixicon from 'react-native-remix-icon' //Fix/Add types
import { useNavigation } from '@react-navigation/native'

import { SectionHeader } from 'clixpesa/components'
import { useSelector, useDispatch } from 'react-redux'

import { USER_STORE, WALLETS_STORE } from 'clixpesa/app/constants'
import { deleteAccount } from 'clixpesa/app/storage'
import { resetUserDetails } from '../essentials/essentialSlice'

export default function AccountScreen() {
  const userDetails = useSelector((s) => s.essential.userDetails)
  const dispatch = useDispatch()
  const USER = {
    fullName: userDetails.names,
    nameInitials: userDetails.initials,
    userName: '@dekanki',
    countryCode: userDetails.phoneNo.slice(0, 4),
    phoneNo: userDetails.phoneNo.slice(4, 13),
    accountClass: 'Standard',
    rewardAmt: '800',
  }
  const LINKS = [
    {
      sectionTitle: 'General',
      data: [
        {
          id: '001',
          iconName: 'arrow-left-right-line',
          title: 'Transactions',
          screen: 'DummyModal',
        },
        {
          id: '002',
          iconName: 'bubble-chart-line',
          title: 'Linked Dapps',
          screen: 'DummyModal',
        },
        {
          id: '003',
          iconName: 'link',
          title: 'Link with WalletConnect',
          screen: 'DummyModal',
        },
      ],
    },
    {
      sectionTitle: 'Profile and Security',
      data: [
        {
          id: '004',
          iconName: 'user-line',
          title: 'Personal details',
          screen: 'DummyModal',
        },
        {
          id: '005',
          iconName: 'medal-line',
          title: 'Account plan | ' + USER.accountClass,
          screen: 'DummyModal',
        },
        {
          id: '006',
          iconName: 'equalizer-line',
          title: 'Preferences',
          screen: 'DummyModal',
        },
        {
          id: '007',
          iconName: 'profile-line',
          title: 'Indentity verification (KYC)',
          screen: 'DummyModal',
        },
        {
          id: '008',
          iconName: 'shield-line',
          title: 'Security',
          screen: 'DummyModal',
        },
      ],
    },
    {
      sectionTitle: 'Support',
      data: [
        {
          id: '009',
          iconName: 'question-line',
          title: 'Help and guidance',
          screen: 'DummyModal',
        },
        {
          id: '010',
          iconName: 'error-warning-line',
          title: 'Terms and conditions',
          screen: 'DummyModal',
        },
        {
          id: '011',
          iconName: 'file-text-line',
          title: 'Privacy policy',
          screen: 'DummyModal',
        },
      ],
    },
    {
      sectionTitle: 'About Us',
      data: [
        {
          id: '012',
          iconName: 'user-5-line',
          title: 'Our story',
          screen: 'DummyModal',
        },
        {
          id: '013',
          iconName: 'star-line',
          title: 'Rate us on Google Play',
          screen: 'DummyModal',
        },
        {
          id: '014',
          iconName: 'twitter-line',
          title: 'Follow us on Twitter',
          screen: 'DummyModal',
        },
        {
          id: '015',
          iconName: 'facebook-circle-line',
          title: 'Like us on Facebook',
          screen: 'DummyModal',
        },
      ],
    },
  ]

  const handleCloseAccount = async () => {
    await deleteAccount(WALLETS_STORE, USER_STORE)
    dispatch(resetUserDetails())
  }
  return (
    <SectionList
      bg="muted.50"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <Box width="90%" ml="5%" mb={2}>
          <HStack alignItems="center" justifyContent="space-between" mt={4}>
            <VStack>
              <Text fontSize="md" fontWeight="semibold" lineHeight="sm">
                {USER.fullName}
              </Text>
              <Text fontWeight="medium" color="primary.700">
                {USER.userName} | {USER.countryCode} {USER.phoneNo}{' '}
              </Text>
            </VStack>
            <Avatar bg="#0F766E" ml="2" size="md">
              {USER.nameInitials}
            </Avatar>
          </HStack>
          <HStack space={3} mt={3}>
            <Button
              leftIcon={
                <Icon as={Feather} name="chevrons-up" size="md" color="primary.600" mr="1" />
              }
              variant="subtle"
              rounded="3xl"
              pr="4"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => console.log('transfer')}
            >
              Upgrade
            </Button>
            <Button
              leftIcon={<Icon as={Feather} name="user-plus" size="md" color="primary.600" mr="1" />}
              variant="subtle"
              rounded="3xl"
              pr="4"
              _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => console.log('transfer')}
            >
              Invite friends
            </Button>
          </HStack>
          <Box mt={3}>
            <AspectRatio ratio={18 / 5}>
              <Image
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt="banner"
                rounded="2xl"
                opacity={35}
              />
            </AspectRatio>
            <VStack position="absolute" my={2} mx={3} space={3}>
              <Text maxW="80%" lineHeight="md" color="white" fontWeight="medium">
                Refer a friend and you can both receive 50 cPEX
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color="white" fontWeight="semibold">
                  {USER.rewardAmt} cPEX earned
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
      sections={LINKS}
      renderSectionHeader={({ section: { sectionTitle } }) => (
        <Box width="90%" ml="5%" mb={2}>
          <SectionHeader title={sectionTitle} />
        </Box>
      )}
      renderItem={({ item }) => (
        <LinkItem iconName={item.iconName} title={item.title} screen={item.screen} />
      )}
      ListFooterComponent={() => (
        <VStack alignItems="center" space={3} mt="3">
          <Button
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => console.log('Log out')}
          >
            Log out
          </Button>
          <Button
            variant="subtle"
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => handleCloseAccount()}
          >
            Close account
          </Button>

          <Text mb="3" color="muted.500">
            Clixpesa v0.1.1
          </Text>
        </VStack>
      )}
    />
  )
}

function LinkItem(props) {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate(props.screen)}>
      <HStack alignItems="center" mb="3" width="90%" ml="5%">
        <Remixicon name={props.iconName} color="#334155" />
        <Text color="blueGray.700" width="78%" ml={3} fontWeight="medium">
          {props.title}
        </Text>
        <Icon as={Feather} name="chevron-right" size="md" color="blueGray.700" mx="3" />
      </HStack>
    </Pressable>
  )
}
