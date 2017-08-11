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


const style = require('./styles.js');


class Home extends React.Component{
    state={
        name:'',
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

                        <View>
                            <View  style={style.singleInputView}>
                                <TextInput style={style.singleInputText}
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
                                            Actions.menu({
                                                name:this.state.name,
                                            });
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