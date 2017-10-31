
<?php
require_once 'connection.php';
$clientRecord = (isset($_POST['clientRecord'])) ? $_POST['clientRecord'] : 1;
$eventType = (isset($_POST['eventType'])) ? $_POST['eventType'] : null;
$eventStartDateTime = (isset($_POST['eventStartDateTime'])) ? $_POST['eventStartDateTime'] : null;
$decorations = (isset($_POST['decorations'])) ? $_POST['decorations'] : null;
$eventEndDateTime = (isset($_POST['eventEndDateTime'])) ? $_POST['eventEndDateTime'] : null;
$attendees = (isset($_POST['attendees'])) ? $_POST['attendees'] : 0;
$parties = (isset($_POST['parties'])) ? $_POST['parties'] : null;
$photos = (isset($_POST['photos'])) ? $_POST['photos'] : null;
$breakfast = (isset($_POST['breakfast'])) ? $_POST['breakfast'] : null;
$drinks = (isset($_POST['drinks'])) ? $_POST['drinks'] : null;
$wifi = (isset($_POST['wifi'])) ? $_POST['wifi'] : null;
$budget = (isset($_POST['budget'])) ? $_POST['budget'] : 0;
$statusCreated = 1;
$username = (isset($_POST['username'])) ? $_POST['username'] : "sarah";
$onValue = "true";

//execute
$sql = "INSERT INTO eventrequest (eventType, eventStartDateTime, eventEndDateTime, attendees, budget, clientRecord, idEventRequestStatus) ".
"VALUES ('".$eventType."', '".$eventStartDateTime."', '".$eventEndDateTime."', ".$attendees.", ".$budget.", ".$clientRecord.", ".$statusCreated.");";
$result = modify($sql);

if ($result == -1) {
    $array = ["result" => "failure"];
    echo json_encode($array);
} else {
    $array = ["result" => "success"];
    $sql ="INSERT INTO `task` (`subject`, `description`, `priority`, `statusID`, `eventRecord`, `creator`, `assignee`)"
        . " VALUES ('Initial Request decision', 'Lorem ipsum ".$clientRecord."', 'high', ".$statusCreated.", ".$result.", '".$username."', 'janet');";
    $result2 = modify($sql);
    //preferences
    if($decorations == $onValue ) {
        $sql = "INSERT INTO eventrequestpreferences (eventRecord, preference)
            VALUES (".$result.", 'Decorations');";
        modify($sql);
    }
    if($parties == $onValue) {
        $sql = "INSERT INTO eventrequestpreferences (eventRecord, preference)
            VALUES (".$result.", 'Parties');";
        modify($sql);
    }
    if($photos == $onValue) {
        $sql = "INSERT INTO eventrequestpreferences (eventRecord, preference)
            VALUES (".$result.", 'Photos/Filming');";
        modify($sql);
    }
    if($drinks == $onValue) {
        $sql = "INSERT INTO eventrequestpreferences (eventRecord, preference)
            VALUES (".$result.", 'Drinks');";
        modify($sql);
    }
    if($breakfast == $onValue) {
        $sql = "INSERT INTO eventrequestpreferences (eventRecord, preference)
            VALUES (".$result.", 'Food');";
        modify($sql);
    }
    if($wifi == $onValue) {
        $sql = "INSERT INTO eventrequestpreferences (eventRecord, preference)
            VALUES (".$result.", 'WiFi');";
        modify($sql);
    }
    echo json_encode($array);
}

?>
