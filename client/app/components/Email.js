import React from "react";
// import { apiServer } from "nylas";
// import KeysAPI from "../../../server/routes/api/API";

class Email extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            clientSecret: '',
            accessToken: ''
        };
    }

    componentDidMount() {
        this.getKeys();
    };

    getKeys() {

        // API.search()
        //     .then(res => res.json());
        //     .then((res) => {
        //         this.setState({
        //             clientId: res.clientId,
        //             clientSecret: res.clientSecret,
        //             accessToken:res.accessToken
        //         })
        //     })
    };

    handleSendEmail() {

        

        // console.log(process.env.REACT_APP_ACCESS_TOKEN)

        // const Nylas = require('nylas');

        // Nylas.config({
        //     clientId: process.env.REACT_APP_CLIENT_ID,
        //     clientSecret: process.env.REACT_APP_CLIENT_SECRET,
        // });

        // const nylas = Nylas.with(process.env.REACT_APP_ACCESS_TOKEN);

        // const draft = nylas.drafts.build({
        //     subject: document.getElementById("emailSubject").nodeValue,
        //     body: document.getElementById("emailBody").nodeValue,
        //     to: [{ name: document.getElementById("userName").nodeValue, email: document.getElementById("userEmail").nodeValue }]
        // })

        // draft.send().then(message => {
        //     console.log('message was sent')
        // })
    }

    render() {
        return (
            <div>
                <label>
                    Your Name
                    <hr/>
                    <input id='userName' placeholder='Your Name'/>
                </label>
                <br/>
                <label>
                    Your Email
                    <hr/>
                    <input id='userEmail' placeholder='Your Email'/>
                </label>
                <br/>
                <label>
                    Email Subject
                    <hr/>
                    <input id='emailSubject' placeholder='Email Subject'/>
                </label>
                <br/>
                <label>
                    Email Body
                    <hr/>
                    <textarea id='emailBody' placeholder='Email Body'/>
                </label>
                <br/>
                <button onClick={this.handleSendEmail}>
                    Send Email
                </button>
            </div>
        )
    }
}

export default Email;