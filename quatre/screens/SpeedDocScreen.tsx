import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react';
import Header from "../components/Header";

const SpeedDocScreen = () => {
  return (
    <SafeAreaView>
        <ScrollView>
            <Header/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SpeedDocScreen

const styles = StyleSheet.create({})