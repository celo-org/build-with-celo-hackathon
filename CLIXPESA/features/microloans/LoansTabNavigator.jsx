import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import LoansHomeScreen from './LoansHomeScreen'
import LoanOffersScreen from './LoanOffersScreen'
import LoanRequestsScreen from './LoanRequestsScreen'

const Tab = createMaterialTopTabNavigator()

function LoansTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="YourLoans" component={LoansHomeScreen} />
      <Tab.Screen name="Offers" component={LoanOffersScreen} />
      <Tab.Screen name="Requests" component={LoanRequestsScreen} />
    </Tab.Navigator>
  )
}

export default LoansTabNavigator
