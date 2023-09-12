import React from 'react'
import RepliesList from "../List.js";
import {observer} from "mobx-react-lite";

function Notifications ({repliesData}) {
    return (
        <div className="HC_main replies_main">
            <span className="labelReplies">Here you can see available replies:</span>
            <div>
                <RepliesList data={repliesData}/>
            </div>
        </div>
    )
}

export default observer(Notifications);