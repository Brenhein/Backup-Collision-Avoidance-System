/***
 * Object about the current state of the prototype
 */
var state  = {
    reverse: false, // Is the vehicle in reverse
    icy: false, // Is there ice on the camera
    muddy: false, // Is there ud on the camera
    gas: false, // Is the driver moving
    obstacle: false, // Is there an obstacle on screen
    disabled: false, // Is the system disabled
    overridden: false, // Is the system overridden
    speed: 4, // What is the current vehicle speed
    camera_object: false, // Is there an object on the camera
    haptic: false, // Is the haptic feedback system on
    spraying: false, // If we spraying
    braking_speed: null, // The speed the vehicle
    beeping_speed: null,
    audio_done: false
}

var spraying;
var moving;
var init_dist = null;
var CAMERAS = ["l", "c", "r", "wide"];
var beep;
var backup_image = "url('img/backup.jpg')";


function camera_detection() {
    /**
     * Sets up the camera for when an object has been detected and the camera feed needs to display it
     */
    if (!state.camera_object) {
        backup_image = "url('img/backup_detected.png')";
        state.camera_object = true;

        // If there is not a camera obstruction
        if (!state.icey && !state.muddy) {
            for (let i = 0; i < CAMERAS.length; ++i) {
                document.getElementById(CAMERAS[i]).style.backgroundImage = backup_image;
            }
        }
    }
}


function play_warning() {
    /**
     * Plays a warning noise that is slow or fast depending on how close the vehicle is ot an obstacle
     * speed: "slow" or "fast", representing what audio file to play
     */
    if (!state.audio_done) {
        if (beep) {beep.loop = false;}
        beep = new Audio("audio/beep_" + state.beeping_speed);
        beep.loop = true;
        beep.play();
    }
}


function haptic(turn_off) {
    /**
     * Turns the haptic feedback system on and off
     * turn_off: Tells the system to turn off haptic
     */
    if (!state.haptic && !turn_off && state.braking_speed !== null) { // turn on haptic
        document.getElementById("haptic").innerText = "Haptic Feedback: On";
        state.haptic = true;
    }
    else if (state.haptic && turn_off) { // turn off haptic
        document.getElementById("haptic").innerText = "Haptic Feedback: Off";
        state.haptic = false;
    }
}


function fast_warning() {
    /**
     * Check for a fast warning noise
     */
    if (state.beeping_speed !== "fast") {
        state.beeping_speed = "fast";
        play_warning();
    }
}


function brake_max() {
    /**
     * This function is called to apply the MAX braking force when an obstacle is very close
     */
    if (state.braking_speed !== "fast") {state.braking_speed = "fast";}
    if (!state.overridden && !state.disabled) { // The system is turned ON and will automatically brake
        document.getElementById("warning").innerText = "AUTOMATICALLY BRAKING - MAX";
        state.speed = state.speed - .1;
        fast_warning();
        haptic(false)
    }
    camera_detection();
}


function brake_min() {
    /**
     * This function is called to apply the 1/4 braking force when an obstacle is kind of close
     */
    if (state.braking_speed !== "slow") {state.braking_speed = "slow";}
    if (!state.overridden && !state.disabled) { // The system is turned ON and will automatically brake
        document.getElementById("warning").innerText = "AUTOMATICALLY BRAKING - 1/4 SPEED";
        state.speed = state.speed - 1;
        fast_warning();
        haptic(false);
    }
    camera_detection();
}


function move_car() {
    /**
     * This function moves the car down the driveway
     */
    let car = document.getElementById("car_top");
    moving = setInterval(function () {
        let top = car.offsetTop;
        let bottom = top + car.offsetHeight
        let obst = document.getElementById("person").offsetTop;

        // If we don't have initial distance
        if (init_dist === null) {
            init_dist = obst - bottom;
        }

        // If there is an obstacle
        if (state.obstacle && state.speed > 0) {
            let curr_dist = (obst - bottom) / obst;
            if (bottom - 25 >= obst) { // you hit it
                brake_max()
                let person = document.getElementById("person")
                person.style.top = person.offsetTop + state.speed + "px";
            }
            else if (curr_dist <= .15) { // you're very close
                brake_max();
            }
            else if (curr_dist <= .25 && state.braking_speed === null) { // You're kinda close
                brake_min();
            }
            else if (curr_dist <= .45 && state.beeping_speed === null) {
                if (!state.overridden && !state.disabled) { // Just warn
                    state.beeping_speed = "slow";
                    play_warning();
                }
                camera_detection();
            }
        }

        // We stopped
        if (state.speed <= 0) {
            clearInterval(moving);
            stop_car();
        }
        car.style.top = top + state.speed + "px";

        // You went past the page
        if (top > window.innerHeight + 20) {
            stop_car();
        }
    }, 25);
}


