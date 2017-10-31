<?php

require_once 'connection.php';
$username = (isset($_POST['username'])) ? $_POST['username'] : 'no username';

$sql = "SELECT task.idTask, task.subject, task.description, task.priority, task.statusId as status,"
    ." task.eventRecord, task.creator, task.assignee"
    ." From task join eventrequest on task.eventRecord = eventrequest.eventRecord"
    ." WHERE task.assignee = '".$username."' AND NOT task.statusId = 10;";
$result = select($sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);

?>
