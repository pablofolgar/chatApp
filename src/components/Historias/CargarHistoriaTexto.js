import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Picker,
     Alert,
     KeyboardAvoidingView,
     ScrollView,
     Image,
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
        word:'',
        text:'',
        
    };


     componentWillMount() {

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

    render(){
            let categoryItems = this.state.categorias.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });

            return(
                <Image source={require('../imagenes/huellas1.jpg')} style={style.backgroundImage}>
                    <ScrollView>

                         <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} >

                            <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',backgroundColor:'white',}}> Seleccione una categoria</Text>


                            <Picker
                               style={{ backgroundColor:'white',}}
                              selectedValue={this.state.selectedCategoria}
                              onValueChange={ (category) => {this.setState({selectedCategoria:category});} }
                              mode="dropdown">
                              {categoryItems}
                            </Picker>

                            <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',backgroundColor:'white',}}> Ingrese un titulo para su historia</Text>
                            <ScrollView>
                                <TextInput 
                                    style={style.nameInputTitulo}
                                    placeholder='Vacaciones'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            titulo:text,
                                        })
                                    }}
                                    value= {this.state.titulo}
                                />
                            </ScrollView>
                            <Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',backgroundColor:'white',}}> Ingrese su historia</Text>

                            <TextInput
                                    style={style.historiaInput}
                                    onChangeText={(historia) => this.setState({history:historia})}
                                    multiline={true}
                                    blurOnSubmit={false}
                                    onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
                                    onSubmitEditing = {(event) => {this._updateText(event)} }
                                    defaultValue={this.state.text}
                                    
                            />

                            <ActionButton title="Agregar"
                                onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                                if(camposRequeridosOk){
                                                    this.agregarHistoria();
                                                    }
                                                }

                                        }
                                />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Image>
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