function stop_car() {
    /**
     * Destroys the interval responsible for moving the car
     */
    state.audio_done = true;
    if (beep) {beep.loop = false;}
    state.beeping_speed = null;
    state.braking_speed = null;
    document.getElementById("warning").innerText = '\xa0';
    haptic(true);
}


function into_reverse() {
    /**
     * Turns on the BCAS and handles the setup for the BCAS
     * NOTE: You do not start driving in this function unless the gas is pressed
     */
    let rev_btn = document.getElementById("reverse");
    let cams = document.getElementsByClassName("camera");
    rev_btn.style.backgroundColor = "darkgray";
    state.reverse = true;

    // What is the camera seeing
    for (let i = 0; i < cams.length; i++) {
        if (state.icey) {  // Cameras are still icy
            cams[i].style.backgroundImage = "url('img/ice.jpg')";
        }
        else if (state.muddy) {
            cams[i].style.backgroundImage = "url('img/mud.jpg')";
        }
        else {
            cams[i].style.backgroundImage = backup_image;
        }
    }

    // If the system isn't disabled, show that the system is on
    if (!state.disabled) {
        document.getElementById("backup").innerText = "System: On";
    }
}


function out_of_reverse() {
    /**
     * Turns off the BCAS and handles some of the take down for the BCAS
     */
    let rev_btn = document.getElementById("reverse");
    let cams = document.getElementsByClassName("camera");
    rev_btn.style.backgroundColor = "#e7e7e7";
    state.reverse = false;
    if (!state.disabled) {
        document.getElementById("backup").innerText = "System: Off";
    }

    // Turns off all cameras
    for (let i = 0; i < cams.length; i++) {
        cams[i].style.backgroundImage = "";
    }

    // Turns off the override
    if (state.overridden) {
        document.getElementById("btn_ov").style.backgroundColor = "#e7e7e7";
        document.getElementById("backup").innerText = "System: Off";
        state.overridden = false;
    }
}


function reverse() {
    /**
     * On click handler when the user presses the reverse button
     */
    if (!state.gas) {
        if (state.reverse) {
            out_of_reverse()
        }
        else {
            into_reverse();
        }
    }
}


function add_spray_msg(cam, i) {
    /**
     * Adds spray message
     */
    let txt = document.createElement("div");
    txt.style.position = "absolute";
    txt.innerText = "Spraying";
    txt.id = "msg_spray" + i;
    cam.appendChild(txt);
}


function add_ice_msg(cam, i) {
    /**
     * Adds ice message
     */
    let txt = document.createElement("div");
    txt.style.position = "absolute";
    txt.innerText = "Heating";
    txt.id = "msg_ice" + i;
    cam.appendChild(txt);
}


function icy() {
    /**
     * If the "add ice" is clicked, it makes the camera icy and changes its image
     */
    if (!state.icey && !state.muddy) {
        let cams = document.getElementsByClassName("camera");
        document.getElementById("heat").innerText = "Heat: On";
        state.icey = true;

        // If backup cameras are on, show ice
        for (let i=0; i < cams.length; i++) {
            if (state.reverse) {
                cams[i].style.backgroundImage = "url('img/ice.jpg')";
            }
            if (!state.spraying) {
                add_ice_msg(cams[i], i);
            }
        }

        // Timeout for when the ice finally melts
        setTimeout(function() {
            document.getElementById("heat").innerText = "Heat: Off";
            state.icey = false;
            for (let i=0; i < cams.length; i++) {
                if (state.reverse) {
                    cams[i].style.backgroundImage = backup_image;
                }
                let ice_msg = document.getElementById("msg_ice" + i);
                if (ice_msg !== null) {
                    cams[i].removeChild(ice_msg);
                    if (state.spraying) {
                        add_spray_msg(cams[i], i)
                    }
                }
            }
        }, 3000);
    }
}


