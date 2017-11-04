import React from 'react';

import {
    Actions,
} from 'react-native-router-flux';

import {ListView, StyleSheet, Text, View} from 'react-native';
const style = require('./styles.js');
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
	    console.disableYellowBox = true;
	}

	componentDidMount(){
		 alert(this.state.user.name)
		Backend.buscarContactosParaChat((contacto) => {
			if(contacto){
				var items = [];
				items.push({
                    contacto:contacto,
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
