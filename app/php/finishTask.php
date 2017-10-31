<?php
require_once 'connection.php';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 0;

$return = 'failure';
$sql = "UPDATE task SET statusId = 10 where idTask = ".$idTask.";";
if(modify($sql) != -1) {
    $return = 'success';
}
$array = ['result' => $return];
echo json_encode($array);

?>
