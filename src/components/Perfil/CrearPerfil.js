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
import Validaciones from './../Validaciones.js';
import CheckBox from 'react-native-check-box';

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
                        selectedPerfil: this.props.user ? this.props.user.perfil : 'USUARIO',
                        perfiles: ['SELECCIONAR PERFIL','USUARIO', 'VOLUNTARIO', 'CENTRO',],
                        telefono: this.props.user ? this.props.user.telefono : '',
                        centroPrestaInstalaciones: (this.props.user && this.props.user.perfil === 'CENTRO') ? this.props.user.centroPrestaInstalaciones :false,
                        descripcion: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.descripcion : '',
                        brindarCharlas: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.brindarCharlas : false,
                        asistirCharlas: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.asistirCharlas : false,
                        recibirVisitasCentro: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.recibirVisitasCentro : false,
                        contactoEmergencia: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.contactoEmergencia : '',
                        telefonoContactoSeguridad: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.telefonoContactoSeguridad : '',
                        mailContactoSeguridad: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.mailContactoSeguridad : '',
                        tipoOrganizacion: (this.props.user && this.props.user.perfil === 'CENTRO') ? this.props.user.tipoOrganizacion : '',
                    }
    }

    onSelectionsChange = (selectedInt) => {
        this.setState({ selectedInteres:selectedInt});
    }

    componentDidMount(){
        if(this.state.selectedPerfil != 'CENTRO'){
            var aux = [];
           for (var i = this.state.selectedInteres.length - 1; i >= 0; i--) {
                aux.push({label:this.state.selectedInteres[i] , value:this.state.selectedInteres[i]});
            }
            this.setState({selectedInteres:aux});
        }
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
                            
                            {/*          PERFIL           */}
                            <View style={style.viewPicker}>
                                <Picker
                                    selectedValue={this.state.selectedPerfil}
                                    onValueChange={ (perfil) => {this.setState({selectedPerfil:perfil});} }
                                    mode="dialog">
                                    {perfilItems}
                                </Picker>
                            </View>

                        {/*          NOMBRE USUARIO           */}
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

                        {/* DESCRIPCION */}
                        {renderIf(this.state.selectedPerfil != 'CENTRO',
                            <View style={style.MultiLineInputView}> 
                                <TextInput
                                        style={style.multilineInputText}
                                        autoCapitalize="characters"
                                        onChangeText={(desc) => this.setState({descripcion:desc})}
                                        multiline={true}
                                        placeholder='"INGRESE UNA BREVE DESCRIPCIÓN"'
                                        blurOnSubmit={false}
                                        onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
                                        onSubmitEditing = {(event) => {this._updateText(event)} }
                                        defaultValue={this.state.descripcion}
                                        
                                />
                            </View>
                        )}

                        {/*          TELEFONO           */}
                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"TELEFONO"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            telefono:text,
                                        })
                                    }}
                                    value= {this.state.telefono}
                                />
                            </View>


                        {/*          BARRIO           */}
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

                        {/*          CENTRO DE JUBILADOS           */}
                            {renderIf(this.state.selectedPerfil != 'CENTRO',
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
                            )}

                        {/*          INTERESES           */}
                            {renderIf(this.state.selectedPerfil != 'CENTRO',
                            <View>
                                <SelectMultiple
                                  items={interes}
                                  selectedItems={this.state.selectedInteres}
                                  onSelectionsChange={this.onSelectionsChange} />
                            </View>
                            )}
                            
                            {/*  CENTRO: Presta Instalaciones   */}
                            {renderIf(this.state.selectedPerfil === 'CENTRO',
                                <CheckBox
                                    style={{flex: 1, padding: 10}}
                                    onClick={()=> this.setState({centroPrestaInstalaciones:!this.state.centroPrestaInstalaciones})}
                                    isChecked={this.state.centroPrestaInstalaciones}
                                    leftText={'Accede a brindar sus instalaciones para eventos'}
                                />
                           
                            )}

                            {/*    CENTRO: TIPO ORGANIZACION */}
                            {renderIf(this.state.selectedPerfil === 'CENTRO',
                                <TextInput 
                                        style={style.singleInputText}
                                        placeholder='"TIPO ORGANIZACIÓN"'
                                        onChangeText={ (text) => {
                                            this.setState({
                                                tipoOrganizacion:text,
                                            })
                                        }}
                                        value= {this.state.tipoOrganizacion}
                                    />
                           
                            )}

                        {/*  VOLUNTARIOS o USUARIOS: Brindar o Asistir Charlas   */}
                            {renderIf(this.state.selectedPerfil != 'CENTRO',
                                <CheckBox
                                    style={{flex: 1, padding: 10}}
                                    onClick={()=> this.setState({brindarCharlas:!this.state.brindarCharlas})}
                                    isChecked={this.state.brindarCharlas}
                                    leftText={'Desea brindar charlas?'}
                                />
                           
                            )}

                            {renderIf(this.state.selectedPerfil != 'CENTRO',
                                <CheckBox
                                    style={{flex: 1, padding: 10}}
                                    onClick={()=> this.setState({asistirCharlas:!this.state.asistirCharlas})}
                                    isChecked={this.state.asistirCharlas}
                                    leftText={'Desea asistir a charlas?'}
                                />
                           
                            )}

                        {/*      CAMPOS PROOPIOS DEL ABUELO (VOLUNTARIO) : */}
                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                                <CheckBox
                                    style={{flex: 1, padding: 10}}
                                    onClick={()=> this.setState({recibirVisitasCentro:!this.state.recibirVisitasCentro})}
                                    isChecked={this.state.recibirVisitasCentro}
                                    leftText={'Quiere recibir visitas en su centro?'}
                                />
                           
                            )}

                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"NOMBRE Y APELLIDO DEL CONTACTO DE EMERGENCIA"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            contactoEmergencia:text,
                                        })
                                    }}
                                    value= {this.state.contactoEmergencia}
                                />
                            </View>
                        )}

                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"TELEFONO CONTACTO SEGURIDAD"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            telefonoContactoSeguridad:text,
                                        })
                                    }}
                                    value= {this.state.telefonoContactoSeguridad}
                                />
                            </View>
                        )}

                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                            <View  style={style.singleInputView}>
                                <TextInput style={style.singleInputText}
                                placeholder='INGRESE EL MAIL DEL CONTACTO DE SEGURIDAD'
                                onChangeText={ (text) => {
                                    this.setState({
                                        mailContactoSeguridad:text,
                                    })
                                }}
                                value= {this.state.mailContactoSeguridad}
                                />
                            </View>
                        )}

                        {/******************************************************************************************/}
                        {/*    BOTONES    */}
                            <View>
                                {renderIf(!this.props.user,
                                    <ActionButton 
                                        title="AGREGAR"
                                        onPress={()=>{
                                                        var camposRequeridosOk=this.validarCamposRequeridos();
                                                        var formatoCamposValidos=this.validarTiposDeDatos();
                                                        if(camposRequeridosOk && formatoCamposValidos){
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
                                                        var formatoCamposValidos=this.validarTiposDeDatos();
                                                        if(camposRequeridosOk && formatoCamposValidos){
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
            (this.state.selectedPerfil != 'CENTRO' && !this.state.centro) ||
            (this.state.selectedPerfil != 'CENTRO' && (!this.state.selectedInteres || this.state.selectedInteres.length === 0)) ||
            !this.state.selectedPerfil ||
            !this.state.telefono){
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
                this.state.centro, this.state.selectedInteres, this.state.selectedPerfil, this.state.telefono,
                this.state.centroPrestaInstalaciones, this.state.descripcion, this.state.brindarCharlas, this.state.asistirCharlas,
                this.state.recibirVisitasCentro, this.state.contactoEmergencia, this.state.telefonoContactoSeguridad, 
                this.state.mailContactoSeguridad, this.state.tipoOrganizacion);
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
                    this.state.centro, this.state.selectedInteres, this.state.selectedPerfil, this.state.telefono,
                    this.state.centroPrestaInstalaciones, this.state.descripcion, this.state.brindarCharlas, this.state.asistirCharlas,
                    this.state.recibirVisitasCentro, this.state.contactoEmergencia, this.state.telefonoContactoSeguridad, 
                    this.state.mailContactoSeguridad, this.state.tipoOrganizacion);
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

    validarTiposDeDatos(){
      var result = true;
      if(!Validaciones.validarTelefono(this.state.telefono)){
        alert("EL CAMPO TELEFONO  ES INVALIDO");
         return false;
      }
      if(this.state.telefonoContactoSeguridad && !Validaciones.validarTelefono(this.state.telefono)){
        alert("EL CAMPO TELEFONO CONTACTO SEGURIDAD ES INVALIDO");
         return false;
      }
      if(this.state.mailContactoSeguridad && !Validaciones.validateEmail(this.state.mailContactoSeguridad)){
        alert("EL CAMPO MAIL CONTACTO SEGURIDAD ES INVALIDO");
         return false;
      }
      return result;
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

