import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom";

function HelpCenter () {
    const navigate = useNavigate()
    const handleClick = (path) => {
        navigate(path)
    }
    const role = localStorage.getItem('role');
    console.log(localStorage.getItem('role'))

    return (
        <div className="HC_main">
            {role === 'user' ?
                <>
                    <div className="textAbove">
                        Here you can find someone who is ready to listen to your stories, to be there for you and to help with some advices. Here are some specialists that are qualified and approved by our team. Our main goal on this page is to make the necessary help available. We know how hard life gets sometimes and we also know that human beings are social creatures which need to speak their mind. You can be sure that your identity will never be seen by anyone while having the conversation, this is absolutely free and the only way we earn money is from your donations. Hope you’ll be alright after the help’s received if you weren’t before that.
                    </div>
                    <button className="btn_help" onClick={() => handleClick('/helpmessage')}>
                        Continue
                    </button>
                    <div className="textBeneath">
                    By continuing you agree with the terms of use, that are mostly about being polite to the people who try to help you. Do not overuse it and keep in mind that you should use that function only if you need it. Boredom is not a reason for wasting time of a man who everyday helps dozens of people.
                    </div>
                </> :
                <a className="authAlert" style={{left: "41.5%"}}>Authorize to get help</a>
            }
        </div>
    )
}

export default HelpCenter;