<?php

require_once 'connection.php';
//$username = (isset($_POST['username'])) ? $_POST['username'] : 'jack';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 9;
$reason = (isset($_POST['reason'])) ? $_POST['reason'] : 'No reason provided.';
$amount = (isset($_POST['amount'])) ? $_POST['amount'] : 0;



$sql = "select eventRecord, assignee from task where idTask = ".$idTask.";";
$result = select($sql);
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $eventRecord = $row['eventRecord'];
    $assignee = $row['assignee'];
    //create new task for FM since task by subteams can be processed at the same time
    $sql = "INSERT INTO `task` (`subject`, `description`, `priority`, `eventRecord`, `creator`, `assignee`, `statusId`) "
        ."VALUES ('Budget request.', 'Detailed description in the request. ', 'high', ".$eventRecord.", '".$assignee."', 'alice', '9');";
    $result = modify($sql);
    if ($result == -1) {
        $array = ["result" => "failure"];
    } else {
        reseting();
        $sql = "INSERT INTO `financialrequest` (`amount`, `reason`, "
        ."`agreedBudget`, `status`, `idTask`) VALUES (".$amount.", '".$reason."', NULL, NULL, ".$result.");";
        modify($sql);
        //for greater exception handling, anothre if could be put here with the value of the previous modify since it won't insert a second financial request with the same taskid
        $array = ["result" => "success"];
    }
} else {
        $array = ["result" => "failure"];
}
echo json_encode($array);
?>
