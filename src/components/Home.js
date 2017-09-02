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
    ActivityIndicator,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

import ActionButton from  './ActionButton';
import Backend from '../Backend';


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
        spinner:false,
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

                         <View >
                            <ActivityIndicator 
                                animating={this.state.spinner}
                                size={50}
                                color='black'
                            />
                         </View>

                        <View>
                            <View  style={style.singleInputView}>
                                <TextInput 
                                style={style.singleInputText}
                                autoCapitalize="characters"
                                placeholder='INGRESE SU USUARIO'
                                onChangeText={ (text) => {
                                    this.setState({
                                        name:text,
                                    })
                                }}
                                value= {this.state.name}
                                />
                            </View>

                            <View>
                                <ActionButton 
                                    title="ENTRAR"
                                    onPress={() => {
                                        if(this.state.name===''){
                                            Alert.alert(
                                              'CAMPO OBLIGATORIO',
                                              'DEBE INGRESAR SU USUARIO PARA COMENZAR.',
                                              [
                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                              ],
                                              { cancelable: false }
                                            )
                                        }else{
                                            this.cargarDatosUsuarioLogueado();
                                            this.setState({spinner:true});
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

    cargarDatosUsuarioLogueado(){
        Backend.buscarUsuarioLogueado((usuario)=>{
            Backend.actualizarFechaUltimoAcceso(usuario);
            // if(usuario._id){
                Actions.menu({
                                user:usuario,
                                // name:usuario.name
                            });
            // }else{
            //     return Alert.alert(
            //       'USUARIO INEXISTENTE',
            //       'EL USUARIO NO EXISTE EN EL SISTEMA',
            //       [
            //         {text: 'OK', onPress: () => console.log('OK Pressed')},
            //       ],
            //       { cancelable: false }
            //     )
            // }
        },this.state.name);
    }

    
}

export default Home;