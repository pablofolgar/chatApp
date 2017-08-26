import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

const style = require('./styles.js');

class Comunicacion extends React.Component{
    state={
        user:this.props.user,
    };

    render(){
            return(
                <View style={style.container}>
                    <FlatList

                        data={[
                        {key: 'CHAT'},
                        {key: 'HISTORIAS'},
                        ]}

                        renderItem={
                            ({item}) =>
                            <View style={style.ButtonsView} >
                                <Text style={style.ButtonsText}
                                onPress={() =>{
                                switch(item.key){
                                    case 'CHAT':
                                        Actions.contacto({user:this.state.user,});
                                        break;
                                    case 'HISTORIAS':
                                        Actions.historias({user:this.state.user,});
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
                 </View>
            );
        }
}

export default Comunicacion;
