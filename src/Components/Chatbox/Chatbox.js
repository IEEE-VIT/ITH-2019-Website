import { Widget,addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import React, { Component } from 'react';
import './Chatbox.css';

export default class Chatbox extends Component{

    messageHandler = (message) =>{
        fetch('https://mayankchatbot.herokuapp.com/predict',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                query: message
            })
        })
        .then(res => res.json())
        .then(data => {
            // this.setState({
            //     Confidence: 'Confidence: '+data.Score+'%',
            //     Intent: 'Intent: '+data.Action,
            //     Message: data.Message
            // })
            if (data.score > 65){

                addResponseMessage(data.Message)
            }
            else{
                addResponseMessage('Hmm, I don\t quite understand.')
            }
        })
    }
    componentDidMount(){
        addResponseMessage('Hello, there! You can ask me anything about ITC 2019.')
    }
    render(){
        return(
            <Widget
                handleNewUserMessage={this.messageHandler}
                senderPlaceHolder='Typing a message..'
                title="Lexie"
                subtitle="I can asnwer your questions"
            />
        );
    }
}