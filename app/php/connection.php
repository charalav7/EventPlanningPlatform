<?php

$con = mysqli_connect('localhost','root','','sep'); //connection details: serverAddress, username, password, database)
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));   //needs to be changed to throw error instead
}
//mysqli_select_db($con,"sep");

//function to execute when selecting something
function select($query) {
    global $con;

    $result = mysqli_query($con,$query);
    return $result;
}

//function to execute when inserting or updating
function modify($query) {
    global $con;
    if (mysqli_query($con,$query)) {
        $id = mysqli_insert_id($con);
        return $id;
    } else {
        return -1;
    }
}

//function to execute when deleting or calling procedures
function execute($query) {
    global $con;
    if(mysqli_query($con,$query)) {
        return 1;
    } else {

        return 0;
    }
}
function close() {
    global $con;
    mysqli_close($con);
}

function reseting() {
    global $con;
    close();
    $con = mysqli_connect('localhost','root','','sep');
}
?>
