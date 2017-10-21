import React, {Component} from 'react';
import ReactNative from 'react-native';
const style = require('./styles.js')
const constants = style.constants;
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends Component {
  render() {
    return (

        <TouchableHighlight onPress={this.props.onPress}>
          <Text style={this.props.style}>
            {this.props.title}
          </Text>
        </TouchableHighlight>

    );
  }
}

module.exports = ActionButton;