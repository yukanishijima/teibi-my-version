import React from 'react';
function Chat() {
    return (
      <div className="container">
        <div className="row">
        <div className="panel panel-default">
            <div className="panel-heading">
                <div className="js-userjoined"></div>
                <div className="js-usersinchat">Users in Chat: </div>
                <div className="typing"></div>
            </div>
            <div className="panel-body">
                <div className="container" id="messages">
                    <div className="row message-bubble"></div>
                </div>
                <div className="panel-footer">
                    <div className="input-group"><input className="form-control" id="txtmessage" type="text" /><span className="input-group-btn"><button className="btn btn-default" id="sendmessage" type="button">Send</button></span></div>
                </div>
            </div>
        </div>
        </div>
      </div>
    )
}

export default Chat;