import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react';
import Header from "../components/Header";

const InvestScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView>
          <Header/>
      </SafeAreaView>
    </ScrollView>
  )
}

export default InvestScreen

// const styles = StyleSheet.create({})