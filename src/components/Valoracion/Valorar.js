import React from 'react';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Picker,
  Alert,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Backend from '../../Backend';
import ListItem from './ListItem';
const style = require('.././styles.js');
import {
    Actions,
} from 'react-native-router-flux';
import ActionButton from  '../ActionButton';

export default class Valorar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userValorar:this.props.userValorar.user,
      generalStarCount: this.props.userValorar.user ? this.props.userValorar.user.puntaje : 0,
      user:this.props.user,
    };
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating,
    });
  }

  render() {
    return (
      <View style={style.container}>

      
        <Text style={style.welcome}>
          EL PARTICIPANTE {this.state.userValorar.name} 
        </Text>
        <Text style={style.instructions}>
          TIENE UNA VALORACIÓN de {this.state.userValorar.puntaje} ESTRELLAS
        </Text>
        <Text style={style.instructions}>
          USTED LE ESTA ASIGNANDO {this.state.generalStarCount} ESTRELLAS
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={Number(this.state.generalStarCount)}
          selectedStar={(rating) => this.onGeneralStarRatingPress(rating)}
        />

        <ActionButton title="GUARDAR VALORACIÓN"
                                  onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                                   if(camposRequeridosOk){
                                                        this.guardarValoracion();
                                                    }
                                                  }
                                            }
                  />
        
      </View>
    );
  }

  validarCamposRequeridos(){
        var result = true;
        if(
            !this.state.generalStarCount ||
            this.state.generalStarCount === 0 
            ){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }
        return result;
    }

    guardarValoracion(){
      Alert.alert(
        'PARA VALORAR AL PARTICIPANTE APRIETE "GUARDAR"',
        null,
        [
          {text: 'VOLVER', onPress: (t) => console.log('Cancel')},
          {
            text: 'GUARDAR',
            onPress: (t) => {
              var puntaje = Number(this.state.userValorar.puntaje) === 0 ?  Number(this.state.generalStarCount) : Number(((this.state.generalStarCount+this.state.userValorar.puntaje)/2))
              Backend.guardarValoracion(this.state.userValorar,puntaje);
              Actions.verUsuarioValoracion({user:this.state.user,});
            }
          },
        ],
        'plain-text'
        );      
    }

}