import React, {useContext, useState} from 'react'
import {Context} from "../index.js";
import {PiPencil} from 'react-icons/pi/index.esm.js';
import {PiPencilSlash} from 'react-icons/pi/index.esm.js';
import {TbEyeFilled} from 'react-icons/tb/index.esm.js';
import {TbEyeClosed} from 'react-icons/tb/index.esm.js';
import Confirmation from "./confirmation.jsx";

function ProfilePage () {
    const {store} = useContext(Context)
    const [editablePassword, setEditablePassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [changedPassword, setChangedPassword] = useState('')
    const [showEye, setShowEye] = useState(false)
    const [eyeClosed, setEyeClosed] = useState(false)
    const [typePassword, setTypePassword] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleClick = async () => {
        await store.logout()
        window.location.replace('http://localhost:5001/mainpage')
    }

    const handleChange = (password) => {
        setChangedPassword(password)
        if(password === '' || password.trim() === '' || password.includes(' ')) {
            setShowConfirm(false);
            setShowEye(false);
        }
        else {
            setShowConfirm(true);
            setShowEye(true);
        }
    }

    const handlePencilPassword = () => {
        setEditablePassword(!editablePassword);
        setChangedPassword('')
        if(editablePassword) {
            setShowConfirm(false)
            setShowEye(false)
            setTypePassword(false)
            setEyeClosed(false)
        }
    }

    const handleBlur = () => {
        if(changedPassword === '') {
            setEditablePassword(false);
        }
    }

    const handleEye = () => {
        setEyeClosed(!eyeClosed);
        setTypePassword(!typePassword)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            if(showConfirm === true) {
                changePassword()
            }
        }
    }

    const changePassword = () => {
        setShowConfirmation(true)
    }

    return (
        <div className="background_profile" onKeyDown={(event) => handleKeyDown(event)}>
            {localStorage.getItem('role') === 'admin' ? <p className="role">Admin</p> : <div/>}
            <label className="labelProfile">
                Password
            </label>
                <input
                    className="container_profile"
                    type={editablePassword && typePassword ? 'text' : 'password'}
                    readOnly={editablePassword ? false : true}
                    onChange={(event) => handleChange(event.target.value)}
                    value={editablePassword ? changedPassword : store.user.email}
                    onBlur={() => handleBlur()}
                    minLength="5"
                    maxLength="32"
                >
                </input>

            {showEye ?
                    eyeClosed ? <TbEyeClosed className="eye" onClick={() => handleEye()}/> :
                        <TbEyeFilled className="eye" onClick={() => handleEye()}/> : <div />}

            {showConfirm ?
                <button className="btnConfirm_profile" onClick={() => changePassword()}>
                    Confirm
                </button> :
                    <div />
            }

            {editablePassword ? <PiPencilSlash
                className="pencil"
                onClick={() => handlePencilPassword()}
            /> :
                <PiPencil
                    className="pencil"
                    onClick={() => handlePencilPassword()}
                />
            }
            <label className="labelProfile" style={{top: "40%"}}>
                User Email
            </label>
            <div
                className="container_profile"
                style={{top: "45%"}}
            >
                {store.user.email}
            </div>
            <button className="btnLogout" onClick={() => handleClick()}>
                LogOut
            </button>

            {showConfirmation ? <Confirmation
                    setShowConfirmation={setShowConfirmation}
                    checkPassword={changedPassword}
                    setEditablePassword={setEditablePassword}
                    setShowEye={setShowEye}
                    setShowConfirm={setShowConfirm}
                /> :
                <div />
            }
        </div>
    )
}

export default ProfilePage;