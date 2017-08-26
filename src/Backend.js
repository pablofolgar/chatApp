import firebase from 'firebase';

class Backend{
    uid='';
    messageRef=null;
    historyRef=null;
    eventosRef=null;
    usuarioRef=null;
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
                this.setUid(user.uid);
            }else{
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message);
                });
            }

        });
    }

    setUid(value){
        this.uid = value;
    }

    getUid(){
        return this.uid;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Desde aca se escribe lo referido a los chat
    //Retrieve the message from the backend
    loadMessages(callback){
        this.messageRef = firebase.database().ref('messages');
        this.messageRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text.toUpperCase(),
                createdAt: new Date(message.createdAt),
                user:{
                    _id: message.user._id,
                    name: message.user.name.toUpperCase(),
                },
            });
        };
        this.messageRef.limitToLast(20).on('child_added', onReceive);

    }

    //Send message to the backend
    sendMessage(message){
        for(let i = 0; i < message.length; i++){
            this.messageRef.push({
                text: message[i].text.toUpperCase(),
                user: message[i].user.toUpperCase(),
                createdAt: firebase.database.ServerValue.TIMESTAMP,
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
    sendEvento(user,categoria,barrio,fecha){
            this.getEventoRef();
            //Agrego el evento en la tabla
            var mensajeAlertaId = this.getRandomInt(0,10000);
            var eventoId = this.eventosRef.push({
                categoria: categoria.toUpperCase(),
                barrio: barrio.toUpperCase(),
                fecha: fecha.toUpperCase(),
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                mensajeAlertaId:mensajeAlertaId,
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
                user:{
                      _id: this.getUid(),
                      name: user.name.toUpperCase(),
                    }

            };
            //Agrego el evento como notificacipn para cada usuario
           this.agregarNotificacionParaUsuario(user,evento);
    }

    //     buscarEventoPorBarrio(callback){
    //     this.getEventoRef();
    //     this.eventosRef.off();
    //     const onReceive = (data) => {
    //         const evento = data.val();
    //         callback({
    //                 evento: evento.evento,
    //                 barrio: evento.barrio,
    //                 fecha: evento.fecha,
    //                 createdAt: evento.createdAt,
    //                 user:{
    //                     _id: evento.user._id,
    //                     name: evento.user.name,
    //                 }
    //         });
    //     };
    //     this.eventosRef.limitToLast(20).on('child_added', onReceive);

    // }

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
    agregarUsuario(user){
        this.getUsuarioRef();
        this.usuarioRef.push({
                _id: this.getUid(),
                name: 'PABLO',
                intereses:['CINE','TEATRO','HISTORIA'],
                perfil: 'USUARIO',
                barrio: 'WILDE',
                centro: ['CENTRO1'],
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                fechaUltimoAcceso:firebase.database.ServerValue.TIMESTAMP,
        });
    }

    buscarUsuarioLogueado(callback,name){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("name").equalTo(name.toUpperCase()).limitToLast(20).once('value',function(snapshot){
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
                });
            });
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

    getUsuarioRef(){
        this.usuarioRef = firebase.database().ref('usuario');
    }

    closePerfil(){
        this.close(this.usuarioRef);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Desde aca se escribe lo referido a los centros
    //Guardar Centros
    agregarCentro(user){
        this.getUsuarioRef();
        this.usuarioRef.push({
                _id: this.getUid(),
                name: 'CENTRO1',
                voluntarios: ['JUAN','PABLO'],
                actividades: [''],
                perfil: 'CENTRO',
                barrio: 'WILDE',
                createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    close(ref){
        if(this.ref){
            this.ref.off();
        }
    }

    getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

export default new Backend();