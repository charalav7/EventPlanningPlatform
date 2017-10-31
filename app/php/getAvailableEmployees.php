<?php
require_once 'connection.php';

$sql = "SELECT DISTINCT username FROM employees "
        ." WHERE role in ('Subteam', 'Decoration', 'Audio', 'Graphic Designer', 'Network', 'Chef', 'Waitress');";

$result = select($sql);
close();
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);
?>
