import React from 'react';
import {ScrollView, FlatList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

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
                    {key: 'COMUNICACIÓN'},
                    {key: 'EVENTOS'},
                    {key: 'PERFIL'},
                    {key: 'NOTIFICACIONES'},
                    ]}

                    renderItem={
                        ({item}) =>
                        <View style={style.ButtonsView}>
                            <Text style={style.ButtonsText}
                            onPress={() =>{
                                switch(item.key){
                                    case 'COMUNICACIÓN':
                                        Actions.comunicacion({user:this.state.user,});
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
            </ScrollView>
        );
    }
}

export default Menu;