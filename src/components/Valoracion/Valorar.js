import React from 'react';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Picker,
  Alert,
  ScrollView,
  TextInput,
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
      opinion:'',
      text:'',
    };
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating,
    });
  }

  render() {
    return (
      <ScrollView  style={style.container}> 

      
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

        <View>
            <Text style={style.textTituloHistoria}>
               OPINIONES
             </Text>
        </View>

        <View style={style.MultiLineInputView}> 
            <TextInput
                    style={style.multilineInputText}
                    autoCapitalize="characters"
                    onChangeText={(opinion) => this.setState({opinion:opinion})}
                    multiline={true}
                    blurOnSubmit={false}
                    onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
                    onSubmitEditing = {(event) => {this._updateText(event)} }
                    defaultValue={this.state.text}
                    
            />
        </View>

        <ActionButton title="GUARDAR VALORACIÓN"
                                  onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                                   if(camposRequeridosOk){
                                                        this.guardarValoracion();
                                                    }
                                                  }
                                            }
                  />
        
      </ScrollView>
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
              Backend.guardarValoracion(this.state.userValorar,puntaje,this.state.opinion);
              Actions.verUsuarioValoracion({user:this.state.user,});
            }
          },
        ],
        'plain-text'
        );      
    }

    _updateText(event) { 
        /*this.setState({word:text+'\n'}); */

            const { cursorPosition } = this.state;
            let newText = event.nativeEvent.text;
            const ar = newText.split('');
            ar.splice(cursorPosition, 0, '\n');
            newText = ar.join('');
            this.setState({ text: newText });


    }

}