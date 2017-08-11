import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

const style = require('./styles.js');

class Comunicacion extends React.Component{
    state={
        name:this.props.name,
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
                                        Actions.contacto({name:this.state.name,});
                                        break;
                                    case 'HISTORIAS':
                                        Actions.historias({name:this.state.name,});
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
