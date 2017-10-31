<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getCredentialsTest extends TestCase
{
    public function testgetCredentials() {

        $_POST['username'] = 'sarah';
        $_POST['password'] = 'sarah';
        //get output
        $testingFile = 'getCredentials.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("true", $obj['creds']);
        return;

    }

    /**
    * @depends testgetCredentials
    */
    public function testgetCredentialsNoPassword() {

        //same username as before is still set
        //$_POST['username'] = 'sarah';
        $_POST['username'] = NULL;
        //no password

        //get output
        $testingFile = 'getCredentials.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("false", $obj['creds']);

    }


}

?>
