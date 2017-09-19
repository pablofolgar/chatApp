import React, {Component} from 'react';
import ReactNative,{Image} from 'react-native';
const style = require('.././styles.js');
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={style.catalogoView}>
          
          {/*POST*/}
            {/*PRODUCTO*/}
            <View style={style.catalogoInfoView}>
{/*              <View style={style.catalogoTextSubView}>
                <Text style={style.catalogoTextoText}>
                  · PRODUCTO:
                </Text>
              </View>*/}
              <View style={style.catalogoInfoSubView}>
                <Text style={[style.catalogoInfoText,style.catalogoProdInfoText]}>
                  {this.props.item.producto} 
                </Text>
              </View>
            </View>            

            {/*EMPRESA*/}
            <View style={style.catalogoInfoView}>
              <View style={style.catalogoTextSubView}>
                <Text style={style.catalogoTextoText}>
                  ► EMPRESA:
                </Text>
              </View>
              <View style={style.catalogoInfoSubView}>
                <Text style={style.catalogoInfoText}>
                  {this.props.item.empresa}
                </Text>
              </View>
            </View>

            {/*TELEFONO*/}
            <View style={style.catalogoInfoView}>
              <View style={style.catalogoTextSubView}>
                <Text style={style.catalogoTextoText}>
                  ► TELEFONO:
                </Text>
              </View>
              <View style={style.catalogoInfoSubView}>
                <Text style={style.catalogoInfoText}>
                  {this.props.item.telefonoProveedor}
                </Text>
              </View>
            </View>            

          {/*MAIL*/}
            <View style={style.catalogoInfoView}>
              <View style={style.catalogoTextSubView}>
                <Text style={style.catalogoTextoText}>
                  ► MAIL:
                </Text>
              </View>
              <View style={style.catalogoInfoSubView}>
                <Text style={style.catalogoInfoText}>
                  {this.props.item.mailProveedor}
                </Text>
              </View>
            </View>

          {/*HORARIO DE ATENCIÓN*/}
            <View style={style.catalogoInfoView}>
              <View style={style.catalogoTextSubView}>
                <Text style={style.catalogoTextoText}>
                  ► ATENCIÓN:
                </Text>
              </View>
              <View style={style.catalogoInfoSubView}>
                <Text style={style.catalogoInfoText}>
                  {this.props.item.horarioAtencion}
                </Text>
              </View>
            </View>         

          {/*PRECIO*/}
            <View style={style.catalogoInfoView}>
              <View style={style.catalogoTextSubView}>
                <Text style={style.catalogoTextoText}>
                  ► PRECIO:
                </Text>
              </View>
              <View style={style.catalogoInfoSubView}>
                <Text style={style.catalogoInfoText}>
                  ${this.props.item.precio}
                </Text>
              </View>
            </View>


            

          {/*IMAGEN POST*/}
          <Image
	          style={style.imagenCatalogo}
	          source={{uri: this.props.item.imagenUrl}}
        	/>

        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;