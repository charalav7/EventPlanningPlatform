
<?php
use PHPUnit\Framework\TestCase;

class createEventRequestTest extends TestCase
{
    public function testCreateEventRequest() {


        //get output
        $testingFile = 'createEventRequest.php';
        ob_start(); // Start output buffering
        include dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $list = ob_get_contents(); // Store buffer in variable
        ob_end_clean(); // End buffering and clean up
        $obj = json_decode($list, true);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testCreateEventRequest
    */
    public function testCreateEventRequestFaultyClientRecord() {

        $_POST['clientRecord'] = -1;

        //get output
        $testingFile = 'createEventRequest.php';
        ob_start(); // Start output buffering
        include dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $list = ob_get_contents(); // Store buffer in variable
        ob_end_clean(); // End buffering and clean up
        $obj = json_decode($list, true);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }
}

?>
