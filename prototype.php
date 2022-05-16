<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Backup Prototype</title>

    <link href="css/proto.css" rel="stylesheet" >
    <link href="css/road.css" rel="stylesheet" >
    <link href="css/head.css" rel="stylesheet" >
    <link href="css/obstacles.css" rel="stylesheet" >
    <link href="css/car.css" rel="stylesheet" >
    <link href="css/interface.css" rel="stylesheet" >

    <script src="js/prototype.js"></script>
    <script>
        window.onload = function () {
            document.getElementById("srs").onclick = function() {window.open('SRS.pdf', '_blank');};
            document.getElementById("instruct").onclick = function() {window.location.href='index.php'};
            document.getElementById("reset").onclick = function() {location.reload()};
            document.getElementById("btn_ped").onclick = function() {obstacle()};
            document.getElementById("ice").onclick = function() {icy()};
            document.getElementById("mud").onclick = function() {muddy()};
            document.getElementById("btn_dis").onclick = function() {dis()};
            document.getElementById("btn_ov").onclick = function() {overridden()};
            document.body.onmouseup = function() {spray_off()};
            document.getElementById("spray").onmousedown = function() {spray_on()};
            document.getElementById("gas").onclick = function() {gas()};
            document.getElementById("reverse").onclick = function() {reverse()};
        }
    </script>
</head>

<body>
    <div class="head">
        <h1>Backup Collision Avoidance System Prototype</h1>
        <div id="head_cnt">
            <button class="btn_h" id="srs">SRS</button>
            <button class="btn_h" id="instruct">Info</button>
            <button class="btn_h" id="reset">Reset</button>
        </div>
    </div>

    <div class="proto">
        <div class="interface">
            <div class="obstacles">
                <button class="btn_o btn" id="btn_ped">Add Obstacle</button>
                <button class="btn_o btn" id="ice">Add Ice</button>
                <button class="btn_o btn" id="mud">Add Mud</button>
            </div>

            <div class="car">
                <div class="hmi_cnt">
                    <div class="hmi">
                        <div class="hmi_item" id="info">
                            <div class="hmi_info" id="heat">Heat: Off</div>
                            <div class="hmi_info" id="backup">System: Off</div>
                            <div class="hmi_info" id="nozzle">Spray Nozzle: Off</div>

                        </div>
                        <div class="hmi_item" id="driver_opt">
                            <button class="btn_hmi btn" id="btn_dis">Disable</button>
                            <button class="btn_hmi btn" id="btn_ov">Override</button>
                            <button class="btn_hmi btn" id="spray">
                                Clean Camera</button>
                        </div>
                        <div class="hmi_item" id="warning">
                            &nbsp;
                        </div>
                        <div class="hmi_item" id="cr1">
                            <div class="camera" id="l"></div>
                            <div class="camera" id="c"></div>
                            <div class="camera" id="r"></div>
                        </div>
                        <div class="hmi_item" id="cr2">
                            <div class="camera" id="wide"></div>
                        </div>
                        <div class="hmi_item" id="haptic">
                            Haptic Feedback: Off
                        </div>
                    </div>
                </div>

                <div class="drive_cnt">
                    <button class="btn_d btn" id="gas">Gas</button>
                    <button class="btn_d btn" id="reverse">Reverse</button>
                </div>
            </div>
        </div>

        <div class="road">
            <div class="road_cnt" id="rct">
                <div class="car_top" id="car_top"></div>
            </div>
            <div class="road_cnt" id="rcb">
                <div class="person" id="person"></div>
            </div>
        </div>
    </div>

</body>
</html>