
<?php
require_once 'connection.php';
$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 0 ;


$sql = "select assignee, creator from task where idTask = ".$idTask.";";
$result = select($sql);
$array = ["result" => "success"];
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $assignee = $row['assignee'];
    $creator = $row['creator'];
    $sql = "UPDATE `task` SET `subject` = 'Assign tasks.', `priority` = 'high', "
        ." `creator` = '".$assignee."', `assignee` = '".$creator."', `statusId` = '7' WHERE `task`.`idTask` = ".$idTask.";";
    $result = modify($sql);

    //if the update failed
    if ($result == -1) {
        $array = ["result" => "failure"];
    } else {
        $sql = "Delete from staffrequest where idTask = ".$idTask.";";
        execute($sql);
        $array = ["result" => "success"];
    }
} else {    //if the search for username failed
    $array = ["result" => "failure"];
}
echo json_encode($array);
?>
