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

class CargarHistoria extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
            return(
                <View>

                    <TouchableOpacity>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.cargarHistoriaTexto({
                                name:this.state.name,
                            });
                        }}>
                            Cargar Texto
                        </Text>
                    </TouchableOpacity>
                    {/*
                    <TouchableOpacity>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.cargarHistoriaAudio({
                                name:this.state.name,
                            });
                        }}>
                            Cargar Audio
                        </Text>
                    </TouchableOpacity>
                    */}
                </View>
            );
        }

 }

 export default CargarHistoria;