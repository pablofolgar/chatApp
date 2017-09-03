import React, {Component} from 'react';
import ReactNative,{Image} from 'react-native';
const style = require('.././styles.js');
const { View, TouchableHighlight, Text } = ReactNative;
import StarRating from 'react-native-star-rating';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={style.CatNotifView}>
          <Text style={style.DataNotifText}>NOMBRE:{this.props.item.user.name}</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={Number(this.props.item.user.puntaje)}
        />
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;