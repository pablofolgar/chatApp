import React from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    ScrollView,
    ListView,
     Alert,
} from 'react-native';
import Backend from '../../Backend';
import ActionButton from  '../ActionButton';
const style = require('./../styles.js');
import ListItem from './ListItem';
import {
    Actions,
} from 'react-native-router-flux';
import renderIf from './../RenderIf';

export default class VerEventos extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                user: this.props.user,
                eventoId: this.props.eventoId,
                usuarioNotificado: this.props.usuarioNotificado,
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2}),
            };
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    componentWillMount() {

      }


    render(){

        return(
            <ScrollView  style={style.container}> 
                    {renderIf(this.state.dataSource.getRowCount() > 0, 
                        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} enableEmptySections={true}/>
                    )}
                
                    {renderIf(this.state.dataSource.getRowCount() === 0 && this.state.eventoId && this.state.usuarioNotificado, 
                        <View>
                            <View style={style.eliminadoView}>
                                <Text style={style.eliminadoText} >
                                    EL EVENTO QUE QUIERE VISUALIZAR FUE ELIMINADO :(
                                </Text>
                            </View>
                            <View style={style.ActionView}>
                            <ActionButton title="VOLVER"
                                style={style.actionText}
                                onPress={() => {
                                                 Backend.borrarNotificacion(this.state.eventoId, this.state.usuarioNotificado);   
                                                }

                                        }
                              />
                          </View> 
                        </View> 
                        
                    )}
            </ScrollView>
        );
    }


    componentDidMount(){
        var items = [];
        if(this.state.user){
            Backend.getEventosCreadosPorUsuario((evento)=>{
                    items.push({
                                eventoId: evento.eventoId,
                                categoria: evento.categoria.toUpperCase(),
                                barrio: evento.barrio.toUpperCase(),
                                fecha: evento.fecha,
                                mensajeAlertaId: evento.mensajeAlertaId,
                                descripcion: evento.descripcion.toUpperCase(),
                                centro: evento.centro.toUpperCase(),
                                hora: evento.hora,
                                user: evento.user,
                                createdAt:evento.createdAt,
                            });
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                      });
            },this.state.user._id);
        }else if(this.props.eventoId){
             Backend.getEventoPorId((evento)=>{
                    items.push({
                                eventoId: evento.eventoId,
                                categoria: evento.categoria.toUpperCase(),
                                barrio: evento.barrio.toUpperCase(),
                                fecha: evento.fecha,
                                mensajeAlertaId: evento.mensajeAlertaId,
                                descripcion: evento.descripcion.toUpperCase(),
                                centro: evento.centro.toUpperCase(),
                                hora: evento.hora,
                                user: evento.user,
                                createdAt:evento.createdAt,
                            });
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                      });
            },this.props.eventoId);
        }
    }

    componentWillUnMount(){
        Backend.closeEventos();
    }

    _renderItem(item) {
        const onPress = () => {
            if(this.state.user){
                  Alert.alert(
                    'PARA EDITAR  SU EVENTO APRIETE "EDITAR"',
                    null,
                    [
                      {text: 'EDITAR', onPress: (text) => {
                                                            console.log('Editar'); 
                                                            this.setState({
                                                                            dataSource: this.state.dataSource.cloneWithRows([]),
                                                                        });
                                                            Actions.crearEvento({evento:item, user:this.state.user}); 
                                                        }
                        },
                      {text: 'CANCELAR', onPress: (text) => console.log('Cancel')}
                    ],
                    'default'
                  );
            }
        };
        return (
                <ListItem item={item} onPress={onPress}  enableEmptySections={true}/>
            );
    }

}