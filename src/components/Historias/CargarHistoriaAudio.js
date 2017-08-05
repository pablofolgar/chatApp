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

class CargarHistoriaAudio extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
            return(
                <View>
                    <Text style={style.title} >
                    <Text> Nombre </Text> {this.state.name }
                </Text>

                </View>
            );
        }

 }

 export default CargarHistoriaAudio;