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
                <View style={style.container}>

                    <TouchableOpacity style={style.touchableItem}>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.cargarHistoria({
                                name:this.state.name,
                            });
                        }}>
                            HACER UNA HISTORIA
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.touchableItem}>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.verHistorias({
                                name:this.state.name,
                            });
                        }}>
                            VER HISTORIAS
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

 }

 export default Historias;