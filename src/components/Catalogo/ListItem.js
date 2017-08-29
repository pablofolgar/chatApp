import React, {Component} from 'react';
import ReactNative,{Image} from 'react-native';
const style = require('.././styles.js');
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={style.CatNotifView}>
          <Text style={style.DataNotifText}>EMPRESA:{this.props.item.empresa} - CATEGORIA:{this.props.item.categoria} - PRODUCTO:{this.props.item.producto} </Text>
          <Image
	          style={{width: 50, height: 50}}
	          source={{uri: this.props.item.imagenUrl}}
        	/>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;