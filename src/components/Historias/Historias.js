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

                    <View style={style.ButtonsView}>
                            <Text 
                            style={style.ButtonsText}
                            onPress={() => {
                                Actions.cargarHistoria({
                                    name:this.state.name,
                                });
                            }}>
                                CREAR HISTORIA
                            </Text>
                    </View>

                    <View style={style.ButtonsView}>
                            <Text 
                            style={style.ButtonsText}
                            onPress={() => {
                                Actions.verHistorias({
                                    name:this.state.name,
                                });
                            }}>
                                VER HISTORIAS
                            </Text>
                    </View>

                </View>
            );
        }

 }

 export default Historias;