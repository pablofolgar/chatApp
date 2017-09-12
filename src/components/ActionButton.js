import React, {Component} from 'react';
import ReactNative from 'react-native';
const style = require('./styles.js')
const constants = style.constants;
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends Component {
  render() {
    return (
      <View style={style.ActionView}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          style={style.LoginTouchable}
          onPress={this.props.onPress}>
          <Text style={style.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = ActionButton;