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


/*var Fondo = require('./imagenes/huellas1.jpg');*/

const style = require('./styles.js');

class Home extends React.Component{
    state={
        name:'',
    };

    render(){
        return(
           
                /*<Image source={require('./imagenes/difuminado1.jpg')} style={style.backgroundImage}>*/
                    <ScrollView style={style.container}>
                        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} >

                            <TextInput style={style.nameInput}
                            placeholder='USUARIO'
                            onChangeText={ (text) => {
                                this.setState({
                                    name:text,
                                })
                            }}
                            value= {this.state.name}
                            />

                            <ActionButton title="Ingresar"
                                onPress={() => {
                                    if(this.state.name===''){
                                        Alert.alert(
                                          'Campo obligartorio',
                                          'Debe ingresar el nombre para comenzar',
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
                       
                        </KeyboardAvoidingView>
                    </ScrollView>
                /*</Image>*/
           
        );
    }
}

export default Home;