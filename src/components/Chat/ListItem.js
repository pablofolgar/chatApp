import React, {Component} from 'react';
import ReactNative,{Image} from 'react-native';
const style = require('.././styles.js');
const { View, TouchableHighlight, Text } = ReactNative;
import StarRating from 'react-native-star-rating';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        {/*BLOQUE DE VALORACIÓN*/}
        <View style={style.valoracionView}>
        
          {/*NAME VIEW*/}
          <View style={style.nameView}>
            <Text style={style.nameText}>
                  {this.props.item.name}
            </Text>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;