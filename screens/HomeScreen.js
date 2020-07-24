/* eslint-disable react/prop-types */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Send') }>
          <Text style={{color: 'rgb(255,255,255)'}}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Receive')}>
          <Text style={{color: 'rgb(255,255,255)'}}>Receive</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    backgroundColor: '#5ba4cf',
    padding: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 25,
  },
});

export default HomeScreen;
