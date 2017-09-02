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
        categorias: ['SELECCIONAR CATEGORÍA','MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'],
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
               // <Image source={require('../imagenes/huellas1.jpg')} style={style.backgroundImage}>
                    <ScrollView  style={style.container}> 

                         <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} >

                            {/*<Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',backgroundColor:'white',}}> Seleccione una categoria</Text>*/}

                            <View style={style.viewPicker}>
                                <Picker
                                    selectedValue={this.state.selectedCategoria}
                                    onValueChange={ (category) => {this.setState({selectedCategoria:category});} }
                                    mode="dialog">
                                    {categoryItems}
                                </Picker>
                            </View>
                            {/*<Text style={{fontWeight: 'bold',fontSize: 20,color:'blue',backgroundColor:'white',}}> Ingrese un titulo para su historia</Text>*/}
                            
                            <View style={style.singleInputView}>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"MI TÍTULO"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            titulo:text,
                                        })
                                    }}
                                    value= {this.state.titulo}
                                />
                            </View>

                            <View>
                                <Text style={style.textTituloHistoria}>
                                   ESCRIBA LA HISTORIA
                                 </Text>
                            </View>

                            <View style={style.MultiLineInputView}> 
                                <TextInput
                                        style={style.multilineInputText}
                                        autoCapitalize="characters"
                                        onChangeText={(historia) => this.setState({history:historia})}
                                        multiline={true}
                                        blurOnSubmit={false}
                                        onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
                                        onSubmitEditing = {(event) => {this._updateText(event)} }
                                        defaultValue={this.state.text}
                                        
                                />
                            </View>

                            <ActionButton title="CREAR"
                                onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                                if(camposRequeridosOk){
                                                    this.agregarHistoria();
                                                    }
                                                }

                                        }
                            />

                        </KeyboardAvoidingView>

                    </ScrollView>
               // </Image>
            );
        }

    agregarHistoria() {
      Alert.alert(
        'PARA CREAR DEFINITIVAMENTE SU HISTORIA APRIETE "AGREGAR"',
        null,
        [
          {text: 'VOLVER', onPress: (t) => console.log('Cancel')},
          {
            text: 'AGREGAR',
            onPress: (t) => {
              Backend.sendHistory(this.props.user.name,this.state.selectedCategoria,
                                      this.state.titulo,this.state.history);
              this.limpiarCampos();
            }
          },
        ],
        'plain-text'
      );
    }

    limpiarCampos(){
        this.setState({history: '' ,titulo:'',selectedCategoria:'SELECCIONAR CATEGORÍA',text:''})
    }

    validarCamposRequeridos(){
        var result = true;
        if(!this.props.user.name ||
            !this.state.selectedCategoria ||
            !this.state.titulo ||
            !this.state.history){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }
        return result;
    }

 }



 export default CargarHistoriaTexto;