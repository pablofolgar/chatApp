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
                text: message.text,
                createdAt: new Date(message.createdAt),
                user:{
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
        };
        this.messageRef.limitToLast(20).on('child_added', onReceive);

    }

    //Send message to the backend
    sendMessage(message){
        for(let i = 0; i < message.length; i++){
            this.messageRef.push({
                text: message[i].text,
                user: message[i].user,
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
            this.historyRef.orderByChild("category").equalTo(categoria).limitToLast(20).once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                const hist = childSnapshot.val();
                    callback({
                                _id: childSnapshot.key,
                                text: hist.text,
                                category: hist.category,
                                titulo: hist.titulo,
                                createdAt: new Date(hist.createdAt),
                                user:{
                                    _id: hist.user._id,
                                    name: hist.user.name,
                                }
                     });
                });
            });
    }

    //Send histories to the backend
    sendHistory(name,categoria,titulo,history){
            this.getHistoryRef();
            this.historyRef.push({
                text: history,
                category: categoria,
                titulo: titulo,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user:{
                  _id: this.getUid(),
                  name: name,
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
    sendEvento(name,evento,barrio,fecha){
            this.getEventoRef();
            this.eventosRef.push({
                evento: evento,
                barrio: barrio,
                fecha: fecha,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user:{
                  _id: this.getUid(),
                  name: name,
                }
            });
    }

    buscarEventoPorBarrio(callback,barrio){
        this.getEventoRef();
        this.eventosRef.orderByChild("barrio").equalTo(barrio).limitToLast(20).once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                const evento = childSnapshot.val();
                    callback({
                                evento: evento.evento,
                                barrio: evento.barrio,
                                fecha: evento.fecha,
                                createdAt: evento.createdAt,
                                user:{
                                    _id: evento.user._id,
                                    name: evento.user.name,
                                }
                     });
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
        console.log('Id: '+user.id+' - name: '+user.name+' - intereses: '+user.intereses+' - perfil: '+user.perfil+' -barrio: '+ user.barrio+ ' -createdAt: '+user.createdAt);
        // this.getUsuarioRef();
        // this.usuarioRef.push({
        //         _id: this.getUid(),
        //         name: name,
        //         intereses: ['Musica','Teatro','Cine'],
        //         perfil: 'usuario',
        //         barrio: 'wilde',
        //         createdAt: firebase.database.ServerValue.TIMESTAMP,
        // });
    }

    buscarUsuarioLogueado(callback,name){
        this.getUsuarioRef();
        this.usuarioRef.orderByChild("name").equalTo(name).limitToLast(20).once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                const user = childSnapshot.val();
                callback({
                            id: user._id,
                            name:  user.name ,
                            intereses:  user.intereses,
                            perfil:  user.perfil,
                            barrio:  user.barrio,
                            createdAt:  user.createdAt,
                });
            });
        });
    }

    getUsuarioRef(){
        this.usuarioRef = firebase.database().ref('usuario');
    }

    closePerfil(){
        this.close(this.usuarioRef);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    close(ref){
        if(this.ref){
            this.ref.off();
        }
    }
}

export default new Backend();