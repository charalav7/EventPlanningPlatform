<?php
require_once 'connection.php';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 1 ;
$decision = (isset($_POST['decision'])) ? $_POST['decision'] : 'accepted';
$result = 0;
if ($decision == "accepted") {
    $sql = "call scsoAccept(".$idTask.");";
    $result = execute($sql);
} elseif($decision == "rejected") {
    $sql = "call scsoReject(".$idTask.");";
    $result = execute($sql);
} else {
    $result = 0;
}
if ($result == 1) {
    $array = ["result" => "success"];
} else {
    $array = ["result" => "failure"];
}
echo json_encode($array);
?>
