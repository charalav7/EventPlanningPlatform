<?php
require_once 'connection.php';

echo json_encode(getAllEvents());

function getAllEvents() {

    $array = array();
    $sql = "select * from eventrequest join client on eventrequest.clientRecord = client.clientRecord "
    ." join eventrequeststatus on eventrequest.idEventRequestStatus = eventrequeststatus.idEventRequestStatus;";
    $result = select($sql);

    while ($r = mysqli_fetch_assoc($result)) {
        $array[] = $r;
    }
    return $array;
}
?>
