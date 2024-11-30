<?php
include_once("db_connect.php");
$sqlEvents = "SELECT event_id, name, date_time FROM events;
$resultset = mysqli_query($conn, $sqlEvents) or die("database error:". mysqli_error($conn));
$calendar = array();
while( $rows = mysqli_fetch_assoc($resultset) ) {	
	$calendar[] = array(
        'event_id' =>$rows['id'],
        'name' => $rows['title'],
        'date_time' => "$start"
    );
}
$calendarData = array(
	"success" => 1,	
    "result"=>$calendar);
echo json_encode($calendarData);
?>