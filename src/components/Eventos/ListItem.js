import React, {Component} from 'react';
import ReactNative from 'react-native';
const { 
    View, 
    TouchableHighlight, 
    Text 
  } = ReactNative;
const style = require('./../styles.js');

class ListItem extends Component {

  componentDidMount(){
    console.log('this.props.item.createdAt: ' + this.props.item.createdAt)
  }
  render() {
    return (
       <TouchableHighlight onPress={this.props.onPress}>
        <View>
                    
            <View style={style.GralNotifView}>

              {/*TEXTOS DE LA NOTIFICACION*/}
              <View style={style.BlockDataNotiView}>
                <View style={style.CatNotifView}>
                  <Text style={style.DataNotifText}>
                    **{this.props.item.categoria}** {/*{"\n"}*/}
                  </Text>
                </View>

                <View style={style.DataNotifView}>
                  <Text style={style.DataNotifText}>
                    DESCRIPCION: {this.props.item.descripcion} 
                  </Text>
                </View>

                <View style={style.DataNotifView}>
                  <Text style={style.DataNotifText}>
                    FECHA: {this.props.item.fecha} 
                  </Text>
                </View>

                <View style={style.DataNotifView}>
                  <Text style={style.DataNotifText}>
                    HORA: {this.props.item.hora} 
                  </Text>
                </View>

                <View style={style.DataNotifView}>
                  <Text style={style.DataNotifText}>
                    BARRIO:  {this.props.item.barrio}
                  </Text>
                </View>
                <View style={style.DataNotifView}>
                  <Text style={style.DataNotifText}>
                    CENTRO:  {this.props.item.centro}
                  </Text>
                </View>

              </View>
            </View>
        
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;