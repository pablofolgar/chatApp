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
        user:this.props.user,
    };

    render(){
            return(
                <View style={style.container}>

                    <View style={style.ButtonsView}>
                            <Text 
                            style={style.ButtonsText}
                            onPress={() => {
                                Actions.cargarHistoriaTexto({
                                    user:this.state.user,
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
                                    user:this.state.user,
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