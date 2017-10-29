import React from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    ListView,
    ScrollView,
     } from 'react-native';
import {Actions,} from 'react-native-router-flux';
const style = require('.././styles.js');
import Backend from '../../Backend';
import PushController from './PushController';  
import PushNotification from 'react-native-push-notification';
import ListItem from './ListItem';
import renderIf from './../RenderIf';

export default class Notificacion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2}),
            user:this.props.user,
            notificaciones:[],
        };
        this._rendering = this._renderItem.bind(this);
    }

    componentWillUnmount() {
        Backend.closeEventos();
    }

    componentDidMount() {
        var notificacionesKey=[];
        var items = [];

        //******************************** PERFIL USUARIO o VOLUNTARIO ******************************************** 
            if(this.state.user.perfil.toUpperCase()=='USUARIO' || this.state.user.perfil.toUpperCase()=='VOLUNTARIO'){
            Backend.buscarUsuarioLogueado((usuario)=>{
                for(var keyPre in usuario.notificaciones){
                //Agrego los ids de los eventos que ya revise
                notificacionesKey.push(usuario.notificaciones[keyPre].eventoId);
                //Agrego la notificacion que se  va a mostrar
                items.push({
                            categoria: usuario.notificaciones[keyPre].categoria,
                            _key: usuario.notificaciones[keyPre].eventoId,
                            fecha: usuario.notificaciones[keyPre].fecha,
                            barrio: usuario.notificaciones[keyPre].barrio,
                            hora:usuario.notificaciones[keyPre].hora,
                            centro:usuario.notificaciones[keyPre].centro,
                            descripcion:usuario.notificaciones[keyPre].descripcion,
                            perfilCentro:false,
                            userId: usuario.notificaciones[keyPre].userId,
                        });
                }
                this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(items)
                          });
            });
            //Busco las actuales notificaciones asociadas al usuario para ver si hay alguna nueva
            //Con la busqueda se agrega un listener para que notifique las que se agregan nuevas
            Backend.buscarNotificacionesPorUsuarioLogueado((usuario)=>{
                var notificacionesActuales = usuario.notificaciones;
                for(var keyAct in notificacionesActuales){
                    //La nueva notificacion que se cargo la agrego a la lista que tengo para mostrar
                    //y la agrego al listado de precargadas
                    if(!(notificacionesKey.includes(notificacionesActuales[keyAct].eventoId))){
                        items.push({
                            categoria: notificacionesActuales[keyAct].categoria,
                            _key: notificacionesActuales[keyAct].eventoId,
                            fecha: notificacionesActuales[keyAct].fecha,
                            barrio: notificacionesActuales[keyAct].barrio,
                            hora:usuario.notificaciones[keyAct].hora,
                            centro:usuario.notificaciones[keyAct].centro,
                            descripcion:usuario.notificaciones[keyAct].descripcion,
                            perfilCentro:false,
                            userId: usuario.notificaciones[keyAct].userId,
                        });
                        //Si no esta hago la notificacion
                        let date = new Date(Date.now());
                        PushNotification.localNotificationSchedule({
                        id: notificacionesActuales[keyAct].mensajeAlertaId,
                        message: "SE AGREGÓ EL EVENTO "+notificacionesActuales[keyAct].categoria,
                        date,
                        });
                        //Agrego el id del evento al listado de las precargadas
                        notificacionesKey.push(notificacionesActuales[keyAct].eventoId);
                    }else{
                        //Elimino del pull de notificaciones emergentes aquellas que ya fueron avisadas
                        PushNotification.cancelLocalNotifications({id: notificacionesActuales[keyAct].mensajeAlertaId});
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                  });
            },this.state.user.name);
        }
        //******************************** PERFIL CENTRO ********************************************
        else if(this.state.user.perfil.toUpperCase()=='CENTRO'){
                Backend.buscarUsuarioPorCentro((user)=>{
                    // var diasDeDiferencia = this.timeDifference(this.state.user.usuarios[key].fechaUltimoAcceso,Backend.getFechaServidor());
                    var diasDeDiferencia = this.timeDifference(new Date(),user.fechaUltimoAcceso);
                    if(diasDeDiferencia>=10){
                        items.push({
                            name: user.name,
                            diasDeAusencia:diasDeDiferencia,
                            perfilCentro:true,
                        });
                    this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(items)
                            });
                    }
                    
                },this.state.user.name.toUpperCase());
        }
        //******************************** PERFIL ADMINISTRADOR ********************************************
        else if(this.state.user.perfil.toUpperCase()=='ADMIN'){

        }
        
    }


    render(){
            return(
                <ScrollView  style={style.container}> 
                    
                    <ListView dataSource={this.state.dataSource} renderRow={this._rendering} enableEmptySections={true}/>
                    <PushController />
                

                {/* SI NO HAY NOTIFICACIONES 
                    <Text style={style.storyText}>
                        {this.state.notificaciones.length==0?"NO HAY NOTIFICACIONES":this.state.notificaciones}
                    </Text>
                */}

                </ScrollView>
            );
    }

    _renderItem(item) {
        const onPress = () => {
                    Actions.verEventos({
                                    eventoId:item._key,
                                    usuarioNotificado: this.state.user,
                                });
                };
        return (
              <ListItem item={item} onPress={onPress}/>
            );
    }

    timeDifference(date1,date2) {
        var difference = date1.getTime() - date2;
        return daysDifference = Math.floor(difference/1000/60/60/24);
    }
}