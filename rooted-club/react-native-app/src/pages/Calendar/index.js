import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Calendar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pagina Calendario</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    fontSize: 25,
    fontWeight: 'bold'
  }
})