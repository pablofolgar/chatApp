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
              {this.props.item.user.name}
            </Text>
          </View>

          {/*STARS VIEW*/}
          <View style={style.starsView}>
            <StarRating
              disabled={true}
              maxStars={5}
              starColor={'#ccac00'}
              emptyStarColor={'#ccac00'}
              starSize={40}
              rating={Number(this.props.item.user.puntaje)}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;