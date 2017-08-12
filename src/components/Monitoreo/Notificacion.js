import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {Actions,} from 'react-native-router-flux';
const style = require('.././styles.js');
import Backend from '../../Backend';

export default class Notificacion extends React.Component{

    state={
        user:this.props.user,
        notificaciones:[],
    };

    componentWillUnmount() {
        Backend.closeEventos();
    }

    componentDidMount() {
        Backend.buscarEventoPorBarrio((noti)=>{
                                                for (var i = this.state.user.intereses.length - 1; i >= 0; i--) {
                                                    if(this.state.user.intereses[i]==noti.evento){
                                                        this.setState({
                                                            notificaciones: this.state.notificaciones.concat([noti.evento]),
                                                      });
                                                    }
                                                };
                                            }
                                            ,this.state.user.barrio);
    }


    render(){
            return(
                <View style={style.container}>
                    <Text style={style.storyText}>
                        {this.state.notificaciones.length==0?"NO HAY HISTORIAS":this.state.notificaciones}
                    </Text>
                </View>
            );
        }
}