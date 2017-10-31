<?php

require_once 'connection.php';
$jobTitle = (isset($_POST['jobTitle'])) ? $_POST['jobTitle'] : 'test job title';
$jobDescription = (isset($_POST['jobDescription'])) ? $_POST['jobDescription'] : 'test job description';
$experience = (isset($_POST['experience'])) ? $_POST['experience'] : 'test experience';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 0;

//$eventRecord = (isset($_POST['eventRecord'])) ? $_POST['eventRecord'] : 1;
//$sql ="INSERT INTO `task` (`subject`, `description`, `priority`, `statusId`, `eventRecord`, `creator`, `assignee`)"
//    . " VALUES ('Staff request', 'More details by clicking.', 'high', 11, ".$eventRecord.", '".$username."', 'simon');";
$array = ["result" => "failure"];
$sql = "select assignee from task where idTask = ".$idTask.";";
$result = select($sql);
if (mysqli_num_rows($result) > 0) {
    $username = mysqli_fetch_assoc($result)['assignee'];
    $sql = "UPDATE `task` SET `subject` = 'Staff request needed.', `priority` = 'high',"
        ." `creator` = '".$username."', `assignee` = 'simon', `statusId` = '11' WHERE `task`.`idTask` = ".$idTask.";";
    $result = modify($sql);
    if ($result != -1) {
        /*  this update isn't really neded the way the status is handled right now; leaving it here in case it is needed.
        $sql = "UPDATE `eventrequest` SET `idEventRequestStatus` = '11' WHERE `eventrequest`.`eventRecord` = ".$eventRecord.";";
        modify($sql); */
        reseting();
        $sql = "INSERT INTO `staffrequest` (`experience`, `jobTitle`, `jobDescription`, `idTask`) "
            ."VALUES ('".$experience."', '".$jobTitle."', '".$jobDescription."', '".$idTask."');";
        modify($sql);
        $array = ["result" => "success"];
    }
}
echo json_encode($array);
?>
