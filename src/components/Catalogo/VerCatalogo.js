import React from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    ScrollView,
    ListView,
} from 'react-native';
import Backend from '../../Backend';
import ActionButton from  '../ActionButton';
const style = require('./../styles.js');
import ListItem from './ListItem';

export default class VerCatalogo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                user:this.props.user,
                selectedCategoria: ' ',
                categorias: ['SELECCIONAR CATEGORÍA','SALUD Y BIENESTAR', 'COSMETICA', 'LIBROS', 'ROPA', 'SERVICIOS PERSONALIZADOS','OTROS'],
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2}),
            };
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }


    render(){
      
        let categoryItems = this.state.categorias.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        // let medioPagotems = this.state.medioPago.map( (s, i) => {
        //         return <Picker.Item key={i} value={s} label={s} />
        //     });

        return(
            <View style={style.container}>

                <View style={style.viewPicker}>
                <Picker
                    selectedValue={this.state.selectedCategoria}
                    onValueChange={ (category) => {this.setState({selectedCategoria:category});this.getCatalogoPorCategoria(category)} }
                    mode="dialog">
                    {categoryItems}
                </Picker>
                </View>


                <View style={style.storyView}>
                    <ScrollView>
                       <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                    </ScrollView>
                </View>

            </View>
        );
    }

    _renderItem(item) {
        return (
              <ListItem item={item} />
            );
    }


    componentDidMount(){
    }

    getCatalogoPorCategoria(category) {
        var items = [];
        Backend.getCatalogosPorCategoria((cat) => {
            items.push({
                key: cat.key,
                empresa: cat.empresa.toUpperCase(),
                categoria: cat.categoria.toUpperCase(),
                imagenUrl: cat.imagenUrl,
                producto: cat.producto.toUpperCase(),
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