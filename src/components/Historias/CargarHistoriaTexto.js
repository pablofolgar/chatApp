import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Picker,
     Alert,
} from 'react-native';
import Categorias from './CategoriasHistorias';
import ActionButton from  '../ActionButton';
import Backend from '../../Backend';
const style = require('./../styles.js');

class CargarHistoriaTexto extends React.Component{




    state={
        name:this.props.name,
        categoria: "java",
        titulo:'',
        history:'',
    };


     componentWillMount() {

    }


    render(){
            return(
                <View>
                    <Text> Seleccione una categoria</Text>


                    <Picker
                      selectedValue={this.state.categoria}
                      onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}
                      mode="dropdown">
                      <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                    <Text> Ingrese un titulo para su historia</Text>

                    <TextInput style={style.nameInput}
                        placeholder='Vacaciones'
                        onChangeText={ (text) => {
                            this.setState({
                                titulo:text,
                            })
                        }}
                        value= {this.state.titulo}
                    />

                    <Text> Ingrese su historia</Text>

                    <TextInput
                            style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(history) => this.setState({history})}
                            value={this.state.history}
                    />

                    <ActionButton title="Agregar"
                        onPress={this._addItem.bind(this)}
                        />
                </View>
            );
        }

    _addItem() {
      Alert.alert(
        'Esta por cargar su historia',
        null,
        [
          {
            text: 'Agregar',
            onPress: (t) => {
                  var camposLlenos = this.validarCamposRequeridos();
                  if(camposLlenos){
                      Backend.sendHistory(this.state.name,this.state.categoria,
                                              this.state.titulo,this.state.history);
                      this.limpiarCampos();
                  }
            }
          },
        ],
        'plain-text'
      );
    }

    limpiarCampos(){
        this.setState({history: " ",titulo:" "})
    }

    validarCamposRequeridos(){
        var result = true;
        if(this.state.name==" " ||
            this.state.categoria==" " ||
            this.state.titulo==" " ||
            this.state.history==" "){
            alert("Debe completar todos los campos");
            result = false;
        }
        return result;
    }

 }



 export default CargarHistoriaTexto;