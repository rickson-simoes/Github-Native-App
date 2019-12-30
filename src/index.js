import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Hello World - Black </Text>
    </View>
  );
}
