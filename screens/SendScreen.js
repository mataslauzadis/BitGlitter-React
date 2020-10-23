/* eslint-disable react/prop-types */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, PixelRatio, TouchableNativeFeedbackBase} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
import { GLView } from 'expo-gl';


const width = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width);
const height = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height);

function processFile(res) {
  RNFS.readFile(res['uri'], 'ascii').then(res => {      
    console.log(res);

    var binary = [];
    for(var i = 0; i < res.length; ++i){
      var code = res.charCodeAt(i);
      var bin = code.toString(2);
      binary = binary.concat([bin]);
    }
    binary = binary.join('');
    console.log(binary);

    var eight_color_hashmap = {
      '000': (0,0,0),  // black
      '001': (255,0,0), // red
      '010': (255, 255, 0),  // yellow
      '011': (0,255,0), // green
      '100': (255,0,255), // pink
      '101': (0,255,255), // cyan
      '110': (0,0,255), // blue
      '111': (255,255,255), // white
    };

    var four_color_hashmap = {
      '00': (0,0,0),
      '01': (255,0,0),
      '10': (0,255,0),
      '11': (0,0,255)
    }

    var pixels = [];
    for(var i = 0; i < binary.length; i += 2){
      var bit = binary.substring(i, i+2);
      pixels = pixels.concat(four_color_hashmap[bit]);
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
  });
}

function pickFile() {
  DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] })
  .then(res => {
    processFile(res);
  })
  .catch(err => {
    if (DocumentPicker.isCancel(err)) {
      console.log('Closed file picker.');
      this.props.navigation.navigate('Home');
    } 
    else { 
      console.log(err);
      this.props.navigation.navigate('Home');
    }
  });
}

const vertSrc = `
attribute vec2 position;
varying vec2 uv;
void main() {
  gl_Position = vec4(position.x, -position.y, 0.0, 1.0);
  uv = vec2(0.5, 0.5) * (position+vec2(1.0, 1.0));
}`;

const fragSrc = `
precision highp float;
varying vec2 uv;
void main () {
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}`;


class SendScreen extends Component {  
  render() {
    // pickFile();
    return (
      <GLView 
        style={styles.container}
        onContextCreate={this._onContextCreate}
      />
    );
  }
  _onContextCreate = gl => {
    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, vertSrc);
    gl.compileShader(vert);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, fragSrc);
    gl.compileShader(frag);

    // Link together into a program
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    // Save position attribute
    const positionAttrib = gl.getAttribLocation(program, 'position');

    // Create buffer
    const buffer = gl.createBuffer();

    // Animate!
    const animate = () => {
      try {
        // Clear
        gl.clearColor(0, 0, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Bind buffer, program and position attribute for use
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionAttrib);
        gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

        // Buffer data and draw!
        const speed = this.props.speed || 1;
        const a = 0.48 * Math.sin(0.001 * speed * Date.now()) + 0.5;
        console.log(a);
        const verts = new Float32Array([-a, -a, a, -a, -a, a, -a, a, a, -a, a, a]);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);

        // Submit frame
        gl.flush();
        gl.endFrameEXP();
      } finally {
        gl.enableLogging = false;
        requestAnimationFrame(animate);
      }
    };
    animate();
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
    backgroundColor: '#0000FF'
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
  svg: {
    backgroundColor: '#A9A9A9',
  }
});

export default SendScreen;
