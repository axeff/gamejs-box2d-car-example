window.connection = {};

// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

connection = new WebSocket('ws://' + host + ':' + port + '/',['peer-protocol']);

connection.onopen = function () {
    // connection is opened and ready to use
    console.log("connection is opened and ready to use");
    
    // establish connection with 
    connection.send(JSON.stringify({register:true}))
};

connection.onerror = function (error) {
    // an error occurred when sending/receiving data
    console.log("an error occurred when sending/receiving data",error);
};

connection.onmessage = function (message) {
    // try to decode json (I assume that each message from server is json)
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
    }
    // handle incoming message
    console.log(json);
};
