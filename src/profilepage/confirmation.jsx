import React, {useContext, useState} from 'react';
import {Context} from "../index.js";
import {TbEyeFilled} from 'react-icons/tb/index.esm.js';
import {TbEyeClosed} from 'react-icons/tb/index.esm.js';
import {IoClose} from 'react-icons/io5/index.esm.js'

function Confirmation ({setShowConfirmation, checkPassword, setEditablePassword, setShowEye, setShowConfirm}) {
    const {store} = useContext(Context)
    const [showErrorOld, setShowErrorOld] = useState(false)
    const [oldErrorMessage, setOldErrorMessage] = useState('')
    const [newErrorMessage, setNewErrorMessage] = useState('')
    const [showErrorNew, setShowErrorNew] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [changedPassword, setChangedPassword] = useState('');
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);

    const handleOldPassword = (oldPassword) => {
        setOldPassword(oldPassword)
    }
    const handleClose = () => {
        setOldErrorMessage('')
        setNewErrorMessage('')
        setShowConfirmation(false);
    }
    const handleEyeOld = () => {
        setShowPasswordOld(!showPasswordOld)
    }
    const handleEyeNew = () => {
        setShowPasswordNew(!showPasswordNew)
    }
    const handleChange= (changedPassword) => {
        setChangedPassword(changedPassword)
    }
    const changePassword = async () => {
        if(await store.checkPassword(store.user.email, oldPassword) === false) {
            setOldErrorMessage('Invalid password!')
            return setShowErrorOld(true)
        }
        else if(changedPassword !== checkPassword){
            setNewErrorMessage('Invalid password!')
            return setShowErrorNew(true);
        }
        setOldErrorMessage('')
        setNewErrorMessage('')
        store.changePassword(store.user.email, changedPassword);
        setEditablePassword(false)
        setShowEye(false)
        setShowConfirm(false)
        setShowConfirmation(false)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            changePassword()
        }
    }

    return (
        <div className="background_confirmation" onKeyDown={(event) => handleKeyDown(event)}>
            <div className="confirmationWindow">

                <input
                    className="inputConfirm"
                    type={showPasswordOld ? 'text' : 'password'}
                    onChange={(event) => handleOldPassword(event.target.value)}
                    placeholder='Confirm old password...'
                />
                {oldErrorMessage !== '' &&
                    <a className="errorMessage">
                        {oldErrorMessage}
                    </a>
                }

                {showPasswordOld ? <TbEyeClosed className="eyeConfirmation" onClick={() => handleEyeOld()}/> :
                        <TbEyeFilled className="eyeConfirmation" onClick={() => handleEyeOld()} />}

                <input
                    className="inputConfirm"
                    type={showPasswordNew ? 'text' : 'password'}
                    onChange={(event) => handleChange(event.target.value)}
                    placeholder='Confirm new password...'
                    style={{top: '45%'}}
                />
                {newErrorMessage !== '' &&
                    <a className="errorMessage" style={{top: '62%'}} >
                        {newErrorMessage}
                    </a>
                }

                {showPasswordNew ? <TbEyeClosed style={{top: '50%'}} className="eyeConfirmation" onClick={() => handleEyeNew()} /> :
                    <TbEyeFilled style={{top: '50%'}} className="eyeConfirmation" onClick={() => handleEyeNew()} />}

                <IoClose className="closeWindow" onClick={() => handleClose()} />
                <button
                    className="btnChange"
                    onClick={() => changePassword()}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Confirmation;