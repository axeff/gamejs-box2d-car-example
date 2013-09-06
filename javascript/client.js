    
    /* override existing one for special needs */
    connection.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // handle incoming message
        if(json.connectionId){
            
            var url = window.location.protocol + '//' + window.location.host + '/steer.html#' + json.connectionId;
            setupqr();
            doqr(url);
            
        }else if (json.message.x && json.message.y && json.message.z){
            window.wheel_angle = json.message.y * -1 * 2;
            window.accelerate = json.message.accelerate;
        }
    };



var draw_qrcode = function(text, typeNumber, errorCorrectLevel) {
	$('#uuid').prepend(create_qrcode(text, typeNumber, errorCorrectLevel) );
};

var create_qrcode = function(text, typeNumber, errorCorrectLevel, table) {

	var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
	qr.addData(text);
	qr.make();

//	return qr.createTableTag();
	return qr.createImgTag();
};
