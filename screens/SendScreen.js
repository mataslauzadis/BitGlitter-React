/* eslint-disable react/prop-types */
import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

const width = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width);
const height = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height);

const SendScreen = ({navigation}) => {
  DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles]
  })
  .then(res => {
    console.log('Found file');

    RNFS.readFile(res['uri'], 'ascii').then(res =>{      
      console.log(res);

      var binary = [];
      for(var i = 0; i < res.length; ++i){
        var code = res.charCodeAt(i);
        var bin = code.toString(2);
        binary = binary.concat([bin]);
      }
      binary = binary.join('');
      console.log(binary);

      var color_hashmap = {
        '000': 'rgb(0,0,0)',
        '001': 'rgb(255,0,0)',
        '010': 'rgb(255, 255, 0)',
        '011': 'rgb(0,255,0)',
        '100': 'rgb(255,0,255)',
        '101': 'rgb(0,255,255)',
        '110': 'rgb(0,0,255)',
        '111': 'rgb(255,255,255)',
      };
      var pixels = [];
      for(var i = 0; i < binary.length; i += 3){
        var bit = binary.substring(i, i+3);
        pixels = pixels.concat(color_hashmap[bit]);
      }
      console.log(pixels);
      console.log('Number of pixels: ' + pixels.length);

      var pixelSize = 20;
      var pixelWidth = Math.floor(width / pixelSize) - 1; // reserve one column (leftmost) of pixels for the calibrator checkerboard 
      var pixelHeight = Math.floor(height / pixelSize) - 1; // reserve one row (top) of pixels for the calibrator checkerboard

      console.log('pixelSize: ' + pixelSize);
      console.log('screenWidth: ' + width);
      console.log('pixelWidth: ' + pixelWidth);
      console.log('screenHeight: ' + height);
      console.log('pixelHeight: ' + pixelHeight);

      var frames = Math.ceil(pixels.length / (pixelHeight * pixelWidth));
      console.log('Number of frames required: ' + frames);

      var imageResolution = pixelWidth * pixelHeight;

    });

  })
  .catch(err => {
    if (DocumentPicker.isCancel(err)) {
      console.log('Closed file picker.');
      navigation.navigate('Home');
    } 
    else { 
      console.log(err);
      navigation.navigate('Home');
    }
  });
  
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

export default SendScreen;
