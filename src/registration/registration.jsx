import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import arrowBack from "../log in/arrowback.png";
import {Context} from "../index.js";
import {observer} from "mobx-react-lite";

//CHANGE ALL THE 'USERNAMES' TO 'EMAILS'

const User = {
    email: '',
    password: ''
}
function Registration () {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const handleBack = () => {
        navigate('/mainpage')
    }
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const handleEmail = (inputEmail) => {
        setEmail(inputEmail)
    }
    const handlePassword = (inputPassword) => {
        setPassword(inputPassword)
    }

    const handleClick = (email, password) => {
        User.email = email
        User.password = password
        setEmail('')
        setPassword('')
        store.registration(email, password)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter' && email !== '' && password !== ''){
            event.preventDefault()
            handleClick(email, password)
        }
    }

    return (
        <div className="background_registration">
            <div>
                <img onClick={() => handleBack()} className="arrowBack_img" src={arrowBack} alt="" />
            </div>
            <div className="window_registration">
                <label className="labelReg labelEmail">
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
                <label className="labelReg labelPassword">
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
                    className="btnConfirm"
                    onClick={() => handleClick(email, password)}
                    disabled={email === '' || password === ''}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default observer(Registration);