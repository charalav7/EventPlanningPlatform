<?php
require_once 'connection.php';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 0;
$attendees = (isset($_POST['attendees'])) ? $_POST['attendees'] : 0;
$budget = (isset($_POST['budget'])) ? $_POST['budget'] : 20000;
$eventType = (isset($_POST['eventType'])) ? $_POST['eventType'] : "test event type.";
$description = (isset($_POST['description'])) ? $_POST['description'] : "test description.";
$from = (isset($_POST['from'])) ? $_POST['from'] : null;
$to = (isset($_POST['to'])) ? $_POST['to'] : null;
$decorations = (isset($_POST['decorations'])) ? $_POST['decorations'] : null;
$food = (isset($_POST['food'])) ? $_POST['food'] : null;
$drinks = (isset($_POST['drinks'])) ? $_POST['drinks'] : null;
$filming = (isset($_POST['filming'])) ? $_POST['filming'] : null;
$audio = (isset($_POST['audio'])) ? $_POST['audio'] : null;
$artWork = (isset($_POST['artWork'])) ? $_POST['artWork'] : null;
$computer = (isset($_POST['computer'])) ? $_POST['computer'] : null;
$other = (isset($_POST['other'])) ? $_POST['other'] : null;

//get the eventRecord based on the id of the task
$sql = "Select eventRecord from task where idTask = ".$idTask.";";
$result = select($sql);

if(mysqli_num_rows($result) > 0) {
    $eventRecord = mysqli_fetch_assoc($result)["eventRecord"];


    $sql ="INSERT INTO `summary` (eventType, `description`, `attendees`,"
        ." `eventStartDate`, `eventEndDate`, `budget`, `eventRecord`) VALUES "
        ."('".$eventType."', '".$description."', ".$attendees.", '".$from."', '".$to."', ".$budget.", ".$eventRecord.");";
    $result = modify($sql);

    if ($result == -1) {
        $array = ["result" => "failure"];
    } else {
        $sql = "DELETE FROM task "
            ."where eventRecord = ".$eventRecord.";";
        execute($sql);
        if ($decorations != null || $filming != null || $audio != null || $artWork != null || $computer != null) {
            $sql = " INSERT INTO `task` (`subject`, `description`, `priority`, `statusId`, `eventRecord`, `creator`, `assignee`)"
                . " VALUES ('Create tasks for event.', '".$description."', 'medium', 6, ".$eventRecord.", 'janet', 'jack');";
            modify($sql);
        }
        if ($food != null || $drinks != null) {
            $sql = " INSERT INTO `task` (`subject`, `description`, `priority`, `statusId`, `eventRecord`, `creator`, `assignee`)"
                . " VALUES ('Create tasks for event.', '".$description."', 'medium', 6, ".$eventRecord.", 'janet', 'natalie');";
            modify($sql);
        }
        $array = ["result" => "success"];
        $sql = "UPDATE `eventrequest` SET `eventType` = '".$eventType."', `eventStartDateTime` = '".$to."',"
            ." `eventEndDateTime` = '".$from."', `attendees` = ".$attendees.", `budget` = ".$budget.","
            ." `idEventRequestStatus` = 6 WHERE `eventrequest`.`eventRecord` = ".$eventRecord.";";
        modify($sql);
        //preferences
        if($decorations != null ) {
            $sql = "INSERT INTO eventpreferences (eventRecord, preference, description)
                VALUES (".$eventRecord.", 'Decorations', '".$decorations."');";
            modify($sql);
        }
        if($audio != null) {
            $sql = "INSERT INTO eventpreferences (eventRecord, preference, description)
                VALUES (".$eventRecord.", 'Parties', '".$audio."');";
            modify($sql);
        }
        if($filming != null) {
            $sql = "INSERT INTO eventpreferences (eventRecord, preference, description)
                VALUES (".$eventRecord.", 'Photos/Filming', '".$filming."');";
            modify($sql);
        }
        if($drinks  != null) {
            $sql = "INSERT INTO eventpreferences (eventRecord, preference, description)
                VALUES (".$eventRecord.", 'Drinks', '".$drinks."');";
            modify($sql);
        }
        if($food != null) {
            $sql = "INSERT INTO eventpreferences (eventRecord, preference, description)
                VALUES (".$eventRecord.", 'Food', '".$food."');";
            modify($sql);
        }
        if($computer != null) {
            $sql = "INSERT INTO eventpreferences (eventRecord, preference, description)
                VALUES (".$eventRecord.", 'WiFi', '".$computer."');";
            modify($sql);
        }
    }
} else {
    $array = ['result' => 'failure'];
}

echo json_encode($array);
?>
