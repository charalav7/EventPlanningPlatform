<?php
require_once 'connection.php';
$name = (isset($_POST['name'])) ? $_POST['name'] : NULL;

$sql = "SELECT * FROM client WHERE name LIKE '%".$name."%';";
$result = select($sql);
close();
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);
?>
