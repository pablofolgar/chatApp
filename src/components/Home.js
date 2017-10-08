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



const style = require('./styles.js');


class Home extends React.Component{
    constructor(){
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    state={
        name:'',
        user:'',
        pass:'',
        response:'',
    };

    render(){
        return(
           
             // <Image source={require('./imagenes/difuminado1.jpg')} style={style.backgroundImage}>
            <ScrollView style={style.container} >

                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={700} >

                    <View>

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

                     {/*     BORRAR             */}

							<View>
                                <ActionButton 
                                    title="LOGOUT"
                                    onPress={() => {
                                        
                                            Backend.logOut();
                                        }
                                    }/>
                
                            </View>
                        {/*     BORRAR             */}

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
                                        }else{
                                            Backend.signUp(this.state.name,this.state.pass);
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
                                        }else{
                                            Backend.login(this.state.name,this.state.pass);
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