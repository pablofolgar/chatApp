import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Picker,
     Alert,
     DatePickerAndroid,
     TouchableWithoutFeedback,
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
        eventos: ['Seleccione un evento','Música', 'Teatro', 'Cine', 'Literatura', 'Historia Nacional','Historia Internacional','Actividades Manuales','Cocina','Deportes','Miscelaneouss'],
        barrio:'',
        fecha:'',
        simpleDate: new Date(Date.now()),
        simpleText: 'Seleccione una fecha',
    };


    showPicker = async (stateKey, options) => {
    try {
          var newState = {};
          const {action, year, month, day} = await DatePickerAndroid.open(options);
          if (action === DatePickerAndroid.dismissedAction) {
            newState[stateKey + 'Text'] = 'dismissed';
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
                <View>
                    <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',}}> Seleccione un evento</Text>


                    <Picker
                      selectedValue={this.state.selectedTipoEvento}
                      onValueChange={ (evento) => {this.setState({selectedTipoEvento:evento});} }
                      mode="dropdown">
                      {eventostems}
                    </Picker>

                    <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',}}> Ingrese un barrio </Text>

                    <TextInput style={style.nameInput}
                        placeholder='Vacaciones'
                        onChangeText={ (text) => {
                            this.setState({
                                barrio:text,
                            })
                        }}
                        value= {this.state.barrio}
                    />

                    <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',}}> Ingrese una fecha</Text>

                    <TouchableWithoutFeedback
                        onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
                        <Text>{this.state.simpleText}</Text>
                      </TouchableWithoutFeedback>

                    <ActionButton title="Agregar"
                        onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                        if(camposRequeridosOk){
                                            this.agregarEvento();
                                            }
                                        }

                                }
                        />
                </View>
            );
        }

    agregarEvento() {
      Alert.alert(
        'Esta por cargar su evento',
        null,
        [
          {
            text: 'Agregar',
            onPress: (t) => {
              Backend.sendEvento(this.props.user,this.state.selectedTipoEvento,
                                      this.state.barrio,this.state.fecha);
              this.limpiarCampos();
              this.notificar
            }
          },
          {text: 'Cancelar', onPress: (t) => console.log('Cancel')}
        ],
        'plain-text'
      );
    }

    limpiarCampos(){
        this.setState({barrio:'',selectedTipoEvento:'Seleccione un evento'})
    }

    validarCamposRequeridos(){
        console.log('Nombre: '+this.props.name + ' ---- Evento: '+this.state.selectedTipoEvento+' ---- Barrio: '+this.state.barrio+' ----- Fecha: '+this.state.fecha);
        var result = true;
        if(!this.props.name ||
            !this.state.selectedTipoEvento ||
            !this.state.barrio ||
            !this.state.fecha){
            alert("Debe completar todos los campos");
            result = false;
        }
        return result;
    }

 }



 