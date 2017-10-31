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
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

import ActionButton from  '../ActionButton';
const style = require('./../styles.js');

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob';
import Backend from '../../Backend';
import renderIf from './../RenderIf';
import Validaciones from './../Validaciones.js';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;  
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
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

  constructor(props) {
        super(props);
        this.state = {
            user:this.props.user,
            selectedCategoria: this.props.catalogo? this.props.catalogo.categoria : ' ',
            categorias: ['SELECCIONAR CATEGORÍA','SALUD Y BIENESTAR', 'COSMETICA', 'LIBROS', 'ROPA', 'SERVICIOS PERSONALIZADOS','OTROS'],
            selectedMedioPago: this.props.catalogo ? this.props.catalogo.medioPago : ' ',
            medioPago: ['MEDIOS DE PAGO','EFECTIVO', 'TARJETA', 'MERCADO PAGO', 'OTRO', 'VARIOS'],
            avatarSource: this.props.catalogo ? { uri: this.props.catalogo.imagenUrl } : null,
            path: null,
            empresa: this.props.catalogo ? this.props.catalogo.empresa : '',
            producto: this.props.catalogo ? this.props.catalogo.producto : '',
            imageTimeStamp:null,
            precio: this.props.catalogo ? this.props.catalogo.precio : '',
            telefonoProveedor: this.props.catalogo ? this.props.catalogo.telefonoProveedor : '',
            mailProveedor: this.props.catalogo ? this.props.catalogo.mailProveedor : '',
            selectedMedioEntrega: this.props.catalogo ? this.props.catalogo.medioEntrega : ' ',
            medioEntrega: ['MEDIOS DE ENTREGA','ENTREGA EN CAPITAL', 'ENTREGA EN TODO EL PAIS', 'RETIRO EN DOMICILIO', 'OTRO'],
            selectedHorario: this.props.catalogo ? this.props.catalogo.horarioAtencion : '',
            horario: ['SELECCIONAR HORARIO','9 a 12', '12 a 15', '15 a 18'],
            };
    }

    
    render(){
        let categoryItems = this.state.categorias.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        let medioPagoItems = this.state.medioPago.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        let medioEntregaItems = this.state.medioEntrega.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        let horarioItems = this.state.horario.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });

        return(
            <ScrollView  style={style.container}> 
              <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} >
                  
              {/*EMPRESA*/}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    EMPRESA
                  </Text>
                </View>
                {/*INPUT EMPRESA*/}
                <View style={style.singleInputView}>
                  <TextInput style={style.singleInputText}
                    autoCapitalize="characters"
                    placeholder='"EMPRESA"'
                    onChangeText={ (text) => {
                        this.setState({
                            empresa:text,
                        })
                    }}
                    value= {this.state.empresa}
                  />    
                </View>

              {/*CATEGORÍA*/}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    CATEGORÍA
                  </Text>
                </View>
                {/*PICKER CATEGORÍA*/}
                <View style={style.viewPicker}>
                  <Picker
                      selectedValue={this.state.selectedCategoria}
                      onValueChange={ (category) => {this.setState({selectedCategoria:category});} }
                      mode="dialog">
                      {categoryItems}
                  </Picker>
                </View>

              {/*PRODUCTO*/}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    PRODUCTO
                  </Text>
                </View>
                {/*INPUT PRODUCTO*/}
                <View style={style.singleInputView}>
                  <TextInput style={style.singleInputText}
                    autoCapitalize="characters"
                    placeholder='"PRODUCTO"'
                    onChangeText={ (text) => {
                        this.setState({
                            producto:text,
                        })
                    }}
                    value= {this.state.producto}
                  />   
                </View>

              {/*PRECIO*/}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    PRECIO
                  </Text>
                </View>

                {/*INPUT PRECIO*/}
                <View style={style.singleInputView}>
                <TextInput style={style.singleInputText}
                  autoCapitalize="characters"
                  placeholder='"PRECIO"'
                  onChangeText={ (text) => {
                      this.setState({
                          precio:text,
                      })
                  }}
                  value= {this.state.precio}
                />   
                </View>

              {/*TELEFONO PROVEEDOR*/}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    TELEFONO PROVEEDOR
                  </Text>
                </View>

                {/*INPUT TELEFONO PROVEEDOR*/}
                <View style={style.singleInputView}>
                  <TextInput style={style.singleInputText}
                    autoCapitalize="characters"
                    placeholder='"TELEFONO PROVEEDOR"'
                    onChangeText={ (text) => {
                        this.setState({
                            telefonoProveedor:text,
                        })
                    }}
                    value= {this.state.telefonoProveedor}
                  />   
                </View>

              {/*MAIL PROVEEDOR*/}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    MAIL PROVEEDOR
                  </Text>
                </View>

                {/*INPUT MAIL PROVEEDOR*/}
                <View style={style.singleInputView}>
                  <TextInput style={style.singleInputText}
                    autoCapitalize="characters"
                    placeholder='"MAIL PROVEEDOR"'
                    onChangeText={ (text) => {
                        this.setState({
                            mailProveedor:text,
                        })
                    }}
                    value= {this.state.mailProveedor}
                  />   
                </View>

              {/* IMAGEN */}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    IMAGEN
                  </Text>
                </View>

                {/* SELECCIÓN DE IMAGEN */}
                <View style={style.avatarView}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[style.avatar, style.avatarContainer, {marginBottom: 20}]}>
                      {this.state.avatarSource === null ? 
                        <View>
                          <Text style={[style.TituloIndicativoText, {alignSelf:'center'}]} >CARGAR</Text>
                          <Text style={[style.TituloIndicativoText, {alignSelf:'center'}]} >IMAGEN</Text> 
                        </View>
                        :
                        <Image style={style.avatar} source={this.state.avatarSource} />
                      }
                    </View>
                  </TouchableOpacity>
                </View>

              {/* MEDIOS DE PAGO */}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    MEDIOS DE PAGO
                  </Text>
                </View>

                {/*PICKER MEDIO DE PAGO*/}
                <View style={style.viewPicker}>
                  <Picker
                    selectedValue={this.state.selectedMedioPago}
                    onValueChange={ (medioPago) => {this.setState({selectedMedioPago:medioPago});} }
                    mode="dialog">
                    {medioPagoItems}
                  </Picker>
                </View>

              {/* MEDIOS DE ENTREGA */}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    MEDIOS DE ENTREGA
                  </Text>
                </View>

                {/*PICKER MEDIO DE ENTREGA*/}
                <View style={style.viewPicker}>
                 <Picker
                    selectedValue={this.state.selectedMedioEntrega}
                    onValueChange={ (medioEntrega) => {this.setState({selectedMedioEntrega:medioEntrega});} }
                    mode="dialog">
                    {medioEntregaItems}
                  </Picker>
                </View>

              {/* HORARIO ATENCION */}
                <View style={style.TituloIndicativoView}>
                  <Text style={style.TituloIndicativoText}> 
                    HORARIO ATENCION
                  </Text>
                </View>


                {/*PICKER HORARIO ATENCION*/}
                <View style={style.viewPicker}>
                  <Picker
                      selectedValue={this.state.selectedHorario}
                      onValueChange={ (horario) => {this.setState({selectedHorario:horario});} }
                      mode="dialog">
                      {horarioItems}
                  </Picker>
                </View>

                {renderIf(!this.props.catalogo, 
                  <View style={style.ActionView}>
                    <ActionButton 
                      title="CREAR"
                      style={style.actionText}
                      onPress={() => {var camposRequeridosOk=this.validarCamposRequeridos();
                             if(camposRequeridosOk){
                                  this.crearCatologo();
                              }
                            }
                      }
                    />
                </View>
                  )}

                {renderIf(this.props.catalogo,
                  <View style={style.ActionView}>
                    <ActionButton 
                      title="MODIFICAR"
                      style={style.actionText}
                      onPress={() => {
                        Alert.alert(
                        'PARA MODIFICAR DEFINITIVAMENTE SU CATALOGO APRIETE "MODIFICAR"',
                        null,
                        [
                          {text: 'VOLVER',  onPress: (t) => console.log('Cancel')},
                          {text: 'MODIFICAR', onPress: (t) => {
                                                              var camposRequeridosOk=this.validarCamposRequeridos();
                                                              if(camposRequeridosOk){
                                                                this.modificarCatalogo();
                                                                Actions.verCatalogo({
                                                                      user:this.state.user,
                                                                  });
                                                              }
                                                          }
                          }
                        ],
                        'plain-text'
                        );
                        }
                      }
                    />
                  </View>
                )}

                {renderIf(this.props.catalogo,
                  <View style={style.ActionView}>
                    <ActionButton 
                      title="BORRAR"
                      style={style.actionText}
                      onPress={() => {
                          Alert.alert(
                          'PARA BORRAR DEFINITIVAMENTE SU CATALOGO APRIETE "BORRAR"',
                          null,
                          [
                            {text: 'VOLVER',  onPress: (t) => console.log('Cancel')},
                            {text: 'BORRAR', onPress: (t) => {
                                          Backend.borrarCatalogo(this.props.catalogo);
                                          Actions.verCatalogo({
                                                user:this.state.user,
                                            });
                                      }
                                    }
                                  ],
                                  'plain-text'
                                  );
                          }
                      }
                    />
                  </View>
                )}
              </KeyboardAvoidingView>
            </ScrollView>
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
                      this.state.selectedCategoria, 
                      this.state.producto,this.state.empresa+'_'+this.state.producto+'_'+this.state.imageTimeStamp+'.jpg',//Nombre de la foto subida
                      this.state.selectedMedioPago, this.state.precio, this.state.telefonoProveedor, this.state.mailProveedor, 
                      this.state.selectedMedioEntrega,this.state.selectedHorario)
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

      modificarCatalogo(){
        console.log(this.state.mailProveedor);
        if(this.state.avatarSource){
          if(this.state.path){
            //Si tiene seteada la variable path significa que cambio la imagen, entonces tengo que subirla y modificar el catalogo
            uploadImage(this.state.path, this.state.empresa+'_'+this.state.producto+'_'+this.state.imageTimeStamp+'.jpg')
            .then((responseData)=> {
                Backend.modificarCatalogo(this.state.user,responseData,this.state.empresa,
                  this.state.selectedCategoria, 
                  this.state.producto,this.state.empresa+'_'+this.state.producto+'_'+this.state.imageTimeStamp+'.jpg',//Nombre de la foto subida
                  this.state.selectedMedioPago,this.props.catalogo, this.state.precio, this.state.telefonoProveedor, this.state.mailProveedor, 
                      this.state.selectedMedioEntrega,this.state.selectedHorario)
            })
            .done()
          }else{
            //Si no cambio la imagen solo modifico el resto de los campos
            //para este caso no voy a tener ni la imagen ni el nombre de la imagen para pasar como parametro
            Backend.modificarCatalogo(this.state.user,null,this.state.empresa,
                    this.state.selectedCategoria, 
                    this.state.producto,null,//Nombre de la foto subida
                    this.state.selectedMedioPago,this.props.catalogo, this.state.precio, this.state.telefonoProveedor, this.state.mailProveedor, 
                      this.state.selectedMedioEntrega,this.state.selectedHorario)
          }
        }
      }

      validarCamposRequeridos(){
        var result = true;
        if(
            !this.state.empresa ||
            !this.state.producto ||
            !this.state.user ||
            !this.state.selectedCategoria||
            !this.state.selectedMedioPago||
            !this.state.precio||
            !this.state.telefonoProveedor||
            !this.state.mailProveedor||
            !this.state.selectedMedioEntrega||
            !this.state.selectedHorario){
            alert("DEBE COMPLETAR TODOS LOS CAMPOS");
            result = false;
        }else{
            result = this.validarTiposDeDatos();
        }
        return result;
    }

    validarTiposDeDatos(){
      var result = true;
      if(!Validaciones.validateEmail(this.state.mailProveedor)){
        alert("EL CAMPO MAIL PROVEEDOR ES INVALIDO");
         return false;
      }
      if(!Validaciones.validarDigitos(this.state.precio)){
        alert("EL CAMPO PRECIO ES INVALIDO");
         return false;
      }
      if(!Validaciones.validarLetras(this.state.empresa)){
        alert("EL CAMPO EMPRESA ES INVALIDO");
         return false;
      }
      if(!Validaciones.validarLetras(this.state.producto)){
        alert("EL CAMPO PRODUCTO ES INVALIDO");
         return false;
      }
      if(!Validaciones.validarTelefono(this.state.telefonoProveedor)){
        alert("EL CAMPO TELEFONO PROVEEDOR ES INVALIDO");
         return false;
      }
      return result;
    }

    limpiarCampos(){
        this.setState({selectedMedioPago:'SELECCIONAR MEDIO DE PAGO',selectedCategoria:'SELECCIONAR CATEGORÍA',empresa:null,producto:null,
                      avatarSource:  null,path: null,imageTimeStamp: null,precio:null, telefonoProveedor:null, mailProveedor:null,
                      selectedMedioEntrega:'SELECCIONAR MEDIO DE ENTREGA', selectedHorario:'SELECCIONAR HORARIO'})
    }

    
 }