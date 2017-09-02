import React from 'react';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Picker,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Backend from '../../Backend';
import ListItem from './ListItem';
const style = require('.././styles.js');
import {
    Actions,
} from 'react-native-router-flux';

export default class Valorar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user:this.props.usuario.user,
      generalStarCount: this.props.usuario.user.puntaje,
    };
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating,
    });
  }

  componentWillMount(){
    console.log(1);
    console.log('nombre '+this.state.user)
  }
  render() {
console.log(2);
    return (
      <View style={style.container}>

        <Text style={style.welcome}>
          React Native Star Rating Component
        </Text>
        <Text style={style.welcome}>
          General Star Demo
        </Text>
        <Text style={style.instructions}>
          {this.state.generalStarCount} of stars is displayed
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={Number(this.state.generalStarCount)}
          selectedStar={(rating) => this.onGeneralStarRatingPress(rating)}
        />
        
      </View>
    );
  }
}