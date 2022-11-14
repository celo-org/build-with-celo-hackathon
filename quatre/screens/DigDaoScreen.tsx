import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import Header from "../components/Header";

const DigDaoScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView>
          <Header/>
      </SafeAreaView>
    </ScrollView>
  )
}

export default DigDaoScreen

const styles = StyleSheet.create({})