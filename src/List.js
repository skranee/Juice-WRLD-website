import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import {Context} from "./index.js";
import {useNavigate} from "react-router-dom";
import {AiOutlineCheck} from 'react-icons/ai/index.esm.js'

const List = ({ data }) => {
    const {store} = useContext(Context)
    const {indexStore} = useContext(Context)
    const navigate = useNavigate()

    const handleClick = (indexMessage) => {
        indexStore.setIndex(indexMessage)
        console.log(indexStore.index)
        if(store.user.role === 'admin') {
            navigate('/helpmessage')
        }
    }

    const handleRead = async (indexAnswer) => {
        await store.readAnswer(data[indexAnswer].messageId);
        window.location.reload()
    }

    return (
        <div>
            {data.map((item, index) => (
                <li
                    className="container_replies"
                    key={index}
                    onClick={() => handleClick(index)}
                    style={{cursor: store.user.role === 'admin' ? 'cursor' : 'default'}}
                >
                    <p>{store.user.role === 'user' ? item.answer : item.message}</p>
                    { store.user.role === 'user' && <AiOutlineCheck className="check" onClick={() => handleRead(index)} /> }
                </li>
            ))}
        </div>
    );
};

export default observer(List);
