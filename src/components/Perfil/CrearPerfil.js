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
                        selectedPerfil: this.props.user ? this.props.user.perfil : 'SELECCIONAR PERFIL',
                        perfiles: ['SELECCIONAR PERFIL','USUARIO', 'VOLUNTARIO', 'CENTRO',],
                        telefono: this.props.user ? this.props.user.telefono : '',
                        centroPrestaInstalaciones: (this.props.user && this.props.user.perfil === 'CENTRO') ? this.props.user.centroPrestaInstalaciones :false,
                        descripcion: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.descripcion : '',
                        brindarCharlas: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.brindarCharlas : false,
                        asistirCharlas: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.asistirCharlas : false,
                        recibirVisitasCentro: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.recibirVisitasCentro : false,
                        contactoSeguridad: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.contactoSeguridad : '',
                        telefonoContactoSeguridad: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.telefonoContactoSeguridad : '',
                        mailContactoSeguridad: (this.props.user && this.props.user.perfil === 'USUARIO') ? this.props.user.mailContactoSeguridad : '',
                        tipoOrganizacion: (this.props.user && this.props.user.perfil === 'CENTRO') ? this.props.user.tipoOrganizacion : '',
                        text: (this.props.user && this.props.user.perfil != 'CENTRO') ? this.props.user.descripcion : '',
                    }
    }

    onSelectionsChange = (selectedInt) => {
        this.setState({ selectedInteres:selectedInt});
    }

    componentDidMount(){
        if(this.state.selectedPerfil != 'CENTRO' && this.state.selectedPerfil != 'ADMIN'){
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
                        {/*   Título Principal    */}
                        <View style={style.tituloCentralVista}>
                            <Text style={style.tituloCentral}> 
                              CREACIÓN DE PERFIL
                            </Text>
                        </View>

                        
                        {/*        -PERFIL-        */}
                        {renderIf(this.props.user && this.props.user.perfil != 'ADMIN',
                        <View style={style.viewPicker}>
                            <Picker
                                selectedValue={this.state.selectedPerfil}
                                onValueChange={ (perfil) => {this.setState({selectedPerfil:perfil});} }
                                mode="dialog">
                                {perfilItems}
                            </Picker>
                        </View>
                        )}
                        
                        {/*       -NOMBRE USUARIO-        */}
                        <View style={style.singleInputView}>
                            <TextInput 
                                autoCapitalize="characters"
                                style={style.singleInputText}
                                placeholder='"NOMBRE DE USUARIO"'
                                onChangeText={ (text) => {
                                    this.setState({
                                        name:text,
                                    })
                                }}
                                value= {this.state.name}
                            />
                        </View>

                        {/*          TELEFONO           */}
                        <View style={style.singleInputView}>
                            <TextInput 
                                autoCapitalize="characters"
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
                        <View style={style.singleInputView}>
                            <TextInput 
                                autoCapitalize="characters"
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
                        {renderIf(this.state.selectedPerfil != 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                            <View style={style.singleInputView}>
                                <TextInput 
                                    autoCapitalize="characters"
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

                        {/* DESCRIPCION */}
                        {renderIf(this.state.selectedPerfil != 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                            <View style={style.MultiLineInputView}> 
                                <TextInput
                                        style={style.multilineInputText}
                                        autoCapitalize="characters"
                                        onChangeText={(desc) => this.setState({descripcion:desc})}
                                        multiline={true}
                                        placeholder='"INGRESE UNA BREVE DESCRIPCIÓN ACERCA DE USTED"'
                                        blurOnSubmit={false}
                                        onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection.start })}
                                        onSubmitEditing = {(event) => {this._updateText(event)} }
                                        defaultValue={this.state.text}
                                        
                                />
                            </View>
                        )}

                        {/*    CENTRO: TIPO ORGANIZACION */}
                        {renderIf(this.state.selectedPerfil === 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                            <View style={style.singleInputView}>
                                <TextInput 
                                        autoCapitalize="characters"
                                        style={style.singleInputText}
                                        placeholder='"TIPO ORGANIZACIÓN"'
                                        onChangeText={ (text) => {
                                            this.setState({
                                                tipoOrganizacion:text,
                                            })
                                        }}
                                        value= {this.state.tipoOrganizacion}
                                    />
                            </View>

                        )}
                        {/*          INTERESES           */}
                        {renderIf(this.state.selectedPerfil != 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                            <View>
                                <View style={style.TituloIndicativoView}>
                                    <Text style={style.TituloIndicativoText}> 
                                      INTERESES:
                                    </Text>
                                </View>
                                <View style={style.selectMultipleVista}>
                                    <SelectMultiple
                                      items={interes}
                                      selectedItems={this.state.selectedInteres}
                                      onSelectionsChange={this.onSelectionsChange} />
                                </View>
                            </View>
                        )}
                            
                        {/*  CENTRO: Presta Instalaciones   */}
                        {renderIf(this.state.selectedPerfil === 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                        <View style={style.checkVista}>
                            <CheckBox
                                style={style.checkTexto}
                                onClick={()=> this.setState({centroPrestaInstalaciones:!this.state.centroPrestaInstalaciones})}
                                isChecked={this.state.centroPrestaInstalaciones}
                                rightText={'¿BRINDA SUS INSTALACIONES PARA EVENTOS?'}
                            />
                        </View>
                       
                        )}


                        {/*  VOLUNTARIOS o USUARIOS: Brindar o Asistir Charlas   */}
                        
                        {renderIf(this.state.selectedPerfil != 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                            <View>
                                <View style={style.TituloIndicativoView}>
                                    <Text style={style.TituloIndicativoText}> 
                                      ACTIVIDAD:
                                    </Text>
                                </View>
                                <View style={style.checkVista}>
                                    <CheckBox
                                        style={style.checkTexto}
                                        onClick={()=> this.setState({brindarCharlas:!this.state.brindarCharlas})}
                                        isChecked={this.state.brindarCharlas}
                                        rightText={'¿DESEA BRINDAR CHARLAS?'}
                                    />
                                </View>
                            </View>
                        )}

                        {renderIf(this.state.selectedPerfil != 'CENTRO' && this.state.selectedPerfil != 'ADMIN',
                            <View style={style.checkVista}>
                                <CheckBox
                                    style={style.checkTexto}
                                    onClick={()=> this.setState({asistirCharlas:!this.state.asistirCharlas})}
                                    isChecked={this.state.asistirCharlas}
                                    rightText={'¿DESEA ASISTIR A CHARLAS?'}
                                />
                            </View>
                        )}

                        {/*      CAMPOS PROOPIOS DEL ABUELO (VOLUNTARIO) : */}
                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                            <View style={style.checkVista}>
                                <CheckBox
                                    style={style.checkTexto}
                                    onClick={()=> this.setState({recibirVisitasCentro:!this.state.recibirVisitasCentro})}
                                    isChecked={this.state.recibirVisitasCentro}
                                    rightText={'¿DESEA RECIBIR VISITAS AL CENTRO?'}
                                />
                            </View>
                            )}

                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                            <View>
                                <View style={style.TituloIndicativoView}>
                                    <Text style={style.TituloIndicativoText}> 
                                      CONTACTO DE EMERGENCIA:
                                    </Text>
                                </View>
                                <View style={style.singleInputView}>
                                    <TextInput 
                                        autoCapitalize="characters"
                                        style={style.singleInputText}
                                        placeholder='"NOMBRE Y APELLIDO"'
                                        onChangeText={ (text) => {
                                            this.setState({
                                                contactoSeguridad:text,
                                            })
                                        }}
                                        value= {this.state.contactoSeguridad}
                                    />
                                </View>
                            </View>
                        )}

                        {renderIf(this.state.selectedPerfil === 'USUARIO',
                            <View style={style.singleInputView}>
                                <TextInput 
                                    autoCapitalize="characters"
                                    style={style.singleInputText}
                                    placeholder='"TELEFONO"'
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
                                <TextInput 
                                    autoCapitalize="characters"
                                    style={style.singleInputText}
                                    placeholder='MAIL'
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
                                <View style={style.ActionViewPerfil}>
                                    <ActionButton 
                                        style={style.actionText}
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
                                </View>
                            )}

                        {renderIf(this.props.user,
                            <View style={style.ActionViewPerfil}>
                                <ActionButton 
                                    style={style.actionText} 
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
                            </View>
                        )}

                        {renderIf(this.props.user,
                            <View style={style.ActionViewPerfil}>
                                <ActionButton 
                                    style={style.actionText}
                                    title="BORRAR"
                                    onPress={()=>{
                                                    this.borrarUsuario();
                                                }
                                            }
                                />
                            </View>
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
                this.state.recibirVisitasCentro, this.state.contactoSeguridad, this.state.telefonoContactoSeguridad, 
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
                    this.state.recibirVisitasCentro, this.state.contactoSeguridad, this.state.telefonoContactoSeguridad, 
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

