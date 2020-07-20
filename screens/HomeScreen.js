/* eslint-disable react/prop-types */
import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export function fileSelect() {
  DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles]
  })
  .then(res => {
    console.log(res.uri, res.type, res.name, res.size);    
  })
  .catch(err => {
    if (DocumentPicker.isCancel(err)) {
      console.log('Closed file picker.');
    } 
    else { 
      console.log(err);
    }
  });
}

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={ fileSelect }>
        <Text style={{color: 'rgb(255,255,255)'}}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Receive')}>
        <Text style={{color: 'rgb(255,255,255)'}}>Receive</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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