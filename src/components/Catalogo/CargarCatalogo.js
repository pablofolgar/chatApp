import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

const style = require('./../styles.js');

export default class CargarCatalogo extends React.Component{
    state={
        user:this.props.user,
    };

    render(){
            return(
                <View style={style.container}>


                    <View style={style.ButtonsView}>
                            <Text style={style.ButtonsText}
                            onPress={() => {
                                Actions.cargarHistoriaTexto({
                                    user:this.state.user,
                                });
                            }}>
                                ESCRIBIR HISTORIA
                            </Text>
                    </View>
                </View>
            );
        }

 }