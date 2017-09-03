import React from 'react';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Picker,
  ListView,
  ScrollView,
  Alert,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Backend from '../../Backend';
import ListItem from './ListItem';
const style = require('.././styles.js');
import {
    Actions,
} from 'react-native-router-flux';

export default class Valorar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2}),
    };
    // this._rendering = this._renderItem.bind(this);
  }

  componentDidMount(){
    var items = [];
    //El perfil USUARIO califica a VOLUNTARIOS
    if(this.state.user.perfil=='USUARIO'){
      Backend.buscarPerfilUsuarioParaCalificar((usuario)=>{
          items.push({
                    user:usuario,
                  });
          this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(items)
                    });
          }
        ,this.state.user);
    }
    //El perfil de VOLUNTARIO califica a USUARIO
    else if(this.state.user.perfil=='VOLUNTARIO'){
      Backend.buscarPerfilVoluntarioParaCalificar((usuario)=>{
          items.push({
                    user:usuario,
                  });
          this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(items)
                    });
          }
        ,this.state.user);
    }
    //El perfil de CENTRO califica a USUARIOS  o VOLUNTARIOS
    else if(this.state.user.perfil=='CENTRO'){
      Backend.buscarPerfilCentroParaCalificar((usuario)=>{
          items.push({
                    user:usuario,
                  });
          this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(items)
                    });
          }
        ,this.state.user);
    }
  }

  render() {
    return(
                <ScrollView  style={style.container}> 
                    
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} enableEmptySections={true}/>

                </ScrollView>
            );
  }


  _renderItem(item) {
        const onPress = () => {
                  Alert.alert(
                    'PARA EDITAR DEFINITIVAMENTE SU CATALOGO APRIETE "EDITAR"',
                    null,
                    [
                      {text: 'EDITAR', onPress: (text) => {
                                                            console.log('Editar'); 
                                                            this.setState({
                                                                            dataSource: this.state.dataSource.cloneWithRows([]),
                                                                        });
                                                            Actions.valorar({userValorar:item,user:this.state.user,}); 
                                                        }
                        },
                      {text: 'CANCELAR', onPress: (text) => console.log('Cancel')}
                    ],
                    'default'
                  );
                };
        return (
              <ListItem item={item} onPress={onPress}/>
            );
    }
}