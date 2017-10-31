<?php
require_once 'connection.php';

$idTask= (isset($_POST['idTask'])) ? $_POST['idTask'] : 0;


$return = null;
$array = null;

$sql = "Select description from plan where idTask = ".$idTask.";";
$result = select($sql);

if($r = mysqli_fetch_assoc($result)) {
    $array = $r;
}
echo json_encode($array);

?>
