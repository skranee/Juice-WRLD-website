import React from 'react';
import List from "../../List.js";

function AdminHelpPage ({messages}) {
    return (
        <div className="HC_main">
            <span className="labelReplies" style={{left: '46%'}}>Messages:</span>
            <div>
                <List data={messages} />
            </div>
        </div>
    )
}

export default AdminHelpPage;