import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Picker,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

import ActionButton from  '../ActionButton';
const style = require('./../styles.js');

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob';
import Backend from '../../Backend';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;  
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    console.log('uri '+ uri)
    return new Promise((resolve,reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        Backend.getImageRef();
        const imageRef = Backend.imageRef.child(imageName)
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: '${mime};BASE64'})
            })
            .then((blob)=>{
                uploadBlob = blob
                return imageRef.put(blob,{contentType:mime})
            })
            .then(()=>{
                uploadBlob.close();
                return imageRef.getDownloadURL()
            })
            .then((url)=>{
                resolve(url)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

export default class CargarCatalogo extends React.Component{
    state={
        user:this.props.user,
        selectedCategoria: ' ',
        categorias: ['SELECCIONAR CATEGORÍA','SALUD Y BIENESTAR', 'COSMETICA', 'LIBROS', 'ROPA', 'SERVICIOS PERSONALIZADOS','OTROS'],
        selectedMedioPago: ' ',
        medioPago: ['SELECCIONAR MEDIO DE PAGO','EFECTIVO', 'TARJETA', 'MERCADO PAGO', 'OTRO'],
        avatarSource: null,
        videoSource: null,
        path: null,
        empressa: null,
        producto:null,
        imageTimeStamp:null,
    };

    render(){
        let categoryItems = this.state.categorias.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        let medioPagotems = this.state.medioPago.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });

        return(
            <View style={style.container}>

                <Text>EMPRESA</Text>
                <TextInput 
                  style={style.singleInputText}
                  placeholder='"EMPRESA"'
                  onChangeText={ (text) => {
                      this.setState({
                          empresa:text,
                      })
                  }}
                  value= {this.state.empresa}
                />    

                <Text>CATEGORIA</Text>
                <Picker
                    selectedValue={this.state.selectedCategoria}
                    onValueChange={ (category) => {this.setState({selectedCategoria:category});} }
                    mode="dialog">
                    {categoryItems}
                </Picker>

                <Text>PRODUCTO</Text>
                <TextInput 
                  style={style.singleInputText}
                  placeholder='"PRODUCTO"'
                  onChangeText={ (text) => {
                      this.setState({
                          producto:text,
                      })
                  }}
                  value= {this.state.producto}
                />   
            {/*
                <Text>PRECIO</Text>
                <TextInput></TextInput>

                <Text>TELEFONO PROVEEDOR</Text>
                <TextInput></TextInput>

                <Text>MAIL PROVEEDOR</Text>
                <TextInput></TextInput>

            */}
                <Text>IMAGEN</Text>
                <View style={style.container}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                      <View style={[style.avatar, style.avatarContainer, {marginBottom: 20}]}>
                      { this.state.avatarSource === null ? <Text>Seleccione una foto</Text> :
                        <Image style={style.avatar} source={this.state.avatarSource} />
                      }
                      </View>
                    </TouchableOpacity>
                </View>

                <Text>MEDIOS DE PAGO</Text>
                 <Picker
                    selectedValue={this.state.medioPagotems}
                    onValueChange={ (category) => {this.setState({medioPagotems:category});} }
                    mode="dialog">
                    {medioPagotems}
                </Picker>
{/*
                <Text>MEDIO DE ENTREGA</Text>
                <TextInput></TextInput>

                <Text>HORARIO ATENCION</Text>
                <TextInput></TextInput>
 */}
                <ActionButton title="CREAR"
                                onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                                                 if(camposRequeridosOk){
                                                      this.crearCatologo();
                                                  }
                                                }
                                          }
                />
                
            </View>
        );
    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };

        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
              avatarSource: source,
              path: response.path,
              imageTimeStamp: response.timestamp,
            });
          }
        });
      }

      crearCatologo(){
        Alert.alert(
        'PARA CREAR DEFINITIVAMENTE SU CATALOGO APRIETE "AGREGAR"',
        null,
        [
          {text: 'VOLVER', onPress: (t) => console.log('Cancel')},
          {
            text: 'AGREGAR',
            onPress: (t) => {
              this.state.avatarSource ? 
                uploadImage(this.state.path, this.state.empresa+'_'+this.state.producto+'_'+this.state.imageTimeStamp+'.jpg')
                .then((responseData)=> {
                    Backend.cargarCatologo(this.state.user,responseData,this.state.empresa,
                      this.state.selectedCategoria, this.state.producto)
                })
                .then(()=>{
                    this.limpiarCampos();
                })
                .done()
              : null
            }
          },
        ],
        'plain-text'
        );      
      }

      validarCamposRequeridos(){
        var result = true;
        if(!this.state.path ||
            !this.state.empresa ||
            !this.state.producto ||
            !this.state.imageTimeStamp||
            !this.state.user ||
            !this.state.selectedCategoria){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }
        return result;
    }

    limpiarCampos(){
        this.setState({selectedMedioPago:'SELECCIONAR MEDIO DE PAGO',selectedCategoria:'SELECCIONAR CATEGORÍA',empresa:null,producto:null,
                      avatarSource:  null,path: null,imageTimeStamp: null,})
    }
 }