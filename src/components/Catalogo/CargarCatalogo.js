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
        console.log('uploadUri '+ uploadUri)
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
        medioPago: ['SELECCIONAR CATEGORÍA','EFECTIVO', 'TARJETA', 'MERCADO PAGO', 'OTRO'],
        avatarSource: null,
        videoSource: null,
        path: null,
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
                <TextInput></TextInput>

                <Text>CATEGORIA</Text>
                <Picker
                    selectedValue={this.state.selectedCategoria}
                    onValueChange={ (category) => {this.setState({selectedCategoria:category});} }
                    mode="dialog">
                    {categoryItems}
                </Picker>

                <Text>PRODUCTO</Text>
                <TextInput></TextInput>
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
                      { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                        <Image style={style.avatar} source={this.state.avatarSource} />
                      }
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                      <View style={[style.avatar, style.avatarContainer]}>
                        <Text>Select a Video</Text>
                      </View>
                    </TouchableOpacity>

                    { this.state.videoSource &&
                      <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
                    }
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
                                onPress={() => {
                                                console.log('Subiendo imagen');
                                                this.state.avatarSource ? 
                                                    uploadImage(this.state.path, this.state.user.name+'.jpg')
                                                    .then((responseData)=> {
                                                        Backend.setImageUrl(this.state.user,responseData)
                                                    })
                                                    .done()
                                                : null
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
            });
          }
        });
      }

    selectVideoTapped() {
        const options = {
          title: 'Video Picker',
          takePhotoButtonTitle: 'Take Video...',
          mediaType: 'video',
          videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled video picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            this.setState({
              videoSource: response.uri
            });
          }
        });
    }

 }