<?php
require_once 'wrapper.php';
function getTaskList($username) {

        $_POST['username'] = $username;
        //get output
        $testingFile = 'getTaskList.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        return wrapper($fileLocation);;
}
?>
