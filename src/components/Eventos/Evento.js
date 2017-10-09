import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

const style = require('./../styles.js');

export default  class Evento extends React.Component{
    state={
        user:this.props.user,
    };

    render(){
            return(
                <View style={style.container}>

                    <View style={style.ButtonsView}>
                            <Text 
                            style={style.ButtonsText}
                            onPress={() => {
                                Actions.crearEvento({
                                    user:this.state.user,
                                });
                            }}>
                                CREAR EVENTO
                            </Text>
                    </View>

                    <View style={style.ButtonsView}>
                            <Text 
                            style={style.ButtonsText}
                            onPress={() => {
                                Actions.verEventos({
                                    user:this.state.user,
                                });
                            }}>
                                VER EVENTOS
                            </Text>
                    </View>

                </View>
            );
        }

 }
