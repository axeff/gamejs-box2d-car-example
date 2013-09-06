var interval = sendInterval,
    acceleration;
var uuidHandshake = window.location.hash.substring(1,window.location.hash.length); //'e734c46a-8b10-4572-a202-1e6e5ef6cc9f';

var ua = navigator.userAgent,
event = (ua.match(/iPad/i)) ? "touchstart" : "click";

$(function() {
    var tapholdHandler = function (event){
        $('#debug').html(event.type);
        window.accelerate = event.data.accelerate;
        e.preventDefault(); 
    }
  
    $('#accelerate').on("touchstart", {accelerate: 1}, tapholdHandler);
    $('#decelerate').on("touchstart", {accelerate: 2}, tapholdHandler);
    $('#accelerate').on("touchend", {accelerate: 0}, tapholdHandler);
    $('#decelerate').on("touchend", {accelerate: 0}, tapholdHandler);


    window.ondevicemotion = function(event) {
        acceleration = {
    	    x: event.accelerationIncludingGravity.x,
    	    y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z,
            accelerate: window.accelerate
        }

    }



    setInterval(function() {
    
        $('#debug').html(JSON.stringify(acceleration));
        connection.send(JSON.stringify({
            receiverId: uuidHandshake,
            message: acceleration
        }));
    },interval);



});