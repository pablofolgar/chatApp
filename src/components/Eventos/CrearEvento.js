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
import renderIf from './../RenderIf';

export default class CrearEvento extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:this.props.user,
            selectedTipoEvento: this.props.evento ? this.props.evento.categoria :'',
            eventos: ['SELECCIONAR CATEGORÍA','MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'],
            barrio:this.props.evento ? this.props.evento.barrio : '',
            fecha:this.props.evento ? this.props.evento.fecha :'',
            simpleDate: new Date(Date.now()),
            simpleText: this.props.evento ? this.props.evento.fecha :'FECHA DEL EVENTO',
            descripcion:this.props.evento ? this.props.evento.descripcion :'',
            centro:this.props.evento ? this.props.evento.centro :'',
            hora:this.props.evento ? this.props.evento.hora :'',
            isoFormatText:this.props.evento ? this.props.evento.hora :'HORA DEL EVENTO',
            text: this.props.evento ? this.props.evento.descripcion :'',
            
        };

        console.ignoredYellowBox = [
            'Setting a timer'
        ]

        console.disableYellowBox = true;
    }




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

    _updateText(event) { 
    /*this.setState({word:text+'\n'}); */

        const { cursorPosition } = this.state;
        let newText = event.nativeEvent.text;
        const ar = newText.split('');
        ar.splice(cursorPosition, 0, '\n');
        newText = ar.join('');
        this.setState({ text: newText });
    }

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

                {/*   PICKER CATEGORÍA   */}
                  <View style={style.viewPicker}>
                    <Picker
                      selectedValue={this.state.selectedTipoEvento}
                      onValueChange={ (evento) => {this.setState({selectedTipoEvento:evento});} }
                      mode="dialog">
                      {eventostems}
                    </Picker>
                  </View>

                  {/*   BARRIO    */}
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

                  {/*   CENTRO    */}
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

                  {/*   FECHA     */}
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

                  {/*   HORA    */}
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
                              maxLength = {140}
                              
                      />
                </View>   

                {renderIf(!this.props.evento,
                  <View style={style.ActionView}>
                    <ActionButton title="CREAR"
                        style={style.actionText}
                        onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                        if(camposRequeridosOk){
                                            this.agregarEvento();
                                            }
                                        }

                                }
                      />
                  </View>   
                  )}

                  {renderIf(this.props.evento,
                    <View style={style.ActionView}>
                      <ActionButton 
                          style={style.actionText}
                          title="MODIFICAR"
                          onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                          if(camposRequeridosOk){
                                              this.modificarEvento();
                                              }
                                          }

                                  }
                        />
                    </View> 
                  )}
                
                {renderIf(this.props.evento,
                  <View style={style.ActionView}>
                    <ActionButton 
                        style={style.actionText}
                        title="BORRAR"
                        onPress={() => {
                                            this.borrarEvento();
                                            }
                                }
                      />
                  </View> 
                  )}
                      
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
            }
          },
          //TODO: hacer que cancele.
        ],
        'plain-text'
      );
    }

    modificarEvento() {
      Alert.alert(
        'ESTÁ POR MODIFICAR SU EVENTO.',
        null,
        [
          {text: 'CANCELAR', onPress: (t) => console.log('Cancel')},
          {
            text: 'MODIFICAR',
            onPress: (t) => {
              Backend.modificarEvento(this.props.evento,this.state.selectedTipoEvento,
                                      this.state.barrio,this.state.fecha,
                                      this.state.descripcion,this.state.centro,this.state.hora,this.state.user);
              this.limpiarCampos();
            }
          },
          //TODO: hacer que cancele.
        ],
        'plain-text'
      );
    }

  borrarEvento() {
        Alert.alert(
          'ESTÁ POR BORRAR SU EVENTO.',
          null,
          [
            {text: 'CANCELAR', onPress: (t) => console.log('Cancel')},
            {
              text: 'BORRAR',
              onPress: (t) => {
                Backend.borrarEvento(this.props.evento,this.state.user);
              }
            },
            //TODO: hacer que cancele.
          ],
          'plain-text'
        );
      }
    limpiarCampos(){
        this.setState({barrio:'',selectedTipoEvento:'SELECCIONAR CATEGORÍA',descripcion:'',centro:'',simpleText:'FECHA DEL EVENTO',isoFormatText:'HORA DEL EVENTO', text:' '})
    }

    validarCamposRequeridos(){
        var result = true;
        if(!this.props.name ||
            (!this.state.selectedTipoEvento || this.state.selectedTipoEvento === 'SELECCIONAR CATEGORÍA') ||
            !this.state.barrio ||
            !this.state.fecha ||
            !this.state.descripcion||
            !this.state.centro||
            !this.state.hora){
            Alert.alert(
                'IMPORTANTE',
                'DEBE COMPLETAR TODOS LOS CAMPOS',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            result = false;
        }
        return result;
    }
 }



 