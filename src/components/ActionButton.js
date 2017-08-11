import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('./styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends Component {
  render() {
    return (
      <View >
        <TouchableHighlight
          underlayColor={constants.actionColor}
          style={styles.action}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = ActionButton;