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
    loadMessages(callback){
        this.messageRef = firebase.database().ref('messages');
        this.messageRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: data.text,
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
        if(this.messageRef){
            this.messageRef.off();
        }
    }
}

export default new Backend();