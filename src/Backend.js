import firebase from 'firebase';

class Backend{
    uid='';
    messageRef=null;
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
                        text: message.text,
                        createdAt: new Date(message.createdAt),
                        user:{
                            _id: message.user._id,
                            name: message.user.name,
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
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                para:para,
            });
        }
    }

    //Close the connection to the backend
    closeChat(){
        if(this.messageRef){
            this.messageRef.off();
        }
    }
}

export default new Backend();