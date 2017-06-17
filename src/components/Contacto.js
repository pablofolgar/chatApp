import React from 'react';

import {
    Actions,
} from 'react-native-router-flux';

import {SectionList, StyleSheet, Text, View} from 'react-native';
const style = require('./styles.js');

class Contacto extends React.Component{
    state={
        name:'',
    };

    render(){
            return(
                <View style={style.container}>
                    <SectionList
                      sections={[
                          {title: 'C', data: ['Carla']},
                          {title: 'G', data: [' ','Gabriel']},
                          {title: 'M', data: [' ',' ','Matias']},
                          {title: 'P', data: [' ',' ',' ','Pablo','Paula']},
                      ]}
                      renderItem={
                        ({item}) => <Text style={style.item} onPress={() => {
                                                                                     Actions.chat({
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

export default Contacto;
