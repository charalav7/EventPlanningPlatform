<?php
require_once 'connection.php';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : -1;

echo json_encode(open($idTask));

function open($idTask) {
    $return = 'failure';
    $sql = "UPDATE task SET statusId = 7 where idTask = ".$idTask.";";
    if(modify($sql) != -1) {
        $return = 'success';
    }
    $array = ['result' => $return];
    return $array;
}
?>
