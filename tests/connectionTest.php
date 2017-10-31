
<?php
use PHPUnit\Framework\TestCase;
//include dirname(__FILE__).'/../app/php/connection.php';
class connectionTest extends TestCase
{
    //test connection and insert
    public function testConnection () {
        $sql = "INSERT into client (name, company) values ('test', 'test');";
        $result = modify($sql);
        $this->assertGreaterThan(0, $result);
        return $result;
    }

    /**
     * @depends testConnection
     */
    public function testSelect($clientRecord) {
        $sql = "Select * from client where clientRecord = ".$clientRecord.";";
        $result = select($sql);
        $r = mysqli_fetch_assoc($result);
        $this -> assertNotEquals($r, NULL);
        return $clientRecord;
    }

    /**
    * @depends testSelect
    */
    public function testExecute($clientRecord) {
        $sql = "Delete from client where clientRecord = ".$clientRecord.";";
        $result = execute($sql);
        $this -> assertEquals(1, $result);
    }

    /**
    * @depends testConnection
    */
    public function testClose() {
        reseting();
        close();
        $this -> assertTrue(true);
    }


}
?>
