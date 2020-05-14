import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './Timer.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
