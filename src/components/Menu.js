import React from 'react';
import {ScrollView, FlatList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import ActionButton from  './ActionButton';
import Backend from '../Backend';

const style = require('./styles.js');
class Menu extends React.Component{
    
    state={
        user:this.props.user,
    };

    render(){
        return(
            <ScrollView style={style.container}>
                <FlatList

                    data={[
                    {key: 'CATÁLOGO'},
                    {key: 'CHAT'},
                    {key: 'HISTORIAS'},
                    {key: 'EVENTOS'},
                    {key: 'PERFIL'},
                    {key: 'NOTIFICACIONES'},
                    {key: 'VALORACIÓN'},
                    ]}

                    renderItem={
                        ({item}) =>
                        <View style={style.ButtonsView}>
                            <Text style={style.ButtonsText}
                            onPress={() =>{
                                switch(item.key){
                                     case 'CHAT':
                                        Actions.contacto({user:this.state.user,});
                                        break;
                                    case 'HISTORIAS':
                                        Actions.historias({user:this.state.user,});
                                        break;
                                    case 'NOTIFICACIONES':
                                        Actions.notificacion({user:this.state.user,});
                                        break;
                                    case 'EVENTOS':
                                        Actions.evento({user:this.state.user,});
                                        break;
                                    case 'PERFIL':
                                        Actions.perfil({user:this.state.user,});
                                        break;
                                    case 'CATÁLOGO':
                                        Actions.catalogo({user:this.state.user,catalogo:null});
                                        break; 
                                    case 'VALORACIÓN':
                                        Actions.verUsuarioValoracion({user:this.state.user,});
                                        break;  

                                    default:
                                        alert("El menu "+item.key+" no esta disponible");
                                    }
                                }}
                                >
                                {item.key}
                            </Text>
                        </View>

                        
                    }
                />
                        <View style={style.ActionViewLogout}>
                            <ActionButton
                                style={style.actionText} 
                                title="CERRAR SESIÓN"
                                onPress={() => {
                                        Backend.logOut();
                                    }
                                }/>
                        </View>

            </ScrollView>
        );
    }
}

export default Menu;