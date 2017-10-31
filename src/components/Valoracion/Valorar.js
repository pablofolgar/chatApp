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
      //El usuario se carga sin el campo puntaje, por lo cual la primera vez no tiene valor, es undefine
      generalStarCount: this.props.userValorar.user && (typeof this.props.userValorar.user.puntaje !== 'undefined')  ? this.props.userValorar.user.puntaje : 0,
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

        {/*BLOQUE DE VALORACIÓN*/}
        <View style={style.valoracionView}>

          {/*NAME VIEW*/}
          <View style={style.nameView}>
            <Text style={style.nameText}>
              {this.state.userValorar.name} 
            </Text>
          </View>

          {/*STARS VIEW*/}
          <View style={style.starsView}>
            <StarRating
              disabled={false}
              maxStars={5}
              starColor={'#ccac00'}
              emptyStarColor={'#ccac00'}
              starSize={40}
              rating={Number(this.state.generalStarCount)}
              selectedStar={(rating) => this.onGeneralStarRatingPress(rating)}
            />
          </View>
        </View>

        <View style={style.valoracionView2}>
          <View style={style.puntajeView}>
            <Text style={style.puntajeText}>
              USTED LE DA:
            </Text>            
            <View style={style.espacio}>
            </View>
            <Text style={style.puntajeValor}>
              {this.state.generalStarCount != 0 ? this.state.generalStarCount.toFixed(2) : 0} ★
            </Text>
          </View>

          <View style={style.puntajeView2}>
            <Text style={style.puntajeText}>
              VALORACIÓN TOTAL:
            </Text>
            <View style={style.espacio}>
            </View>
            <Text style={style.puntajeValor}>
               {(typeof this.props.userValorar.user.puntaje !== 'undefined') ? this.state.userValorar.puntaje.toFixed(2) : 0} ★
            </Text>
          </View>
        </View>

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
        <View style={style.ActionView}>
          <ActionButton 
            title="VALORAR"
            style={style.actionText}
            onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                             if(camposRequeridosOk){
                                  this.guardarValoracion();
                              }
                            }
                    }
           />
        </View>
        
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
        if (this.state.opinion.length > 0 &&
              this.state.opinion.replace(/\n/g, '').length === 0 
            //Si el campo opinion tiene longitud > 0 y despues de sacarle las lineas en blanco
            //tiene longitud = 0 quiere decir que eran solo lineas en blanco
            ){
            alert("NO SE PUEDE COMPLETAR LA OPINIÓN CON LÍNEAS EN BLANCO");
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
              var puntaje;
              if( (typeof this.props.userValorar.user.puntaje === 'undefined') ||  Number(this.state.userValorar.puntaje) === 0 ){
                puntaje  = Number(this.state.generalStarCount);
              }else{
                puntaje  = Number((this.state.generalStarCount+this.state.userValorar.puntaje)/2);
              }
              Backend.guardarValoracion(this.state.userValorar,puntaje,this.state.opinion.replace(/\n/g, ''));
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