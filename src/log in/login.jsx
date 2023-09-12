import React, {useContext, useState} from 'react'
import arrowBack from './arrowback.png'
import {redirect, useNavigate} from "react-router-dom";
import {Context} from "../index.js";
import {observer} from "mobx-react-lite";

//CHANGE ALL THE 'USERNAMES' TO 'EMAILS'

const NewUser = {
    email: '',
    password: ''
}

function Login () {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const handleBack = () => {
        navigate('/mainpage')
    }
    const [email, setEmail] = useState('') // EMAIL!

    const [password, setPassword] = useState('')

    const handleEmail = (inputEmail) => {
        setEmail(inputEmail)
    }
    const handlePassword = (inputPassword) => {
        setPassword(inputPassword)
    }

    const handleClick = async (email, password) => {
        NewUser.email = email
        NewUser.password = password
        const status = await store.login(email, password)
        if(status === 200) {
            window.location.replace('http://localhost:5001/mainpage');
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter' && email !== '' && password !== ''){
            event.preventDefault()
            handleClick(email, password)
        }
    }

    return (
        <div className="background_login">
            <div>
                <img onClick={() => handleBack()} className="arrowBack_img" src={arrowBack} alt="" />
            </div>
            <div className="window_login">
                <label className="labelReg labelEmail" style={{color: "black"}}>
                    Email
                </label>
                <input
                    type="text"
                    className="input_registration input_email"
                    onChange={(event) => handleEmail(event.target.value)}
                    placeholder="Type here.."
                    onKeyDown={handleKeyDown}
                    value={email}
                />
                <label className="labelReg labelPassword" style={{color: "black"}}>
                    Password
                </label>
                <input
                    type="password" //change to ternar operator for clicking the eye icon (password => text)
                    className="input_registration input_password"
                    onChange={(event) => handlePassword(event.target.value)}
                    placeholder="Type here.."
                    onKeyDown={handleKeyDown}
                    value={password}
                />
                <button
                    className="btnConfirm_login"
                    onClick={() => handleClick(email, password)}
                    disabled={email === '' || password === ''}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default observer(Login);