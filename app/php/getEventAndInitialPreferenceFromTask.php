<?php
require_once 'connection.php';

//input is id of task
$idTask= (isset($_POST['idTask'])) ? $_POST['idTask'] : 0;
$sql = "call getEventDetailsFromTask(".$idTask.");";
$result = select($sql); //function is called from connection.php
$rows = array();
if($r = mysqli_fetch_assoc($result)) {
    $rows['task'] = $r;
}
reseting();
$sql2 = "call getInitialPreferencesFromTask(".$idTask.");";
$result2 = select($sql2);
while($r2 = mysqli_fetch_assoc($result2)) {
    $rows['preferences'][] = $r2;
}
reseting();
echo json_encode($rows);
?>
