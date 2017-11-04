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
import renderIf from './../RenderIf';
import {
    Actions,
} from 'react-native-router-flux';

export default class VerCatalogo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                user:this.props.user,
                selectedCategoria: ' ',
                categorias: ['SELECCIONAR RUBRO','SALUD Y BIENESTAR', 'COSMETICA', 'LIBROS', 'ROPA', 'SERVICIOS PERSONALIZADOS','OTROS'],
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2}),
            };
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        console.disableYellowBox = true;
    }


    render(){
      
        let categoryItems = this.state.categorias.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        // let medioPagotems = this.state.medioPago.map( (s, i) => {
        //         return <Picker.Item key={i} value={s} label={s} />
        //     });

        return(
            <ScrollView style={style.container}>

                <View style={style.viewPicker}>
                <Picker
                    selectedValue={this.state.selectedCategoria}
                    onValueChange={ (category) => {this.setState({selectedCategoria:category});this.getCatalogoPorCategoria(category)} }
                    mode="dialog">
                    {categoryItems}
                </Picker>
                </View>


                
                <View>
                    {renderIf(this.props.user.perfil==='ADMIN', 
                        <ListView dataSource={this.state.dataSource} renderRow={this._renderItemAdmin.bind(this)} enableEmptySections={true}/>
                    )}
                    {renderIf(this.props.user.perfil!='ADMIN', 
                        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} enableEmptySections={true}/>
                    )}
                </View>

             


            </ScrollView>
        );
    }

    _renderItemAdmin(item) {
        const onPress = () => {
                  Alert.alert(
                    'PARA EDITAR DEFINITIVAMENTE SU CATALOGO APRIETE "EDITAR"',
                    null,
                    [
                      {text: 'EDITAR', onPress: (text) => {
                                                            console.log('Editar'); 
                                                            this.setState({
                                                                            selectedCategoria:'SELECCIONAR RUBRO',
                                                                            dataSource: this.state.dataSource.cloneWithRows([]),
                                                                        });
                                                            Actions.cargarCatalogo({catalogo:item, user:this.state.user}); 
                                                        }
                        },
                      // {text: 'BORRAR', onPress: (text) => { 
                                                            // Backend.getCatalogoRef();
                                                            // Backend.catalogoRef.child(item.key).remove()
                                                            // .then(()=>{
                                                            //     Backend.getImageRef();
                                                                
                                                            //     Backend.imageRef.child(item.imageName).delete().then(()=>{
                                                            //         console.log('Archivo eliminado correctamente: '+item.imageName);
                                                            //     }).catch(function(error) {
                                                            //         console.log('Error: '+error);
                                                            //     })
                                                            // })
                                                            // .done()
                                                            // }
                      //   },
                      {text: 'CANCELAR', onPress: (text) => console.log('Cancel')}
                    ],
                    'default'
                  );
                };
        return (
              <ListItem item={item} onPress={onPress}/>
            );
    }

    _renderItem(item) {
        return (
              <ListItem item={item}/>
            );
    }

    componentDidMount(){
    }

    getCatalogoPorCategoria(category) {
        var items = [];
        this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items)
                      });
        Backend.getCatalogosPorCategoria((cat) => {
            items.push({
                key: cat.key,
                empresa: cat.empresa.toUpperCase(),
                categoria: cat.categoria.toUpperCase(),
                imagenUrl: cat.imagenUrl,
                imageName: cat.imageName,
                producto: cat.producto.toUpperCase(),
                medioPago: cat.medioPago.toUpperCase(),
                precio: cat.precio, 
                telefonoProveedor: cat.telefonoProveedor, 
                mailProveedor:cat.mailProveedor.toUpperCase(), 
                medioEntrega: cat.medioEntrega.toUpperCase(),
                horarioAtencion: cat.horarioAtencion,
            });
             this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items)
                      });
        }, category);
    }


    componentWillUnMount(){
        Backend.closeCatalogo();
    }
}