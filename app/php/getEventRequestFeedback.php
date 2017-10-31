<?php
require_once 'connection.php';


$idTask= (isset($_POST['idTask'])) ? $_POST['idTask'] : 2;

$sql = "select financialfeedback.description FROM financialfeedback "
    ."join task ON "
    ."financialfeedback.eventRecord = task.eventRecord "
    ."WHERE task.idTask = ".$idTask.";";

$result = select($sql); //function is called from connection.php
if(mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $array = ['feedback' => $row['description']];
} else {
    $array = ['feedback' => null];
}
echo json_encode($array);
?>
