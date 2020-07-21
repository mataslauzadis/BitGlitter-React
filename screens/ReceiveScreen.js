import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import { RNCamera } from 'react-native-camera';

class ReceiveScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={{flex: 1, alignItems: 'center'}}
          ref={(ref) => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
        />
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
    alignItems: 'center',
    backgroundColor: '#5ba4cf',
    padding: 10,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 25,
  },
});

export default ReceiveScreen;
