<?php
require_once 'connection.php';

$idTask = (isset($_POST['idTask'])) ? $_POST['idTask'] : 0;
$description = (isset($_POST['description'])) ? $_POST['description'] : "No description provided";


    $return = 'failure';
    $sql = "select creator,assignee from task where idTask = ".$idTask.";";
    $result = select($sql);
    $subject = 'Review plan proposal.';
    $statusId = 8;

    if ($r = mysqli_fetch_assoc($result)) {

        $sql = "Insert into plan (description, idTask) values ('".$description."', ".$idTask.");";
        $result = modify($sql);

        if($result != -1) {
            $sql = "Update task  set subject = '".$subject."', creator = '".$r['assignee']."', "
            ." assignee = '".$r['creator']."', statusId = ".$statusId." "
            ." where idTask = ".$idTask.";";

            $result = modify($sql);
            if($result != -1) {
                $return = 'success';
            }
        }
    }

    $array = ['result' => $return];
    echo json_encode($array);
?>
