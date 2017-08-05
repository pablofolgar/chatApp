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

    constructor(){
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }


    state={
        selectedCategoria: ' ',
        categorias: ['Seleccione una categoría','Música', 'Teatro', 'Cine', 'Literatura', 'Historia Nacional','Historia Internacional','Actividades Manuales','Cocina','Deportes','Miscelaneouss'],
        titulo:'',
        history:'',
    };


     componentWillMount() {

    }


    render(){
            let categoryItems = this.state.categorias.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });

            return(
                <View>
                    <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',}}> Seleccione una categoria</Text>


                    <Picker
                      selectedValue={this.state.selectedCategoria}
                      onValueChange={ (category) => {this.setState({selectedCategoria:category});} }
                      mode="dropdown">
                      {categoryItems}
                    </Picker>

                    <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',}}> Ingrese un titulo para su historia</Text>

                    <TextInput style={style.nameInput}
                        placeholder='Vacaciones'
                        onChangeText={ (text) => {
                            this.setState({
                                titulo:text,
                            })
                        }}
                        value= {this.state.titulo}
                    />

                    <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',}}> Ingrese su historia</Text>

                    <TextInput
                            style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(historia) => this.setState({history:historia})}
                            value={this.state.history}
                    />

                    <ActionButton title="Agregar"
                        onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                        if(camposRequeridosOk){
                                            this.agregarHistoria();
                                            }
                                        }

                                }
                        />
                </View>
            );
        }

    agregarHistoria() {
      Alert.alert(
        'Esta por cargar su historia',
        null,
        [
          {
            text: 'Agregar',
            onPress: (t) => {
              Backend.sendHistory(this.props.name,this.state.selectedCategoria,
                                      this.state.titulo,this.state.history);
              this.limpiarCampos();
            }
          },
          {text: 'Cancelar', onPress: (t) => console.log('Cancel')}
        ],
        'plain-text'
      );
    }

    limpiarCampos(){
        this.setState({history: '' ,titulo:'',selectedCategoria:'Seleccione una categoría'})
    }

    validarCamposRequeridos(){
        var result = true;
        if(!this.props.name ||
            !this.state.selectedCategoria ||
            !this.state.titulo ||
            !this.state.history){
            alert("Debe completar todos los campos");
            result = false;
        }
        return result;
    }

 }



 export default CargarHistoriaTexto;