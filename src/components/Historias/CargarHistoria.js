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

class CargarHistoria extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
            return(
                <View style={style.container}>


                    <View style={style.ButtonsView}>
                            <Text style={style.ButtonsText}
                            onPress={() => {
                                Actions.cargarHistoriaTexto({
                                    name:this.state.name,
                                });
                            }}>
                                ESCRIBIR HISTORIA
                            </Text>
                    </View>
                    {/*
                    <View style={style.ButtonsView}>
                        <Text style={style.ButtonsText}
                        onPress={() => {
                            Actions.cargarHistoriaAudio({
                                name:this.state.name,
                            });
                        }}>
                            Cargar Audio
                        </Text>
                    </View>
                    */}
                </View>
            );
        }

 }

 export default CargarHistoria;