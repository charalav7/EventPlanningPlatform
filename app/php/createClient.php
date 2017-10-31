
<?php

require_once 'connection.php';
$name = (isset($_POST['name'])) ? $_POST['name'] : 'dummy client';
$company = (isset($_POST['company'])) ? $_POST['company'] : 'dummy company';

$sql = "INSERT INTO `client` ( `name`, `company`) VALUES ('".$name."', '".$company."');";
$result = modify($sql);
if ($result == -1) {
    $array = ["result" => "failure"];
} else {
    $array = ["result" => "success"];
}
close();
echo json_encode($array);
?>
