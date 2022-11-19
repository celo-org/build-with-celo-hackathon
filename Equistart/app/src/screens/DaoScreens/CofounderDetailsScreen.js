import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import commonStyles from '../../commonStyles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { Button, Text, Modal, Input, Card } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import EmptySpace from '../../components/EmptySpace';

export default function CofounderDetailsScreen({route, navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const tableHeader = ['phone', 'Address', 'Token', 'Amount'];
  const [tableData, setTableData] = React.useState([
    [
      '7676676766',
      '0x34oh2odno23ndu4ndcwueciwibcbejrbvjsbvn',
      '7000000',
      '700',
    ],
    [
      '2323332232',
      '0xuh43wufbwecbeirbcerwibefjbvwiefnbcvije',
      '7000000',
      '700',
    ],
    // [
    //   '9883232701',
    //   '0xklinfnjcwiejfncefnindcsdcsdkcsskcskdcj',
    //   '7000000',
    //   '700',
    // ],
  ]);

  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [token, setToken] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function addFounder() {
    setModalVisible(!modalVisible);
    console.log(phone);
    tableData.push([phone, address, token, amount]);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      <Modal
        backdropStyle={styles.backdrop}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={commonStyles.secondaryTextGrey}>New Member Details</Text>
          <EmptySpace />
          <Input
            style={commonStyles.input}
            value={phone}
            onChangeText={input => setPhone(input)}
            placeholder="9999-999-999"
            label={() => <Text style={commonStyles.inputLabel}> Phone </Text>}
          />
          <Input
            style={commonStyles.input}
            value={address}
            onChangeText={input => setAddress(input)}
            label={() => <Text style={commonStyles.inputLabel}> Address </Text>}
            placeholder="0x12uwidhiu2eh3e3dh239dh3dd3"
          />
          <Input
            style={commonStyles.input}
            value={token}
            onChangeText={input => setToken(input)}
            label={() => <Text style={commonStyles.inputLabel}> Token </Text>}
            placeholder="7000000"
          />
          <Input
            style={commonStyles.input}
            value={amount}
            onChangeText={input => setAmount(input)}
            label={() => <Text style={commonStyles.inputLabel}> Deposit </Text>}
            placeholder="700"
          />
          <EmptySpace space={30} />
          <View style={commonStyles.rowButtonContainer}>
            <Button
              style={commonStyles.doubleButton}
              onPress={() => setModalVisible(!modalVisible)}
              status='warning'>
              Back
            </Button>
            <Button
              style={commonStyles.doubleButton}
              onPress={addFounder}
            >
              Add member
            </Button>
          </View>
        </View>
      </Modal>

      <View style={commonStyles.pageContent}>
        <EmptySpace />
        <Button
          style={{ marginLeft: 'auto', ...commonStyles.button }}
          onPress={() => setModalVisible(true)}
          size='small'
        >
          Add a Co-founder
        </Button>
        <Text style={commonStyles.secondaryTextGrey}>Total token to mint: {<Text style={commonStyles.primaryTextOrange}> {route.params.numOfToken} </Text>} </Text>
        {/* <Text style={commonStyles.secondaryTextGrey}>Total amount to deposit: {<Text style={commonStyles.primaryTextOrange}> 7000 </Text>}</Text> */}

        <View style={styles.tableBox}>
          <Text style={commonStyles.secondaryTextGrey}>Co-founder Details</Text>
          <View style={{ borderWidth: 1, borderColor: '#333333', borderRadius: 20 }}>
            <Table>
              <Row data={tableHeader} style={styles.tableHeader} textStyle={styles.HeaderTableText} />
              <Rows data={tableData} style={styles.tableRow} textStyle={styles.TableText} />
            </Table>
          </View>
        </View>
      </View>


      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('CreateDao')}
          status='warning'>
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('Review')}
        >
          Review
        </Button>
      </View>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    margin: 2,
    width: windowWidth / 3,
    marginLeft: 'auto'
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  page: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  tableBox: {
    // width: '100%',
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tableHeader: {
    height: 40,
    width: '90%',
    backgroundColor: '#e67425',
    alignContent: "center",
  },
  TableText: {
    margin: 5
  },
  HeaderTableText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  tableRow: {
    height: 36,
    width: '90%',
    backgroundColor: 'rgba(51, 102, 255, 0.08)'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: '#212427',
    paddingHorizontal: '3%',
    paddingVertical: '5%'
  }
});