function muddy() {
    /**
     * Adds mud to the back of the camera and changes the image if the "add mud" is clicked
     */
    if (!state.icey && !state.muddy) {
        state.muddy = true;

        // If we are in reverse, add mud to the cameras
        if (state.reverse) {
            let cams = document.getElementsByClassName("camera");
            for (let i=0; i < cams.length; i++) {
                cams[i].style.backgroundImage = "url('img/mud.jpg')";
            }
        }
    }
}


function spray_on() {
    /**
     * This is called when the user holds down "clean camera" to clean the cameras of mud
     */
    if (state.reverse) {
        document.getElementById("nozzle").innerText = "Spray Nozzle: On";
        document.getElementById("spray").style.backgroundColor = "darkgray";
        state.spraying = true;

        // Adds the spraying message to the camera
        if (!state.icey) {
            let cams = document.getElementsByClassName("camera");
            for (let i=0; i < cams.length; i++) {
                add_spray_msg(cams[i], i);
            }
        }

        // If theres a reason to clean the camera
        if (state.muddy) {
            spraying = setTimeout(function () {
                let cams = document.getElementsByClassName("camera");
                for (let i=0; i < cams.length; i++) {
                    cams[i].style.backgroundImage = backup_image;
                }
                state.muddy = false;
            }, 2000);
        }
    }
}


function spray_off() {
    /**
     * When the user releases the clean camera button, this is called
     */
    if (state.reverse && state.spraying) {
        let cams = document.getElementsByClassName("camera");
        state.spraying = false;

        // Removes the spraying message from the camera
        for (let i=0; i < cams.length; i++) {
            let spray_msg = document.getElementById("msg_spray" + i);
            if (spray_msg !== null) {
                cams[i].removeChild(spray_msg);
                if (state.icey) { // If its still ice, add the heat message
                    add_ice_msg(cams[i], i);
                }
            }
        }

        document.getElementById("nozzle").innerText = "Spray Nozzle: Off";
        document.getElementById("spray").style.backgroundColor = "#e7e7e7";
        if (state.muddy) {clearTimeout(spraying);}
    }
}

function obstacle() {
    /**
     * Adds/removes an obstacle at the bottom of the road on the left
     */
    let car = document.getElementById("car_top");
    let obst = document.getElementById("person").offsetTop;

    // Don't add the obstacle if the vehicle is really close to it
    if (car.offsetTop + car.offsetHeight <= obst + 30) {
        if (!state.obstacle) {
            document.getElementById("person").style.visibility = "visible";
            state.obstacle = true;
            document.getElementById("btn_ped").style.backgroundColor = "darkgray";
        }
    }
}


function overridden() {
    /**
     * overrides the system or turns off the override
     */
    if (state.reverse && !state.disabled) { // Were in reverse and system isn't disabled
        if (!state.overridden) { // System is not overridden - OVERRIDE IT
            state.overridden = true;
            state.beeping_speed = null;
            if (beep) {beep.loop = false;}
            document.getElementById("btn_ov").style.backgroundColor = "#ff6347";
            document.getElementById("backup").innerText = "System: Overridden";
            document.getElementById("warning").innerText = '\xa0';
            haptic(true); // turn off haptic
        }
        else { // System is overridden - TURN OFF THE OVERRIDE
            state.overridden = false;
            document.getElementById("btn_ov").style.backgroundColor = "#e7e7e7";
            document.getElementById("backup").innerText = "System: On";
            haptic(false); // turn on haptic
        }
    }
}


function dis() {
    /**
     * Disables or re-enables the system
     */
    if (!state.reverse) { // Were in park
        if (!state.disabled) { // system is not disabled
            state.disabled = true;
            document.getElementById("btn_dis").style.backgroundColor = "darkgray";
            document.getElementById("backup").innerText = "System: Disabled";
        }
        else { // system is disabled
            state.disabled = false;
            document.getElementById("btn_dis").style.backgroundColor = "#e7e7e7";
            document.getElementById("backup").innerText = "System: Off";
        }
    }
}


function gas() {
    /**
     * This function is called when the driver hits the gas and starts going backwards or
     * releases the gas to stop
     */
    if (state.reverse && !state.gas) { // Were in reverse and the gas hasn't been activated
        state.gas = true;
        document.getElementById("gas").style.backgroundColor = "darkgray";
        move_car();
    }
}