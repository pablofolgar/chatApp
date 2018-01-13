import React, {Component} from 'react';
import ReactNative,{Image} from 'react-native';
const style = require('.././styles.js');
const { View, TouchableHighlight, Text } = ReactNative;
import StarRating from 'react-native-star-rating';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight 
        onPress={this.props.onPress}>
        
        {/*BLOQUE DE VALORACIÓN*/}
        <View style={style.contactosView}>
        
          {/*NOMBRE*/}
          <View style={style.nombreView}>
            <Text style={style.nombreText}>
                 {this.props.item.name} - ({this.props.item.perfil})
            </Text>
          </View>

          {/* PERFIL 
          <View style={style.nombreView}>
            <Text style={style.nombreText}>
                  {this.props.item.name}
            </Text>
          </View>*/}

        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;