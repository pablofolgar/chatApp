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
            resolve(user);
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
        })
        .catch(error => {
            this.setState({visible:!this.state.visible});
            console.log('usuario no autenticado en la base')
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

                    <View>
                        <View style={{ flex: 1 }}>
                            <Spinner visible={this.state.visible} textContent={"Estamos cargando sus datos..."} textStyle={{color: '#FFF'}} />
                        </View>

                        <View>

                            <View>
                                <Text style={style.tituloInicio}>
                                    HUELLAS {'\n'} EN RED
                                </Text>
                            </View>

                            <View style={style.logoImageView}>
                                <Image source={require('./imagenes/huellas2.jpg')} style={style.logoImage}/>
                            </View>

                         </View>


						<View>
                            <ActionButton 
                                title="LOGOUT"
                                onPress={() => {
                                        Backend.logOut();
                                    }
                                }/>
            
                        </View>

                        <View>
                            <ActionButton 
                                title="RECUPERAR CONTRASEÑA"
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

                        <View>
                            <View  style={style.singleInputView}>
                                <TextInput style={style.singleInputText}
                                placeholder='INGRESE SU MAIL'
                                onChangeText={ (text) => {
                                    this.setState({
                                        name:text,
                                    })
                                }}
                                value= {this.state.name}
                                />
                            </View>
                            <View  style={style.singleInputView}>
                                <TextInput style={style.singleInputText}
                                secureTextEntry={true}
                                placeholder='INGRESE SU PASSWORD'
                                onChangeText={ (text) => {
                                    this.setState({
                                        pass:text,
                                    })
                                }}
                                value= {this.state.pass}
                                />
                            </View>

                            <View>
                                <ActionButton 
                                    title="REGISTRARSE"
                                    onPress={() => {
                                        if(this.state.name==='' || this.state.pass ===''){
                                            Alert.alert(
                                              'CAMPO OBLIGATORIO',
                                              'DEBE INGRESAR EL MAIL Y EL PASSWORD PARA COMENZAR.',
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
                                                  alert('Se envio un email a '+ user.email +' .Verifique su identidad y vuelva a ingresar ')
                                                }).catch(function(error) {
                                                  console.log('Error enciando mail de confirmacion')
                                                });
                                            })
                                            .catch(error => {
                                                this.setState({visible:!this.state.visible,});
                                                alert('La dirección de mail esta siendo usada por otra cuenta');
                                            })
                                        }
                                    }}/>
                
                            </View>

                            <View>
                                <ActionButton 
                                    title="INGRESAR"
                                    onPress={() => {
                                        if(this.state.name==='' || this.state.pass ===''){
                                            Alert.alert(
                                              'CAMPO OBLIGATORIO',
                                              'DEBE INGRESAR EL MAIL Y EL PASSWORD PARA COMENZAR.',
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
                                                alert('La cuenta no existe o la contraseña es inválida');
                                            })
                                        }
                                    }}/>
                
                            </View>
                        </View>
                    </View>


                </KeyboardAvoidingView>
            
            </ScrollView>
        //</Image>
           
        );
    }
}

export default Home;