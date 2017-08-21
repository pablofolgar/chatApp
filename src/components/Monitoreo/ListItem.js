import React, {Component} from 'react';
import ReactNative from 'react-native';
const { View, TouchableHighlight, Text } = ReactNative;
import renderIf from './RenderIf';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View>
          {renderIf(!this.props.item.perfilCentro, 
                    <Text>
                      Categoria: {this.props.item.categoria} - Fecha: {this.props.item.fecha} - Lugar: {this.props.item.barrio}
                    </Text>
                )}
                
                {renderIf(this.props.item.perfilCentro,
                   <Text>
                      El usuario {this.props.item.name} no se conecta desde hace {this.props.item.diasDeAusencia} dias
                  </Text>
            )}
          
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;