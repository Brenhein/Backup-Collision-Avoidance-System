<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Instructions</title>

    <link href="css/head.css" rel="stylesheet" >
    <link href="css/instructions.css" rel="stylesheet" >
    <script>
        window.onload = function() {
            document.getElementById("srs").onclick = function() {window.open('SRS.pdf', '_blank');};
            document.getElementById("Prototype").onclick = function() {window.location.href='prototype.php'};
            document.getElementById("go").onclick = function() {window.location.href='prototype.php'};
        }
    </script>
</head>
<body>
    <div class="head">
        <h1>Backup Collision Avoidance System Prototype</h1>
        <div id="head_cnt">
            <button class="btn_h" id="srs">SRS</button>
            <button class="btn_h" id="Prototype">Demo</button>
        </div>
    </div>
    <p id="overall">The Backup Collision Avoidance System is responsible for obstacle detection, collision prevention, and damage
        mitigation if an accident were to occur for objects residing behind a vehicle, as they may
        be out of view of the driver’s line-of-sight. While backup systems can be an afterthought
        for many new vehicles, the potential damage that may be caused by accidentally backing into objects or pedestrians warrants a well-designed system, making the BCAS an
        important part of the vehicle. As accident prevention and damage mitigation are both
        high-level goals of vehicles, the system works specifically to prevent unintended collisions
        with pedestrians or objects during the reverse operation of the vehicle.  This prototype highlights
        some of the key use cases of the backup collision avoidance system, allowing the
        user to interact with it and experience some of its functionality.
    </p>
    <div class="instruct">
        <div class="column">
            <dl class="i_block" id="obstacles">
                <dt class="section">Road</dt>
                <p class="info">
                    What is seen on the right-hand side of the screen, providing a
                    top-down view of a car backing out.  While the user interacts with the prototype
                    on the left side of the screen, a demonstration of what plays out based on their
                    actions is seen here.
                </p>
                <p>&nbsp;</p>
                <dt>The road is made up of two parts:</dt>
                <dd><b>A car:</b> The vehicle backing out</dd>
                <dd><b>A pedestrian:</b> The object the car is trying to avoid (must be manually added to the
                    road using the <i>Add Obstacle</i> button)</dd>
            </dl>
            <dl class="i_block" id="obstacles">
                <dt class="section">Obstacles</dt>
                <dt><b>Add Obstacles:</b></dt>
                    <dd>Adds a pedestrian to the end of the road. The pedestrian can be added
                        at <b>any time</b> during the backup operation. The later the obstacle is added, the more
                        likely the vehicle is to collide with it. <b>Even after a collision, the vehicle will
                                apply the maximum braking force to mitigate damages in the prototype.</b></dd>
                <dt><b>Add Ice:</b></dt>
                    <dd>Adds ice to the cameras. As soon as the ice is added, the heat
                    <b>automatically</b> turns on and heats the cameras for 3 seconds, until the ice melts.
                    It can be pressed at any time <b>as long as
                            there is no mud on the cameras.</b></dd>
                    <dd>The heat turns on as long as the vehicle is on and is not
                        dependent on the vehicle being in reverse. </dd>
                    <dd><b>Note that in the actual system, only the
                        main camera will be heated.</b></dd>
                <dt><b>Add Mud:</b></dt>
                    <dd>Adds mud to the cameras. It can only be removed by using the spray nozzle
                    to clean the cameras. It can be pressed at any time <b>as long as
                            there is no ice on the cameras.</b></dd>
                    <dd><b>Note that in the actual system, only the
                    main camera will have a spray nozzle.</b></dd>
            </dl>
            <dl class="i_block" id="obstacles">
                <dt class="section">Gears</dt>
                <dt><b>Reverse:</b></dt>
                    <dd>Shifts the vehicle gear into reverse, turning the system on. It <b>does not</b>
                    start the backup operation.</dd>
                    <dd>It can be turned on and off <b>until</b> the user presses the <i>Gas</i> button.</dd>
                <dt><b>Gas:</b></dt>
                    <dd>Starts the backup operation. It can only be clicked when the vehicle is in reverse.</dd>
                    <dd><b>Once this button is activated, it cannot be turned off AND the user can not
                            exit out of reverse for the remainder of the simulation.</b></dd>
            </dl>
        </div>
        <div class="column">
            <dl class="i_block" id="obstacles">
                <dt class="section">Human Machine Interface</dt>
                <dt><b>Disable:</b></dt>
                    <dd>Disables the BCAS system. The cameras will still display an
                        obstacle if it appears, but there will be no beeping, no warning message,
                        no haptic feedback, and the system will not automatically brake.</dd>
                <dt><b>Override:</b></dt>
                    <dd>Does the same as <i>disable</i>, but it is automatically turned
                    back on when the system goes into reverse again, and it can be toggled on/off while the
                    vehicle is actively backing out.</dd>
                <dt><b>Clean Camera:</b></dt>
                    <dd>Activates the spray nozzle.  It must be held down continuously for a total
                            of 2 seconds in order to completely clean the cameras.</dd>
                    <dd><b>It can only be pressed while the system is in reverse</b></dd>
                <dt><b>Warning:</b></dt>
                    <dd>Displays a warning to the driver that the vehicle is automatically
                    braking, along with if it's reducing the speed by 25% or applying the max braking
                    force.</dd>
                <dt><b>Cameras:</b></dt>
                    <dd>There are 4 cameras in the system:</dd>
                    <dd><b>Upper Row:</b>&nbsp;&nbsp;&nbsp;&nbsp;Left&nbsp;&nbsp;&nbsp;Main&nbsp;&nbsp;&nbsp;Right</dd>
                    <dd><b>Lower Row:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;360&#730; Camera</dd>
                    <dd>&nbsp;</dd>
                    <dd>If <i>Add Obstacle</i> has been clicked, a pedestrian with a green box
                    around them will be displayed when the vehicle is in automatic braking range.</dd>
                    <dd><i>Add Ice</i> makes camera lenses icy, requiring heat to clear them.</dd>
                    <dd><i>Add Mud</i> makes camera lenses muddy, requiring the spray nozzle to clear them.</dd>
                <dt><b>Haptic Feedback:</b></dt>
                    <dd>Represents if the driver is experiences haptic feedback
                        on the steering wheel.</dd>
                <dd><b>The haptic feedback message will not be in the final system.</b></dd>
                <dt><b>Auditory Warning:</b></dt>
                    <dd>If an obstacle is detected, the prototype will play a beeping noise.</dd>
                    <dd>The frequency of the beep will increase if the automatic brakes are applied.</dd>
            </dl>
            <div class="go_cnt">
                <button id="go">Go to Prototype</button>
            </div>
        </div>
    </div>
</body>
</html>