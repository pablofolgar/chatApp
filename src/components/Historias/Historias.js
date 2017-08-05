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

class Historias extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
            return(
                <View>

                    <TouchableOpacity>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.cargarHistoria({
                                name:this.state.name,
                            });
                        }}>
                            Cargar Historia
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.verHistorias({
                                name:this.state.name,
                            });
                        }}>
                            Ver Historias
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

 }

 export default Historias;