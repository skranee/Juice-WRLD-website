import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index.js";
import {BsFillBellFill} from 'react-icons/bs/index.esm.js';
import {AiFillHome} from 'react-icons/ai/index.esm.js'
import {BsPersonSquare} from 'react-icons/bs/index.esm.js'

function UNavigate (){
    const navigate = useNavigate();
    const {store} = useContext(Context)
    const location = window.location.pathname

    const handleNavigate = (path) => {
        navigate(path)
    }

    const [showNavigation, setShowNavigation] = useState(true)

    useEffect(() => {
        {if (location === '/registrationpage' || location === '/loginpage'){
            setShowNavigation(false)
        }
        else {
            setShowNavigation(true)
        }}
    })

    return (
        <nav className="navigate" style={{display : showNavigation ? "block" : "none"}}>
            <div className="NavButtons">
                <a onClick={() => handleNavigate('/mainpage')}>
                    <AiFillHome />
                </a>
                <a onClick={() => handleNavigate('/helpcenter')}>Help Center</a>
                <a onClick={() => handleNavigate('/albums')}>Explore Albums</a>
                <a onClick={() => handleNavigate('/news')}>WRLD News</a>
                <a onClick={() => handleNavigate('/gallery')}>Some Stats To Know</a>
                {store.user.role === 'user' &&
                    <a onClick={() => handleNavigate('/notifications')}
                       style={{display: store.isAuth === true ? 'block' : 'none'}}>
                        {<BsFillBellFill />}
                    </a>}
                <a className="LogAndReg" onClick={() => handleNavigate('/registrationpage')}
                    style={{display: store.isAuth === true ? 'none' : 'block'}}>
                    Become a member
                </a>
                <a className="LogAndReg" onClick={() => handleNavigate('/loginpage')}
                    style={{display: store.isAuth === true ? 'none' : 'block'}}>
                    Log In
                </a>
                <a className="profileOptions" onClick={() => handleNavigate('/profile')}
                    style={{display: store.isAuth === true ? 'block' : 'none'}}>
                    {<BsPersonSquare />}
                </a>
            </div>
        </nav>
    );
}

export default observer(UNavigate);
