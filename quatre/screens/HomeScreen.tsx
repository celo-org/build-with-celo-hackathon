import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions, FlatList 
 } from 'react-native'
import React from 'react';
import Header from "../components/Header";
import CustomButton from "../components/CustomButton"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const data = [
  {id: 1, quantity: 0, title: "TVL", bg:"#009C86"},
  {id: 2, quantity: 0, title: "CURRENCY", bg:"#837235"},
  {id: 3, quantity: 0, title: "NETWORK", bg:"#005BAF"},
  {id: 4, quantity: 0, title: "PROPOSAL", bg:"#F87C00"},
  {id: 5, quantity: 0, title: "OPENED BANDS", bg:"#8737B8"},
  {id: 6, quantity: 0, title: "CLOSED BANDS", bg:"#F800B2"}
]

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");
const cardWidth:number = PAGE_WIDTH * 0.9;
const cardHeight: number = PAGE_HEIGHT * 0.1;
const HomeScreen = () => {

  const [cardItems, setCardItems] = React.useState(data);
  return (
    <ScrollView contentContainerStyle={{backgroundColor:"#E5E5E5", flex: 1}}>
      <SafeAreaView>
      <Header/>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20, paddingVertical:30}}>
          <CustomButton title="CONNECT WALLET"/>
          <CustomButton title="SELECT NETWORK" icon="chevron-down"/>
        </View>
        <View style={{paddingHorizontal:20, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <Text style={{fontWeight:"600", fontSize: 24, lineHeight:29}}>Insights</Text>
          <View style={{flexDirection:"row", alignItems:"center", }}>
            
            <MaterialCommunityIcons name="dots-square" size={30} color="#B1B1B1" />
            <FontAwesome5 name="grip-lines" size={30} color="#F87C00" style={{padding:10}} />
            </View>
        </View>
    <View style={{alignItems:"center", marginBottom: 100}}>
        {
          cardItems.map((card, index)=>
             (
              <View key={index}>
              <View style={{width: cardWidth, height: cardHeight, backgroundColor:"#FFFFFF", paddingHorizontal: 10,marginVertical: 5, borderRadius:5}}>
                <Text style={{color: card.bg, fontSize:50, fontWeight:"700", }}>{card.quantity}</Text>
                <Text style={{color:"#929191", fontWeight:"500", fontSize: 14, paddingVertical: 10}}>{card.title}</Text>
                <View style={{width: 50, height:50,borderBottomLeftRadius:150,borderTopLeftRadius:150,borderTopRightRadius:150,borderBottomRightRadius:10,alignItems:"center", justifyContent:"center", backgroundColor:card.bg, position: "absolute", bottom: -5, right:0 }}>
                    <AntDesign name="idcard" size={30} color="white" />
                </View>
              </View>
            </View>
            ) 
          )
        }
        
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})

