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
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

import ActionButton from  './ActionButton';
import Backend from '../Backend';
import * as firebase from 'firebase';
import Validaciones from './Validaciones.js';
import Spinner from 'react-native-loading-spinner-overlay';

const style = require('./styles.js');

const autenticacion = () => {
    return new Promise((resolve,reject) => {
        firebase.auth().onAuthStateChanged((user) => {
             if(user){
                resolve(user);
             }else{
                reject(null);
             }

        })
    })
}

const login = (name, pass) => {
    return new Promise((resolve,reject) => {
        firebase.auth().signInWithEmailAndPassword(name,pass)
        .then((user)=>{
            if(user &&  user.emailVerified){
                resolve(user);
            }else {
                reject();
            }
        })
        .catch(error => {   
            console.log(error.message);
            reject(error);
        })
    })
}

const signUp = (name, pass) => {
    return new Promise((resolve,reject) => {
        firebase.auth().createUserWithEmailAndPassword(name,pass)
        .then((user)=>{
            resolve(user);
        })
        .catch(error => {   
            console.log(error.message);
            reject(error);
        })
    })
}

class Home extends React.Component{
    constructor(props){
        super();

        this.state={
            name:'',
            user:'',
            pass:'',
            response:'',
            visible:true,
        };
        autenticacion()
        .then((user)=>{
            if(user &&  user.emailVerified){
                console.log('Usuario autenticado por firebase: '+ user.uid);
                Backend.setUid(user.uid);
                Backend.buscarUsuarioLogueado((usuario)=>{
                    if(usuario){
                        console.log('entro por buscarUsuarioLogueado con : ' + usuario._id);
                        Backend.actualizarFechaUltimoAcceso(usuario);
                        this.setState({visible:!this.state.visible});
                        Actions.menu({
                            user:usuario,
                        });
                    }else{
                        console.log('El usuario autenticado no esta creado en la tabla USERS');
                        this.setState({visible:!this.state.visible});
                        Actions.perfil({
                            userId:this.uid,
                        });
                    }
                });
            }else {
                console.log('usuario autenticado por firebase pero sin verificacion de email')
                this.setState({visible:!this.state.visible});
            }
        })
        .catch(error => {
            this.setState({visible:!this.state.visible});
            console.log('usuario no autenticado por firebase')
        })
        
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    render(){
        return(
           
             // <Image source={require('./imagenes/difuminado1.jpg')} style={style.backgroundImage}>
            <ScrollView style={style.container} >

                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={700} >

                    {/* TODO */}
                    <View>

                        {/* --------SPINNER--------- */}
                        <View style={{ flex: 1 }}>
                            <Spinner visible={this.state.visible} textContent={"Estamos cargando sus datos..."} textStyle={{color: '#FFF'}} />
                        </View>

                        {/*-----BLOQUE TITULO E IMAGEN ----*/}
                        <View style={style.BloqueTituloImagen}>

                            <View style={style.HomeTitleView} >
                                <Text style={style.HomeTitleText}>
                                    HUELLAS {'\n'} EN RED
                                </Text>
                            </View>

                            <View style={style.logoImageView}>
                                <Image source={require('./imagenes/huellas2.jpg')} style={style.logoImage}/>
                            </View>

                         </View>

                        {/*-----BLOQUE INGRESO Y BOTONES-------*/}
                        <View >

                            {/*  -MAIL- */}
                            <View  style={style.singleInputView}>
                                <TextInput style={style.singleInputText}
                                    autoCapitalize="characters"
                                    placeholder='INGRESE MAIL'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            name:text,
                                        })
                                    }}
                                    value= {this.state.name}
                                />
                            </View>

                            {/*  -PASSWORD-  */}
                            <View  style={style.singleInputView}>
                                <TextInput style={style.singleInputText}
                                autoCapitalize="characters"
                                secureTextEntry={true}
                                placeholder='INGRESE CLAVE'
                                onChangeText={ (text) => {
                                    this.setState({
                                        pass:text,
                                    })
                                }}
                                value= {this.state.pass}
                                />
                            </View>


                            {/*  -BOTON INGRESAR-  */}
                            <View style={style.ActionView}>

                                <ActionButton 
                                    title="INGRESAR"
                                    style={style.actionText}
                                    onPress={() => {
                                        if(this.state.name==='' || this.state.pass ===''){
                                            Alert.alert(
                                              'CAMPO OBLIGATORIO',
                                              'DEBE INGRESAR EL MAIL Y LA CONTRASEÑA PARA COMENZAR.',
                                              [
                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                              ],
                                              { cancelable: false }
                                            )
                                        }else if(!Validaciones.validateEmail(this.state.name)){
                                            Alert.alert(
                                              'CAMPO INVÁLIDO',
                                              'EL MAIL INGRESADO NO POSEE UN FORMATO VÁLIDO ',
                                              [
                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                              ],
                                              { cancelable: false }
                                            )
                                        }else{
                                            this.setState({visible:!this.state.visible,});
                                            login(this.state.name,this.state.pass)
                                            .then((user)=>{
                                                console.log('Login de usuario: ' + user.uid)
                                                 Backend.setUid(user.uid);
                                                    Backend.buscarUsuarioLogueado((usuario)=>{
                                                        if(usuario){
                                                            console.log('entro por buscarUsuarioLogueado con : ' + usuario._id);
                                                            Backend.actualizarFechaUltimoAcceso(usuario);
                                                            this.setState({visible:!this.state.visible});
                                                            Actions.menu({
                                                                user:usuario,
                                                            });
                                                        }else{
                                                            console.log('El usuario autenticado no esta creado en la tabla USERS');
                                                            this.setState({visible:!this.state.visible});
                                                            Actions.perfil({
                                                                userId:this.uid,
                                                            });
                                                        }
                                                    });
                                            })
                                            .catch(error => {
                                                this.setState({visible:!this.state.visible,});
                                                Alert.alert(
                                                  'IMPORTANTE',
                                                  'La cuenta no existe o la contraseña es inválida',
                                                  [
                                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                  ],
                                                  { cancelable: false }
                                                )
                                            })
                                        }
                                    }}/>
                
                            </View>

                            {/*BLOQUE FINAL DE OPCIONES: REGISTRO Y RECUPERAR CLAVE*/}
                            <View style={style.BloqueSubIngreso}>

                                {/*  -BOTON REGISTRARSE-  */}
                                <View style={style.ButtonRegistrese}>
                                    
                                    <ActionButton 
                                        title="REGISTRARSE"
                                        style={style.TextoRegistrese}
                                        onPress={() => {
                                            if(this.state.name==='' || this.state.pass ===''){
                                                Alert.alert(
                                                  'CAMPO OBLIGATORIO',
                                                  'DEBE INGRESAR EL MAIL Y LA CONTRASEÑA PARA COMENZAR.',
                                                  [
                                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                  ],
                                                  { cancelable: false }
                                                )
                                            }else if(!Validaciones.validateEmail(this.state.name)){
                                                Alert.alert(
                                                  'CAMPO INVÁLIDO',
                                                  'EL MAIL INGRESADO NO POSEE UN FORMATO VÁLIDO ',
                                                  [
                                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                  ],
                                                  { cancelable: false }
                                                )
                                            }else{
                                                this.setState({visible:!this.state.visible,});
                                                signUp(this.state.name,this.state.pass)
                                                .then((user)=>{
                                                    console.log('Login de usuario creado: ' + user.uid)
                                                    Backend.setUid(user.uid);
                                                    this.setState({visible:!this.state.visible});
                                                    user.sendEmailVerification().then(function() {
                                                        Alert.alert(
                                                          'IMPORTANTE',
                                                          'Se envio un email a '+ user.email +' .Verifique su identidad y vuelva a ingresar',
                                                          [
                                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                          ],
                                                          { cancelable: false }
                                                        )
                                                    }).catch(function(error) {
                                                      console.log('Error enciando mail de confirmacion')
                                                    });
                                                })
                                                .catch(error => {
                                                    this.setState({visible:!this.state.visible,});
                                                    Alert.alert(
                                                          'IMPORTANTE',
                                                          'La dirección de mail esta siendo usada por otra cuenta',
                                                          [
                                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                          ],
                                                          { cancelable: false }
                                                        )
                                                })
                                            }
                                        }}/>
                    
                                </View>

                                {/*SEPARACIÓN*/}
                                <View style={style.Separador}>
                                    <Text style={style.TextoSeparador}>
                                        |
                                    </Text>
                                </View>
                               

                                {/*  -BOTON LOGOUT-  ¿NO DEBERÏA ESTAR EN MENÚ?*/}
                                {/*  <View>
                                    <ActionButton
                                        title="CERRAR SESIÓN"
                                        onPress={() => {
                                                Backend.logOut();
                                            }
                                        }/>
                    
                                </View>*/}

                                {/*  -BOTON RECUPERAR CONTRASEÑA-  */}
                                <View style={style.ButtonContrasena}>
                                    <ActionButton 
                                        title="RECUPERAR CLAVE"
                                        style={style.TextoContrasena}
                                        onPress={() => {

                                                if(this.state.name===''){
                                                    Alert.alert(
                                                      'CAMPO OBLIGATORIO',
                                                      'DEBE INGRESAR EL MAIL PARA RECUPERAR LA CONTRASEÑA.',
                                                      [
                                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                      ],
                                                      { cancelable: false }
                                                    )
                                                }else if(!Validaciones.validateEmail(this.state.name)){
                                                    Alert.alert(
                                                      'CAMPO INVÁLIDO',
                                                      'EL MAIL INGRESADO NO POSEE UN FORMATO VÁLIDO ',
                                                      [
                                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                      ],
                                                      { cancelable: false }
                                                    )
                                                }else{
                                                    Backend.recuperarContrasenia(this.state.name);
                                                }
                                            }
                                        }/>
                    
                                </View>

                            </View>                        
                        </View> 
                        {/*FIN BLOQUE INGRESO Y BOTONES*/}

                    </View> 
                    {/*FIN TODO*/}

                </KeyboardAvoidingView>
            
            </ScrollView>
        //</Image>
           
        );
    }
}

export default Home;