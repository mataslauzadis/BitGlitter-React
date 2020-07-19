/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const ReceiveScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5ba4cf',
    padding: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 25,
  },
});

export default ReceiveScreen;
