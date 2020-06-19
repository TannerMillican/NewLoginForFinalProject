import React from "react";
// import { renderSync } from "node-sass";
// import { apiServer } from "nylas";

class Email extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            clientSecret: '',
            accessToken: '',
            userName: '',
            userEmail: '',
            emailSubject: '',
            emailBody: ''
        };

        this.onTextBoxChangeUserName = this.onTextBoxChangeUserName.bind(this);
        this.onTextBoxChangeUserEmail = this.onTextBoxChangeUserEmail.bind(this);
        this.onTextBoxChangeEmailSubject = this.onTextBoxChangeEmailSubject.bind(this);
        this.onTextBoxChangeEmailBody = this.onTextBoxChangeEmailBody.bind(this)
    }

    componentDidMount() {
        this.getKeys();
    };

    getKeys() {

        fetch('/api/keys')
            .then(res => res.json(res))
            .then(json => {
                const keys = json[0];

                this.setState({
                    clientId: keys.clientID,
                    clientSecret: keys.clientSecret,
                    accessToken: keys.accessToken
                })

            })
    };

    onTextBoxChangeUserName(event) {
        this.setState({
            userName: event.target.value
        })
    };

    onTextBoxChangeUserEmail(event) {
        this.setState({
            userName: event.target.value
        })
    };

    onTextBoxChangeEmailSubject(event) {
        this.setState({
            userName: event.target.value
        })
    };

    onTextBoxChangeEmailBody(event) {
        this.setState({
            userName: event.target.value
        })
    };

    // handleSendEmail() {

    //     const {
    //         clientId,
    //         clientSecret,
    //         accessToken
    //     } = this.state;

    //     console.log(process.env.REACT_APP_ACCESS_TOKEN)

    //     const Nylas = require('nylas');

    //     Nylas.config({
    //         clientId: process.env.REACT_APP_CLIENT_ID,
    //         clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    //     });

    //     const nylas = Nylas.with(process.env.REACT_APP_ACCESS_TOKEN);

    //     const draft = nylas.drafts.build({
    //         subject: document.getElementById("emailSubject").nodeValue,
    //         body: document.getElementById("emailBody").nodeValue,
    //         to: [{ name: document.getElementById("userName").nodeValue, email: document.getElementById("userEmail").nodeValue }]
    //     })

    //     draft.send().then(message => {
    //         console.log('message was sent')
    //     })
    // };

    render() {
        return (
            <div>
                <label>
                    Your Name
                    <hr/>
                    <input type='text' value={userName} placeholder='Your Name'/>
                </label>
                <br/>
                <br/>
                <label>
                    Your Email
                    <hr/>
                    <input type='email' value={userEmail} placeholder='Your Email'/>
                </label>
                <br/>
                <br/>
                <label>
                    Email Subject
                    <hr/>
                    <input type='text' value={emailSubject} placeholder='Email Subject'/>
                </label>
                <br/>
                <br/>
                <label>
                    Email Body
                    <hr/>
                    <textarea type='text' value={emailBody} placeholder='Email Body'/>
                </label>
                <br/>
                <button onClick={this.handleSendEmail}>
                    Send Email
                </button>
            </div>
        )
    };
}

export default Email;