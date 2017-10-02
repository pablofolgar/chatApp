import React from 'react';



import {GiftedChat} from 'react-native-gifted-chat';

import Backend from '../../Backend';

class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            contacto:this.props.contacto,
            messages: [],
        };

        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    componentWillMount() {

      }


    render(){
        return(
            <GiftedChat
                    messages={this.state.messages}
                    onSend={(message) => {
                        Backend.sendMessage(message,this.state.contacto);
                    }}
                    user={{
                      _id: Backend.getUid(),
                      name: this.state.user.name,
                    }}
             />
        );
    }

    componentDidMount(){
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return{
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        },this.state.user.name,this.state.contacto);
    }

    componentWillUnMount(){
        Backend.closeChat();
    }

}

Chat.defaultProps = {
    name:'Pablo',
};

Chat.propTypes={
    name: React.PropTypes.string,
};

export default Chat;