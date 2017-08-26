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

import ActionButton from  '../ActionButton';
import Backend from '../../Backend';

const style = require('../styles.js');


export default class CrearPerfil extends React.Component{
    constructor(){
        super();

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

                            <View>
                                <ActionButton 
                                    title="AGREGAR"
                                    onPress={()=>{
                                                    Backend.agregarUsuario(this.props.user);
                                                    //Backend.agregarCentro();
                                                    // Backend.agregarAdmin();
                                                }
                                            }
                                />
                
                            </View>
                    </View>


                </KeyboardAvoidingView>
            
            </ScrollView>
        //</Image>
           
        );
    }
}

