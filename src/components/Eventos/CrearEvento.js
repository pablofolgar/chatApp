import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  Alert,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import ActionButton from  '../ActionButton';
import Backend from '../../Backend';
const style = require('./../styles.js');

export default class CrearEvento extends React.Component{

    constructor(){
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }


    state={
        selectedTipoEvento: ' ',
        eventos: ['SELECCIONAR CATEGORÍA','MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'],
        barrio:'',
        fecha:'',
        simpleDate: new Date(Date.now()),
        simpleText: 'FECHA DEL EVENTO',
    };


    showPicker = async (stateKey, options) => {
    try {
          var newState = {};
          const {action, year, month, day} = await DatePickerAndroid.open(options);
          if (action === DatePickerAndroid.dismissedAction) {
            newState[stateKey + 'Text'] = 'FECHA DEL EVENTO';
          } else {
            var date = new Date(year, month, day);
            newState[stateKey + 'Text'] = date.toLocaleDateString();
            newState[stateKey + 'Date'] = date;
          }
          this.setState(newState);
          this.setState({fecha:day+'/'+(month+1)+'/'+year});
        } catch ({code, message}) {
          console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render(){
            let eventostems = this.state.eventos.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });

            return(
              <ScrollView  style={style.container}> 

                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} >
                  
{/*                  <View style={style.TituloIndicativoView}>
                    <Text style={style.TituloIndicativoText}> 
                      CATEGORÍA:
                    </Text>
                  </View>*/}

                  <View style={style.viewPicker}>
                    <Picker
                      selectedValue={this.state.selectedTipoEvento}
                      onValueChange={ (evento) => {this.setState({selectedTipoEvento:evento});} }
                      mode="dialog">
                      {eventostems}
                    </Picker>
                  </View>

              
                  <View style={style.TituloIndicativoView}>
                    <Text style={style.TituloIndicativoText}> 
                      BARRIO:
                    </Text>
                  </View>


                  <View style={style.singleInputView}>
                    <TextInput 
                        autoCapitalize="characters"
                        style={style.singleInputText}
                        placeholder='BARRIO DEL EVENTO'
                        onChangeText={ (text) => {
                            this.setState({
                                barrio:text,
                            })
                        }}
                        value= {this.state.barrio}
                    />
                  </View>
         
                  <View style={style.TituloIndicativoView}>
                    <Text style={style.TituloIndicativoText}> 
                      FECHA:
                    </Text>
                  </View>

                  <View style={style.DatePickerView}>

                    <View style={style.DatePickerImageView}>
                      <Image source={require('../imagenes/calendar1600.png')} style={style.DatePickerImage}/>
                    </View>

                    <View style={style.DatePickerButton}>
                      <TouchableOpacity
                        onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
                        <Text style={style.DatePickerText}>
                          {this.state.simpleText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <ActionButton title="CREAR"
                      onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                      if(camposRequeridosOk){
                                          this.agregarEvento();
                                          }
                                      }

                              }
                      />
                </KeyboardAvoidingView>

              </ScrollView>
            );
        }

    agregarEvento() {
      Alert.alert(
        'ESTÁ POR CREAR SU EVENTO.',
        null,
        [
          {text: 'CANCELAR', onPress: (t) => console.log('Cancel')},
          {
            text: 'CREAR',
            onPress: (t) => {
              Backend.sendEvento(this.props.user,this.state.selectedTipoEvento,
                                      this.state.barrio,this.state.fecha);
              this.limpiarCampos();
              this.notificar
            }
          },
          //TODO: hacer que cancele.
        ],
        'plain-text'
      );
    }

    limpiarCampos(){
        this.setState({barrio:'',selectedTipoEvento:'SELECCIONAR CATEGORÍA'})
    }

    validarCamposRequeridos(){
        console.log('Nombre: '+this.props.name + ' ---- Evento: '+this.state.selectedTipoEvento+' ---- Barrio: '+this.state.barrio+' ----- Fecha: '+this.state.fecha);
        var result = true;
        if(!this.props.name ||
            !this.state.selectedTipoEvento ||
            !this.state.barrio ||
            !this.state.fecha){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }
        return result;
    }

 }



 