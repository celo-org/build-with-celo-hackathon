import { Box, Text } from 'native-base'
import { useEffect } from 'react'
import { getUserDetails } from '../../app/storage'
import { USER_STORE } from 'clixpesa/app/constants'

export default function AccountScreen() {
  useEffect(() => {
    const fetchDetails = async () => {
      const results = await getUserDetails(USER_STORE)
      console.log(results)
    }

    fetchDetails()
  }, [])

  return (
    <Box flex={1} bg="#F5F5F5" alignItems="center" justifyContent="center">
      <Text>Account Screen</Text>
    </Box>
  )
}
