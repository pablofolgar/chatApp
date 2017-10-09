import firebase from 'firebase';

import {
    Actions,
} from 'react-native-router-flux';

class Backend{
    uid='';
    messageRef=null;
    historyRef=null;
    eventosRef=null;
    usuarioRef=null;
    imageRef  =null;
    catalogoRef=null;
    //initialize Firebase Backend
    constructor(){
        firebase.initializeApp({
            apiKey: "AIzaSyBfr8jnkBOmmgzdjcrGx17gGceFnG3nZUY",
            authDomain: "redterceraedad-531be.firebaseapp.com",
            databaseURL: "https://redterceraedad-531be.firebaseio.com",
            storageBucket: "redterceraedad-531be.appspot.com",
        });
            firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log('Usuario Logueado: '+ user.uid);
                this.setUid(user.uid);
                this.buscarUsuarioLogueado((usuario)=>{
                    console.log('entro por buscarUsuarioLogueado con : ' + usuario._id)
                    this.actualizarFechaUltimoAcceso(usuario);
                       Actions.menu({
                            user:usuario,
                        });
                }   ,user);
            }
        });
    }

    setUid(value){
        this.uid = value;
    }

    getUid(){
        return this.uid;
    }

    signUp(name, pass){
        console.log('signUp name: ' + name)
        firebase.auth().createUserWithEmailAndPassword(name,pass)
        .catch(function(error){
            alert(error.message);
        })
    }

    login(name, pass){
        firebase.auth().signInWithEmailAndPassword(name,pass)
        .catch(function(error) {   
            console.log(error.message);
            alert(error.message);
        })
    }

    logOut(){
        console.log('Logout usuario: '+this.getUid());
        firebase.auth().signOut().then(function() {
            console.log('Logout satisfactorio');
        }).catch(function(error) {
          alert(error.message);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Desde aca se escribe lo referido a los chat
    //Retrieve the message from the backend
    loadMessages(callback,name,contacto){
        this.messageRef = firebase.database().ref('messages');
        this.messageRef.off();
        const onReceive = (data) => {
            const message = data.val();
            //FIltra los mensajes creados por el usuario logueado para el contacto seleccionado
            // o los que son enviados al usuario logueado por el contacto seleccionado
            if(//Si yo mando el mensaje                                 y es para el contacto que seleccione
                (message.user.name.toUpperCase()===name.toUpperCase() && message.para.toUpperCase() === contacto.toUpperCase())
                //O yo recibo el mensaje                            y es del  contacto que seleccione
                || (message.para.toUpperCase()===name.toUpperCase() && message.user.name.toUpperCase() === contacto.toUpperCase())
                ){
                    callback({
                        _id: data.key,
                        text: message.text.toUpperCase(),
                        createdAt: new Date(message.createdAt),
                        user:{
                            _id: message.user._id,
                            name: message.user.name.toUpperCase(),
                        },
                    });
            }
        };
        this.messageRef.limitToLast(20).on('child_added', onReceive);

    }

    //Send message to the backend
    sendMessage(message,para){
        for(let i = 0; i < message.length; i++){
            this.messageRef.push({
                text: message[i].text.toUpperCase(),
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                para:para.toUpperCase()
            });
        }
    }

    //Close the connection to the backend
    closeChat(){
        this.close(this.messageRef);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
   //Desde aca se escribe lo referido a las historias
    loadHistories(callback,categoria){
            this.getHistoryRef();
            this.historyRef.orderByChild("category").equalTo(categoria.toUpperCase()).limitToLast(20).once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                const hist = childSnapshot.val();
                    callback({
                                _id: childSnapshot.key,
                                text: hist.text.toUpperCase(),
                                category: hist.category.toUpperCase(),
                                titulo: hist.titulo.toUpperCase(),
                                createdAt: new Date(hist.createdAt),
                                user:{
                                    _id: hist.user._id,
                                    name: hist.user.name.toUpperCase(),
                                }
                     });
                });
            });
    }

    //Send histories to the backend
    sendHistory(name,categoria,titulo,history){
            this.getHistoryRef();
            this.historyRef.push({
                text: history.toUpperCase(),
                category: categoria.toUpperCase(),
                titulo: titulo.toUpperCase(),
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user:{
                  _id: this.getUid(),
                  name: name.toUpperCase(),
                }
            });
    }

    getHistoryRef(){
        this.historyRef = firebase.database().ref('histories');
    }

    closeHist(){
        this.close(this.historyRef);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Desde aca se escribe lo referido a los eventos
    //Send eventos to the backend
    sendEvento(user,categoria,barrio,fecha,descripcion,centro,hora){
            this.getEventoRef();
            //Agrego el evento en la tabla
            var mensajeAlertaId = this.getRandomInt(0,10000);
            var eventoId = this.eventosRef.push({
                categoria: categoria.toUpperCase(),
                barrio: barrio.toUpperCase(),
                fecha: fecha.toUpperCase(),
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                mensajeAlertaId:mensajeAlertaId,
                descripcion:descripcion.toUpperCase(),
                centro:centro.toUpperCase(),
                hora:hora,
                user:{
                  _id: this.getUid(),
                  name: user.name.toUpperCase(),
                }
            }).key;
            var evento = {
                eventoId: eventoId.toUpperCase(),
                categoria: categoria.toUpperCase(),
                barrio: barrio.toUpperCase(),
                fecha: fecha.toUpperCase(),
                mensajeAlertaId:mensajeAlertaId,
                descripcion:descripcion.toUpperCase(),
                centro:centro.toUpperCase(),
                hora:hora,
                user:{
                      _id: this.getUid(),
                      name: user.name.toUpperCase(),
                    }

            };
            //Agrego el evento como notificacipn para cada usuario
           this.agregarNotificacionParaUsuario(user,evento);
    }

    agregarNotificacionParaUsuario(userCreador,evento){
        //Buscar los usuarios que esten interesados en participar del evento
        this.getUsuarioRef();
        //Busco los usuarios que coincidan con el barrio del evento
        this.usuarioRef.orderByChild("barrio").equalTo(evento.barrio.toUpperCase()).limitToLast(20).once('value',function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                const user = childSnapshot.val();
                const userKey = childSnapshot.key;
                //Busco si el usuario tiene intereses que coincidan con el evento y que no sea el mismo
                if((userCreador.key != userKey) && user.intereses && user.intereses.includes(evento.categoria.toUpperCase())){
                    //Guardar en cada usuario la notificacion en su lista de notificaciones
                    var notificacion={
                        eventoId:evento.eventoId,
                        categoria: evento.categoria,
                        barrio: evento.barrio,
                        fecha: evento.fecha,
                        user: evento.user,
                        mensajeAlertaId:evento.mensajeAlertaId,
                        descripcion:evento.descripcion,
                        centro:evento.centro,
                        hora:evento.hora,
                    };
                    // Get a key for a new Post.
                    var newPostKey = firebase.database().ref('usuario').push().key;
                    
                    var updates = {};
                    updates[userKey+'/notificaciones/'+newPostKey] = notificacion;
                    firebase.database().ref('usuario').update(updates);
                }
            });
        });
    }

    getEventoRef(){
        this.eventosRef = firebase.database().ref('eventos');
    }

    closeEventos(){
        this.close(this.eventosRef);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Desde aca se escribe lo referido a los usuarios
    //Guardar usuarios
    agregarUsuario(userId, name, barrio, centro, interes, selectedPerfil){
        this.getUsuarioRef();
        var intereses = [];
        for(var keyPre in interes){
            intereses.push(interes[keyPre].value);
        }
        this.usuarioRef.push({
                _id: this.getUid(),
                name: name.toUpperCase(),
                intereses:intereses,
                perfil: selectedPerfil,
                barrio: barrio.toUpperCase(),
                centro: centro.toUpperCase(),
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                fechaUltimoAcceso:firebase.database.ServerValue.TIMESTAMP,
        })
        .then(result => {
            this.buscarUsuarioLogueado((usuario)=>{
                           Actions.menu({
                                user:usuario,
                            });
                    } );
        })
        .catch(error => {
            console.log(error);  
        })
    }

    modificarUsuario(user, name, barrio, centro, interes, selectedPerfil){
        this.getUsuarioRef();
        var intereses = [];
        for(var keyPre in interes){
            intereses.push(interes[keyPre].value);
        }
        var usuarioModificado={
            _id: user._id,
            name: name.toUpperCase(),
            intereses:intereses,
            perfil: selectedPerfil,
            barrio: barrio.toUpperCase(),
            centro: centro.toUpperCase(),
            createdAt: user.createdAt,
            fechaUltimoAcceso:user.fechaUltimoAcceso,
        }
        var updates = {};
        updates[user.key+'/'] = usuarioModificado;
        this.usuarioRef.update(updates)
        .then(result => {
            this.buscarUsuarioLogueado((usuario)=>{
                           Actions.menu({
                                user:usuario,
                            });
                    } );
        })
        .catch(error => {
            console.log(error);  
        })
    }


    buscarUsuarioLogueado(callback){//,name){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("_id").equalTo(this.uid).once('value',function(snapshot){
            if(snapshot.hasChildren()){
                snapshot.forEach(function(childSnapshot) {
                const user = childSnapshot.val();
                callback({
                            key:childSnapshot.key,
                            _id: user._id,
                            name:  user.name.toUpperCase(),
                            intereses:  user.intereses,
                            perfil:  user.perfil,
                            barrio:  user.barrio.toUpperCase(),
                            createdAt:  user.createdAt,
                            notificaciones:user.notificaciones,
                            usuarios:user.usuarios,
                            centro:user.centro,
                            fechaUltimoAcceso:user.fechaUltimoAcceso,
                        });
                    });
            }else{
                Actions.perfil({
                            userId:this.uid,
                        });
            }
        });
    }

    actualizarFechaUltimoAcceso(user){
        this.getUsuarioRef();
        var updates = {};
        updates[user.key+'/fechaUltimoAcceso/'] = firebase.database.ServerValue.TIMESTAMP;
        this.usuarioRef.update(updates);
    }

    buscarNotificacionesPorUsuarioLogueado(callback,name){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("name").equalTo(name.toUpperCase()).limitToLast(20).on("child_changed", function(snapshot) {
          var user = snapshot.val();
          callback({
                    notificaciones:user.notificaciones,
                });
        });

    }

    buscarUsuarioPorCentro(callback,centro){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("centro").equalTo(centro.toUpperCase()).limitToLast(20).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var user = childSnapshot.val();
                callback({
                        name:user.name.toUpperCase(),
                        fechaUltimoAcceso:user.fechaUltimoAcceso,
                    });
                }) 
        });
    }

    buscarPerfilUsuarioParaCalificar(callback,user){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("barrio").equalTo(user.barrio.toUpperCase()).limitToLast(20).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var usuario = childSnapshot.val();
                //El usuario que califica no se puede calificar asi mismo, tiene que tener un centro y ser del mismo centro
                //del usuario que puede calificar
                if(user._id  != usuario._id && usuario.centro && user.centro === usuario.centro){
                    callback({
                            key:childSnapshot.key,
                            _id: usuario._id,
                            name:  usuario.name.toUpperCase(),
                            perfil:  usuario.perfil,
                            barrio:  usuario.barrio.toUpperCase(),
                            puntaje: usuario.puntaje,
                        });
                    }//Cierra IF
                })//Cierra foreach
        });
    }

    buscarPerfilVoluntarioParaCalificar(callback,user){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("barrio").equalTo(user.barrio.toUpperCase()).limitToLast(20).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var usuario = childSnapshot.val();
                //El voluntario que califica no se puede calificar a el mismo, tiene que tener un centro y ser del mismo centro
                //del usuario que puede calificar y solo puede calificar a perfiles usuario
                if(user._id  != usuario._id 
                    && usuario.centro && user.centro === usuario.centro
                    && usuario.perfil==='USUARIO'){
                    callback({
                            key:childSnapshot.key,
                            _id: usuario._id,
                            name:  usuario.name.toUpperCase(),
                            perfil:  usuario.perfil,
                            barrio:  usuario.barrio.toUpperCase(),
                            puntaje: usuario.puntaje,
                        });
                    }//Cierra IF
                })//Cierra foreach
        });
    }

    buscarPerfilCentroParaCalificar(callback,user){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("barrio").equalTo(user.barrio.toUpperCase()).limitToLast(20).once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var usuario = childSnapshot.val();
                //El centro que califica no se puede calificar asi mismo y solo puede calificar a USUARIOS o VOLUNTARIOS que pertenezcan
                if(user._id  != usuario._id && usuario.centro && usuario.centro != '' && user.name.toUpperCase()=== usuario.centro){
                    callback({
                            key:childSnapshot.key,
                            _id: usuario._id,
                            name:  usuario.name.toUpperCase(),
                            perfil:  usuario.perfil,
                            barrio:  usuario.barrio.toUpperCase(),
                            puntaje: usuario.puntaje,
                        });
                    }//Cierra IF
                })//Cierra foreach
        });
    }

    guardarValoracion(user, puntaje,opinion){
        this.getUsuarioRef();
        var updates = {};

        //PUNTAJE
        updates[user.key+'/puntaje/'] = puntaje;

        //OPINIONES
        if(opinion && opinion != ''){
            var opinion={
                            opinion:opinion,
                            user: user._id,
                        };
            // Get a key for a new Post.
            var newPostKey = firebase.database().ref('usuario').push().key;
            
            updates[user.key+'/opiniones/'+newPostKey] = opinion;
        }

        this.usuarioRef.update(updates);
    }
    getUsuarioRef(){
        this.usuarioRef = firebase.database().ref('usuario');
    }

    closePerfil(){
        this.close(this.usuarioRef);
    }
    //Desde aca se escribe lo referido al guardado de imagenes en el storage
    getImageRef(){
        this.imageRef = firebase.storage().ref('images');
    }

    cargarCatologo(user, url, empresa, categoria, producto, imageName, medioPago, precio, telefonoProveedor, mailProveedor, 
                      medioEntrega,horarioAtencion){
        // let userNamePath = 'usuario/'+user.key+'/details/url';
        // firebase.database().ref(userNamePath).set(url);
        this.getCatalogoRef();
        this.catalogoRef.push({
            empresa: empresa.toUpperCase(),
            categoria: categoria.toUpperCase(),
            imagenUrl: url,
            imageName: imageName,
            producto: producto.toUpperCase(),
            medioPago:medioPago.toUpperCase(),
            precio: precio, 
            telefonoProveedor: telefonoProveedor, 
            mailProveedor:mailProveedor.toUpperCase(), 
            medioEntrega: medioEntrega.toUpperCase(),
            horarioAtencion: horarioAtencion,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            createdUser: user.key,
        });

    }

    getCatalogosPorCategoria(callback,categoria){
            this.getCatalogoRef();
            this.catalogoRef.orderByChild("categoria").equalTo(categoria.toUpperCase()).limitToLast(20).once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                const cat = childSnapshot.val();
                    callback({
                                key: childSnapshot.key,
                                empresa: cat.empresa.toUpperCase(),
                                categoria: cat.categoria.toUpperCase(),
                                imagenUrl: cat.imagenUrl,
                                producto: cat.producto.toUpperCase(),
                                medioPago:cat.medioPago.toUpperCase(),
                                imageName: cat.imageName,
                                precio: cat.precio, 
                                telefonoProveedor: cat.telefonoProveedor, 
                                mailProveedor:cat.mailProveedor.toUpperCase(), 
                                medioEntrega: cat.medioEntrega.toUpperCase(),
                                horarioAtencion: cat.horarioAtencion,
                                createdAt: new Date(cat.createdAt),
                                createdUser: cat.createdUser,
                                
                     });
                });
            });
    }

    borrarCatalogo(catalogo){
    this.getCatalogoRef();
    this.catalogoRef.child(catalogo.key).remove()
                  .then(()=>{
                      this.getImageRef();
                      this.imageRef.child(catalogo.imageName).delete().then(()=>{
                          console.log('Archivo eliminado correctamente: '+item.imageName);
                      }).catch(function(error) {
                          console.log('Error: '+error);
                      })
                  })
                  .done()
    }

    modificarCatalogo(user, url, empresa, categoria, producto, imageName, medioPago,catalogo, precio, telefonoProveedor, mailProveedor, 
                      medioEntrega,horarioAtencion){
        var imagenUrlAux;
        var empresaAux;
        var categoriaAux;
        var imageNameAux;
        var productoAux;
        var medioPagoAux;
        var precioAux; 
        var telefonoProveedorAux;
        var mailProveedorAux; 
        var medioEntregaAux;
        var horarioAtencionAux;

        if(categoria != catalogo.categoria)
            categoriaAux= categoria.toUpperCase()
        else
            categoriaAux= catalogo.categoria.toUpperCase()
        
        if(empresa != catalogo.empresa)
            empresaAux = empresa.toUpperCase()
        else
            empresaAux = catalogo.empresa.toUpperCase()

        if(imageName!=null)//Si la imageName es null no se cambio la foto del catalogo
            imageNameAux= imageName
        else
            imageNameAux= catalogo.imageName

        if(url!=null)//Si la url es null no se cambio la foto del catalogo
            imagenUrlAux= url
        else
            imagenUrlAux= catalogo.imagenUrl

        if(medioPago != catalogo.medioPago)
            medioPagoAux=medioPago.toUpperCase()
        else
            medioPagoAux=catalogo.medioPago.toUpperCase()

        if(producto != catalogo.producto)
            productoAux= producto.toUpperCase()
        else
            productoAux= catalogo.producto.toUpperCase()

        if(precio != catalogo.precio)
            precioAux= precio
        else
            precioAux= catalogo.precio

        if(telefonoProveedor != catalogo.telefonoProveedor)
            telefonoProveedorAux= telefonoProveedor
        else
            telefonoProveedorAux= catalogo.telefonoProveedor

        if(mailProveedor != catalogo.mailProveedor)
            mailProveedorAux= mailProveedor.toUpperCase()
        else
            mailProveedorAux= catalogo.mailProveedor.toUpperCase()

        if(medioEntrega != catalogo.medioEntrega)
            medioEntregaAux= medioEntrega.toUpperCase()
        else
            medioEntregaAux= catalogo.medioEntrega.toUpperCase()

        if(horarioAtencion != catalogo.horarioAtencion)
            horarioAtencionAux= horarioAtencion
        else
            horarioAtencionAux= catalogo.horarioAtencion

        var catalogoAux={
            categoria:categoriaAux,
            createdAt:firebase.database.ServerValue.TIMESTAMP,
            createdUser:user.key,
            empresa:empresaAux,
            imageName:imageNameAux,
            imagenUrl:imagenUrlAux,
            medioPago:medioPagoAux,
            producto:productoAux,
            precio:precioAux,
            telefonoProveedor:telefonoProveedorAux,
            mailProveedor:mailProveedorAux,
            medioEntrega:medioEntregaAux,
            horarioAtencion:horarioAtencionAux,
        }
                    
        var updates = {};
        updates[catalogo.key+'/'] = catalogoAux;
        this.getCatalogoRef();
        this.catalogoRef.update(updates).then(()=>{
                    if(imageName!=null){//Si la imageName es null no se cambio la foto del catalogo
                          this.getImageRef();
                          this.imageRef.child(catalogo.imageName).delete().then(()=>{
                              console.log('Archivo eliminado correctamente: '+catalogo.imageName);
                          }).catch(function(error) {
                              console.log('Error: '+error);
                          })
                      }
                  })
                  .done();
    }

    getCatalogoRef(){
        this.catalogoRef = firebase.database().ref('catalogo');
    }

    closeCatalogo(){
        this.close(this.catalogoRef);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    close(ref){
        if(this.ref){
            this.ref.off();
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

export default new Backend();