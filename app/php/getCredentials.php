
<?php
require_once 'connection.php';
$name = (isset($_POST['username'])) ? $_POST['username'] : 'no username';
$password = (isset($_POST['password'])) ? $_POST['password'] : 'no password';
$sql="SELECT * FROM employee WHERE username = '".$name."' AND password = '".$password."';" ;
$result = select($sql); //function is called from connection.php
if(mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $array = ['creds' => 'true', 'role' => $row['role']];
} else {
    $array = ['creds' => 'false', 'role' => null];
}
echo json_encode($array);
?>
