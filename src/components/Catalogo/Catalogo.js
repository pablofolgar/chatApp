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
import renderIf from './../RenderIf';
const style = require('./../styles.js');

export default class Catalogo extends React.Component{
    state={
        user:this.props.user,
        catalogo:this.props.catalogo,
    };

    render(){
            return(
                <View style={style.container}>

                    {renderIf(this.props.user.perfil==='ADMIN', 
                        <View style={style.ButtonsView}>
                                <Text 
                                style={style.ButtonsText}
                                onPress={() => {
                                    Actions.cargarCatalogo({
                                        user:this.state.user,
                                        catalogo: this.state.catalogo,
                                    });
                                }}>
                                    CARGAR CATALOGO
                                </Text>
                        </View>
                    )}

                    <View style={style.ButtonsView}>
                            <Text 
                            style={style.ButtonsText}
                            onPress={() => {
                                Actions.verCatalogo({
                                    user:this.state.user,
                                });
                            }}>
                                VER CATALOGO
                            </Text>
                    </View>

                </View>
            );
        }

 }