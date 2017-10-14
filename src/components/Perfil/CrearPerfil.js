import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Picker,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

import ActionButton from  '../ActionButton';
import Backend from '../../Backend';
import SelectMultiple from './SelectMultiple'
import renderIf from './RenderIf';

const style = require('../styles.js');
const interes = ['MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'];

export default class CrearPerfil extends React.Component{
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        this.state = {userId:this.props.userId,
                        name: this.props.user ? this.props.user.name : '',
                        barrio: this.props.user ? this.props.user.barrio : '',
                        centro: this.props.user ? this.props.user.centro : '',
                        selectedInteres: this.props.user ? this.props.user.intereses : [],
                        selectedPerfil: this.props.user ? this.props.user.perfil : '',
                        perfiles: ['SELECCIONAR PERFIL','USUARIO', 'VOLUNTARIO', 'CENTRO',],
                    }
    }

    onSelectionsChange = (selectedInt) => {
        this.setState({ selectedInteres:selectedInt});
    }

    componentDidMount(){
        var aux = [];
       for (var i = this.state.selectedInteres.length - 1; i >= 0; i--) {
            aux.push({label:this.state.selectedInteres[i] , value:this.state.selectedInteres[i]});
        }
        this.setState({selectedInteres:aux});
    }
    
    render(){
        let perfilItems = this.state.perfiles.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        return(
           
             // <Image source={require('./imagenes/difuminado1.jpg')} style={style.backgroundImage}>
            <ScrollView style={style.container} >

                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={700} >

                    <View>
                            

                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"NOMBRE USUARIO"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            name:text,
                                        })
                                    }}
                                    value= {this.state.name}
                                />
                            </View>

                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"BARRIO"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            barrio:text,
                                        })
                                    }}
                                    value= {this.state.barrio}
                                />
                            </View>

                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"CENTRO DE JUBILADOS"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            centro:text,
                                        })
                                    }}
                                    value= {this.state.centro}
                                />
                            </View>

                            <View>
                                <SelectMultiple
                                  items={interes}
                                  selectedItems={this.state.selectedInteres}
                                  onSelectionsChange={this.onSelectionsChange} />
                            </View>

                            <View style={style.viewPicker}>
                                <Picker
                                    selectedValue={this.state.selectedPerfil}
                                    onValueChange={ (perfil) => {this.setState({selectedPerfil:perfil});} }
                                    mode="dialog">
                                    {perfilItems}
                                </Picker>
                            </View>

                            <View>
                                {renderIf(!this.props.user,
                                    <ActionButton 
                                        title="AGREGAR"
                                        onPress={()=>{
                                                        var camposRequeridosOk=this.validarCamposRequeridos();
                                                        if(camposRequeridosOk){
                                                            this.agregarUsuario();
                                                        }
                                                    }
                                                }
                                    />
                                )}

                                 {renderIf(this.props.user,
                                    <ActionButton 
                                        title="MODIFICAR"
                                        onPress={()=>{
                                                        var camposRequeridosOk=this.validarCamposRequeridos();
                                                        if(camposRequeridosOk){
                                                            this.editarUsuario();
                                                        }
                                                    }
                                                }
                                    />
                                )}

                                 {renderIf(this.props.user,
                                    <ActionButton 
                                        title="BORRAR"
                                        onPress={()=>{
                                                        this.borrarUsuario();
                                                    }
                                                }
                                    />
                                )}
                
                            </View>
                    </View>


                </KeyboardAvoidingView>
            
            </ScrollView>
        //</Image>
           
        );
    }//FIN de render()

    validarCamposRequeridos(){
        var result = true;
        if(!this.state.name ||
            !this.state.barrio ||
            !this.state.centro ||
            !this.state.selectedInteres || this.state.selectedInteres.length === 0 ||
            !this.state.selectedPerfil){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }
        return result;
    }

    agregarUsuario() {
      Alert.alert(
        'PARA CREAR DEFINITIVAMENTE SU USUARIO PRESIONE "AGREGAR"',
        null,
        [
          {text: 'VOLVER', onPress: (t) => console.log('Cancel')},
          {
            text: 'AGREGAR',
            onPress: (t) => {
              Backend.agregarUsuario(this.state.userId, this.state.name, this.state.barrio,
                this.state.centro, this.state.selectedInteres, this.state.selectedPerfil);
            }
          },
        ],
        'plain-text'
      );
    }

    editarUsuario() {
      Alert.alert(
        'PARA EDITAR DEFINITIVAMENTE SU USUARIO PRESIONE "MODIFICAR"',
        null,
        [
          {text: 'VOLVER', onPress: (t) => console.log('Cancel')},
          {
            text: 'MODIFICAR',
            onPress: (t) => {
              Backend.modificarUsuario(this.props.user,this.state.name, this.state.barrio,
                    this.state.centro, this.state.selectedInteres, this.state.selectedPerfil);
            }
          },
        ],
        'plain-text'
      );
    }

    borrarUsuario() {
      Alert.alert(
        'PARA BORRAR DEFINITIVAMENTE SU USUARIO PRESIONE "BORRAR"',
        null,
        [
          {text: 'VOLVER', onPress: (t) => console.log('Cancel')},
          {
            text: 'BORRAR',
            onPress: (t) => {
              Backend.borrarUsuario(this.props.user);
            }
          },
        ],
        'plain-text'
      );
    }

}

