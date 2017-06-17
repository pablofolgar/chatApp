import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

const style = require('./styles.js');
class Menu extends React.Component{
    state={
        name:'',
    };

    render(){
        return(
            <View style={style.container}>
                <SectionList
                  sections={[
                      {title: 'C', data: ['Catalogo','Chat']},
                      {title: 'E', data: [' ',' ','Eventos']},
                      {title: 'P', data: [' ',' ',' ','Perfil']},
                  ]}
                  renderItem={
                    ({item}) => <Text style={style.item} onPress={() => {
                                                                                 Actions.contacto({
                                                                                     name:this.state.name,
                                                                                 });
                                                                             }}>{item}</Text>
                  }
                  renderSectionHeader={({section}) => <Text style={style.sectionHeader}>{section.title}</Text>}
                />
             </View>
        );
    }
}

export default Menu;