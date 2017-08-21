import React from 'react';
import { StyleSheet, Text, View,ListView, } from 'react-native';
import {Actions,} from 'react-native-router-flux';
const style = require('.././styles.js');
import Backend from '../../Backend';
import PushController from './PushController';  
import PushNotification from 'react-native-push-notification';
import ListItem from './ListItem';

export default class Notificacion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2}),
            user:this.props.user,
            notificaciones:[],
        };
    }

    componentWillUnmount() {
        Backend.closeEventos();
    }

    componentDidMount() {
        var notificacionesKey=[];
        var items = [];

        Backend.buscarUsuarioLogueado((usuario)=>{
            console.log(0);
            for(var keyPre in usuario.notificaciones){
            //Agrego la notificacion que se  va a mostrar
            console.log('notificaciones pre cargadas: '+ usuario.notificaciones[keyPre].eventoId);
            //Agrego los ids de los eventos que ya revise
            notificacionesKey.push(usuario.notificaciones[keyPre].eventoId);
            items.push({
                        title: usuario.notificaciones[keyPre].categoria,
                        _key: usuario.notificaciones[keyPre].eventoId,
                    });
            }
            this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items)
                      });
        },this.state.user.name);

        
        console.log('1');
        //******************************** PERFIL USUARIO o VOLUNTARIO ******************************************** 
        if(this.state.user.perfil=='usuario' || this.state.user.perfil=='voluntario'){
            console.log('2');
            //Busco las actuales notificaciones asociadas al usuario para ver si hay alguna nueva
            //Con la busqueda se agrega un listener para que notifique las que se agregan nuevas
            Backend.buscarNotificacionesPorUsuarioLogueado((usuario)=>{
                console.log('3');
                var notificacionesActuales = usuario.notificaciones;
                for(var keyAct in notificacionesActuales){
                    console.log('eventoId'+notificacionesActuales[keyAct].eventoId);
                    //La nueva notificacion que se cargo la agrego a la lista que tengo para mostrar
                    //y la agrego al listado de precargadas
                    if(!(notificacionesKey.includes(notificacionesActuales[keyAct].eventoId))){
                        console.log('Push Evento ID: '+notificacionesActuales[keyAct].eventoId);
                        items.push({
                            title: notificacionesActuales[keyAct].categoria,
                            _key: notificacionesActuales[keyAct].eventoId,
                        });
                        //Si no esta hago la notificacion
                        let date = new Date(Date.now());
                        PushNotification.localNotificationSchedule({
                        id: notificacionesActuales[keyAct].mensajeAlertaId,
                        message: "Se agrego el evento "+notificacionesActuales[keyAct].categoria,
                        date,
                        });
                        //Agrego el id del evento al listado de las precargadas
                        notificacionesKey.push(notificacionesActuales[keyAct].eventoId);
                    }else{
                        PushNotification.cancelLocalNotifications({id: notificacionesActuales[keyAct].mensajeAlertaId});
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                  });
            },this.state.user.name);
            console.log('4');
        }
        //******************************** PERFIL CENTRO ********************************************
        else if(this.state.user.perfil=='centro'){

        }
        //******************************** PERFIL ADMINISTRADOR ********************************************
        else if(this.state.user.perfil=='admin'){

        }
         console.log('5');
        
    }


    render(){
            return(
                <View style={style.container}>
                {/* 
                    <Text style={style.storyText}>
                        {this.state.notificaciones.length==0?"NO HAY NOTIFICACIONES":this.state.notificaciones}
                    </Text>
                */}
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                    <PushController />
                </View>
            );
    }

    _renderItem(item) {
        return (
              <ListItem item={item}/>
            );
    }

  //   static append(currentMessages = [], messages) {
  //   if (!Array.isArray(messages)) {
  //     messages = [messages];
  //   }
  //   return messages.concat(currentMessages);
  // }
}