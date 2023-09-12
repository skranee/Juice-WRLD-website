import React, { useContext, useState } from 'react';
import { Context } from '../../index.js';
import {observer} from "mobx-react-lite";

function MessagePage({ data }) {
    const [inputMessage, setInputMessage] = useState('');
    const { indexStore, store } = useContext(Context);
    const [showSuccess, setShowSuccess] = useState(false)

    const handleChange = (event) => {
        setInputMessage(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (inputMessage !== '') {
                handleSend();
            }
        }
    };

    const handleSend = async () => {
        if (store.user.role === 'user') {
            if (inputMessage !== '' && inputMessage.trim() !== '') {
                const response = await store.sendMessage(store.user.email, inputMessage);
                if(response.status === 200) {
                    setShowSuccess(true);
                }
            }
        } else {
            console.log(indexStore.index);
            if (inputMessage !== '' && inputMessage.trim() !== '') {
                const response = await store.sendAnswer(data[indexStore.index].user, data[indexStore.index]._id, inputMessage);
                if(response.status === 200) {
                    setShowSuccess(true);
                }
            }
        }
    }

    const handleOk = () => {
        window.location.replace('http://localhost:5001/mainpage')
    }

    return (
        <div className="HC_main">
          <textarea
              className="messageSpace"
              onChange={handleChange}
              placeholder="Type here..."
              onKeyDown={handleKeyDown}
              value={inputMessage}
          />
            <button className="btnSend" onClick={() => handleSend()} disabled={inputMessage === ''}>
                Send
            </button>
            {showSuccess &&
                <div className="background_confirmation">
                    <div className="successWindow">
                        <a className="textSent">
                            {localStorage.getItem('role') === 'user' ? 'Message sent!' : 'Answer sent!'}
                        </a>
                        <button className="okBtn" onClick={() => handleOk()}>
                            Continue
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default observer(MessagePage);
