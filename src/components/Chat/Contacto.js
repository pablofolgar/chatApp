import React from 'react';

import {
    Actions,
} from 'react-native-router-flux';

import {ListView, StyleSheet, Text, View,ScrollView,} from 'react-native';
const style = require('./../styles.js');
import Backend from '../../Backend';
import ListItem from './ListItem';

export default class Contacto extends React.Component{

	constructor(props){
		super(props);
	    this.state={
	        user:this.props.user,
	        dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2}),
	    };
	}

	componentDidMount(){
		var items = [];
		Backend.buscarContactosParaChat((contacto) => {
			if(contacto){
				items.push({
                    		name:contacto.name,
                    		_id: contacto._id,
                    		perfil: contacto.perfil,
                  });
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(items)
					});
				}
		},this.state.user);
	}

    render(){
             return(
                <ScrollView  style={style.container}> 
                    
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} enableEmptySections={true}/>

                </ScrollView>
            );
	}

	_renderItem(item) {
        const onPress = () => {
                	Actions.chat({user:this.state.user,contacto:item});
                };
        return (
              <ListItem item={item} onPress={onPress}/>
            );
    }
}
