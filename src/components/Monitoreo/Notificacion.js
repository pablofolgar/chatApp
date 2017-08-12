import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {Actions,} from 'react-native-router-flux';
const style = require('.././styles.js');
import Backend from '../../Backend';
import PushController from './PushController';  
import PushNotification from 'react-native-push-notification';

export default class Notificacion extends React.Component{

    state={
        user:this.props.user,
        notificaciones:[],
    };

    componentWillUnmount() {
        Backend.closeEventos();
    }

    componentDidMount() {
        if(this.state.user.perfil=='usuario'){
            // Backend.buscarEventoPorBarrio((noti)=>{
            //                                         for (var i = this.state.user.intereses.length - 1; i >= 0; i--) {
            //                                             if(this.state.user.intereses[i]==noti.evento){
            //                                                 this.setState({
            //                                                     notificaciones: this.state.notificaciones.concat([noti.evento]),
            //                                               });
            //                                             }
            //                                         };
            //                                     }
            //                                     ,this.state.user.barrio);
            Backend.buscarEventoPorBarrio((noti)=>{
                                                    for (var i = this.state.user.intereses.length - 1; i >= 0; i--) {
                                                        if(this.state.user.intereses[i]==noti.evento &&
                                                            this.state.user.barrio == noti.barrio){
                                                            this.setState({
                                                                notificaciones: this.state.notificaciones.concat([noti.evento]),
                                                          });
                                                        let date = new Date(Date.now());
                                                          PushNotification.localNotificationSchedule({
                                                            message: "Se agregó el evento"+ noti.evento,
                                                            date,
                                                          });
                                                        }
                                                    };
                                                }
                                                );
        }else if(this.state.user.perfil=='centro'){

        }
    }


    render(){
            return(
                <View style={style.container}>
                    <Text style={style.storyText}>
                        {this.state.notificaciones.length==0?"NO HAY NOTIFICACIONES":this.state.notificaciones}
                    </Text>
                    <PushController />
                </View>
            );
        }
}