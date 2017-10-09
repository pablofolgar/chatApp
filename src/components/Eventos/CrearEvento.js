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
  TimePickerAndroid,
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
        descripcion:'',
        centro:'',
        hora:'',
        isoFormatText:'HORA DEL EVENTO',
        
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

    showTimePicker = async (stateKey, options) => {
      try {
        const {action, minute, hour} = await TimePickerAndroid.open(options);
        var newState = {};
        if (action === TimePickerAndroid.timeSetAction) {
          newState[stateKey + 'Text'] = hour + ':' + (minute < 10 ? '0' + minute : minute);
          newState[stateKey + 'Hour'] = hour;
          newState[stateKey + 'Minute'] = minute;
        } else if (action === TimePickerAndroid.dismissedAction) {
          newState[stateKey + 'Text'] = 'dismissed';
        }
        this.setState(newState);
        this.setState({hora:hour+':'+minute});
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
                        style={style.singleInputText}
                        autoCapitalize="characters"
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
                      CENTRO:
                    </Text>
                  </View>


                  <View style={style.singleInputView}>
                    <TextInput 
                        style={style.singleInputText}
                        autoCapitalize="characters"
                        placeholder='CENTRO'
                        onChangeText={ (text) => {
                            this.setState({
                                centro:text,
                            })
                        }}
                        value= {this.state.centro}
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


                  <View style={style.TituloIndicativoView}>
                    <Text style={style.TituloIndicativoText}> 
                      HORA:
                    </Text>
                  </View>

                  <View style={style.DatePickerView}>

                    <View style={style.DatePickerButton}>
                      <TouchableOpacity
                        onPress={
                                  this.showTimePicker.bind(this, 'isoFormat', {
                                  hour: this.state.isoFormatHour,
                                  minute: this.state.isoFormatMinute,
                                  is24Hour: true,
                                })
                        }>
                        <Text style={style.DatePickerText}>
                          {this.state.isoFormatText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                      <Text style={style.textTituloHistoria}>
                         DESCRIPCION DEL EVENTO
                       </Text>
                  </View>

                  <View style={style.MultiLineInputView}> 
                      <TextInput
                              style={style.multilineInputText}
                              autoCapitalize="characters"
                              onChangeText={(descripcion) => this.setState({descripcion:descripcion})}
                              multiline={true}
                              blurOnSubmit={false}
                              onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
                              onSubmitEditing = {(event) => {this._updateText(event)} }
                              defaultValue={this.state.text}
                              
                      />
                </View>   

                  {/*Tiene un <View> en ActionButton.js*/}
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
                                      this.state.barrio,this.state.fecha,
                                      this.state.descripcion,this.state.centro,this.state.hora);
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
        this.setState({barrio:'',selectedTipoEvento:'SELECCIONAR CATEGORÍA',descripcion:'',centro:'',fecha:'',hora:''})
    }

    validarCamposRequeridos(){
      alert(this.state.hora)
        var result = true;
        if(!this.props.name ||
            !this.state.selectedTipoEvento ||
            !this.state.barrio ||
            !this.state.fecha ||
            !this.state.descripcion||
            !this.state.centro||
            !this.state.hora){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }
        return result;
    }
 }



 